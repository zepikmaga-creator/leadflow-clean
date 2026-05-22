import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, 'data')
const leadsFile = path.join(dataDir, 'leads.json')

const app = express()
const port = process.env.PORT || 5000
const statuses = new Set(['new', 'contacted', 'done'])
const adminToken = 'simple-admin-token'
const allowedOrigins = ['http://localhost:5173']

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL)
}

function isAllowedOrigin(origin) {
  if (!origin) {
    return true
  }

  try {
    const { hostname } = new URL(origin)
    return allowedOrigins.includes(origin) || hostname.endsWith('.vercel.app')
  } catch {
    return false
  }
}

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true)
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true })

  try {
    await fs.access(leadsFile)
  } catch {
    await fs.writeFile(leadsFile, '[]\n', 'utf8')
  }
}

async function readLeads() {
  await ensureStorage()
  const content = await fs.readFile(leadsFile, 'utf8')
  return JSON.parse(content || '[]')
}

async function writeLeads(leads) {
  await ensureStorage()
  await fs.writeFile(leadsFile, `${JSON.stringify(leads, null, 2)}\n`, 'utf8')
}

function createLeadId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function requireAdmin(req, res, next) {
  const authHeader = req.get('Authorization') || ''
  const token = authHeader.replace('Bearer ', '')

  if (token !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}

async function sendTelegramNotification(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.ADMIN_CHAT_ID

  if (!token || !chatId) {
    return
  }

  const text = [
    'New LeadFlowClean request',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Service: ${lead.service}`,
    `Date: ${lead.preferredDate || '-'}`,
    `Comment: ${lead.comment || '-'}`
  ].join('\n')

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  })

  if (!response.ok) {
    const body = await response.text()
    console.error('Telegram notification failed:', body)
  }
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.post('/api/login', (req, res) => {
  const password = cleanString(req.body.password)

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: adminToken })
  }

  res.json({ success: false, message: 'Invalid password' })
})

app.get('/api/leads', requireAdmin, async (req, res) => {
  try {
    const leads = await readLeads()
    res.json(leads)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to read leads' })
  }
})

app.post('/api/leads', async (req, res) => {
  try {
    const lead = {
      id: createLeadId(),
      name: cleanString(req.body.name),
      phone: cleanString(req.body.phone),
      service: cleanString(req.body.service),
      preferredDate: cleanString(req.body.preferredDate),
      comment: cleanString(req.body.comment),
      status: 'new',
      createdAt: new Date().toISOString()
    }

    if (!lead.name || !lead.phone || !lead.service) {
      return res.status(400).json({ error: 'Name, phone and service are required' })
    }

    const leads = await readLeads()
    leads.unshift(lead)
    await writeLeads(leads)

    sendTelegramNotification(lead).catch((error) => {
      console.error('Telegram notification error:', error.message)
    })

    res.status(201).json(lead)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create lead' })
  }
})

app.patch('/api/leads/:id/status', requireAdmin, async (req, res) => {
  try {
    const status = cleanString(req.body.status)

    if (!statuses.has(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const leads = await readLeads()
    const lead = leads.find((item) => item.id === req.params.id)

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    lead.status = status
    lead.updatedAt = new Date().toISOString()
    await writeLeads(leads)

    res.json(lead)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update lead status' })
  }
})

app.delete('/api/leads/:id', requireAdmin, async (req, res) => {
  try {
    const leads = await readLeads()
    const nextLeads = leads.filter((item) => item.id !== req.params.id)

    if (nextLeads.length === leads.length) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    await writeLeads(nextLeads)
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete lead' })
  }
})

ensureStorage()
  .then(() => {
    app.listen(port, () => {
      console.log(`LeadFlowClean API is running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to initialize storage:', error)
    process.exit(1)
  })
