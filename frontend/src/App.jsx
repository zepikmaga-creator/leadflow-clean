import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import cleaningHero from './assets/cleaning-hero.png'

const API_URL = import.meta.env.VITE_API_URL || ''
const adminTokenKey = 'leadflowclean_admin_token'
const languageKey = 'leadflowclean_language'
const themeKey = 'leadflowclean_theme'
const statuses = ['new', 'contacted', 'done']

const initialForm = {
  name: '',
  phone: '',
  service: '',
  preferredDate: '',
  comment: ''
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
}

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const viewportOnce = { once: true, amount: 0.18 }

function getMotionProps(shouldReduceMotion, props) {
  return shouldReduceMotion ? {} : props
}

function buttonMotion(shouldReduceMotion) {
  return shouldReduceMotion ? {} : { whileHover: { y: -1 }, whileTap: { scale: 0.98 } }
}

const copy = {
  en: {
    nav: ['Home', 'Services', 'Pricing', 'About Us', 'Contact'],
    brand: 'Leadflow',
    bookNow: 'Book Now',
    trust: 'Trusted by 5,000+ households',
    heroTitle: 'Experience the',
    heroAccent: 'new standard',
    heroEnd: 'of clean.',
    heroText:
      'Professional, detail-led cleaning for homes and offices. LeadFlowClean keeps requests, timing, and follow-up simple from the first quote.',
    bookClean: 'Book Your Clean',
    viewServices: 'View Services',
    visualOne: 'Fresh kitchen finish',
    visualTwo: 'Eco supplies ready',
    joined: 'Joined by 200+ professionals this month',
    whyTitle: 'Why choose Leadflow?',
    whyText: 'Cleaning redesigned around trust, predictable service, and a calmer booking process.',
    benefits: [
      ['Fully Insured Pros', 'Every cleaner follows a strict checklist and quality standard for reliable visits.'],
      ['Eco-Friendly First', 'Soft, family-safe products keep homes fresh without harsh chemical overload.'],
      ['Seamless Scheduling', 'Requests, preferred dates, and follow-up status stay organized in one place.']
    ],
    servicesTitle: 'Pristine spaces, tailored to you.',
    servicesText: 'Choose a standard package or request a custom cleaning plan for your space.',
    services: [
      ['Residential Cleaning', 'Meticulous home care for kitchens, bathrooms, floors, and living spaces.', 'Starting at $120'],
      ['Commercial', 'Office and retail cleaning plans for high-performance work environments.', 'Starting at $250'],
      ['Move-In / Move-Out', 'Deep cleaning for property transitions and fresh starts.', 'Starting at $180'],
      ['Post-Construction', 'Fine dust, debris, and residue removal after renovation or new builds.', 'Starting at $300']
    ],
    quoteTitle: 'Ready for a fresh start?',
    quoteText: 'Send a request in under a minute. We will review the details and contact you with availability.',
    checklistTitle: 'The standard clean checklist',
    checklist: ['Kitchen sanitization', 'Floor care', 'Bathroom deep-clean', 'Mirror polishing'],
    customQuote: 'Custom quote',
    formTitle: 'Request a cleaning plan',
    name: 'Full name',
    phone: 'Phone',
    serviceType: 'Service type',
    chooseService: 'Choose service',
    preferredDate: 'Preferred date',
    instructions: 'Special instructions',
    commentPlaceholder: 'Tell us about rooms, timing, pets, or priority areas...',
    send: 'Get Your Personalized Quote',
    sending: 'Sending...',
    success: 'Request received. We will contact you soon with the next steps.',
    submitError: 'Failed to send request',
    footerRights: '2026 LeadFlowClean. All rights reserved.',
    contactUs: 'Contact Us',
    admin: {
      portal: 'Management Portal',
      user: 'Admin User',
      role: 'Super Admin',
      dashboard: 'Dashboard',
      leads: 'Leads',
      services: 'Services',
      settings: 'Settings',
      refresh: 'Refresh Data',
      logout: 'Logout',
      serviceLeads: 'Service leads',
      title: 'Leads dashboard',
      export: 'Export CSV',
      total: 'Total leads',
      new: 'New',
      contacted: 'Contacted',
      done: 'Done',
      search: 'Search customer or service',
      searchPlaceholder: 'Name, phone, service or comment',
      status: 'Status',
      all: 'All',
      sort: 'Sort',
      newest: 'Newest first',
      oldest: 'Oldest first',
      loading: 'Loading leads...',
      empty: 'No leads yet.',
      noMatches: 'No leads match the current filters.',
      recent: 'Recent requests',
      showing: 'Showing',
      of: 'of',
      customer: 'Customer',
      service: 'Service type',
      date: 'Date',
      action: 'Action',
      noInstructions: 'No special instructions',
      cleaningScope: 'Cleaning scope',
      activity: 'Activity',
      leadCreated: 'Lead created',
      delete: 'Delete',
      confirmDelete: 'Delete this lead?',
      deleteError: 'Failed to delete lead',
      updateError: 'Failed to update status',
      loadError: 'Failed to load leads'
    },
    login: {
      title: 'Admin login',
      password: 'Password',
      button: 'Login',
      checking: 'Checking...',
      failed: 'Login failed',
      invalid: 'Invalid password'
    },
    status: {
      new: 'New',
      contacted: 'Contacted',
      done: 'Done'
    },
    controls: {
      language: 'RU',
      themeLight: 'Light',
      themeDark: 'Dark'
    }
  },
  ru: {
    nav: ['Главная', 'Услуги', 'Цены', 'О нас', 'Контакты'],
    brand: 'Leadflow',
    bookNow: 'Заказать',
    trust: 'Нам доверяют 5 000+ клиентов',
    heroTitle: 'Новый',
    heroAccent: 'стандарт',
    heroEnd: 'чистоты.',
    heroText:
      'Профессиональный клининг для домов и офисов. LeadFlowClean помогает быстро оставить заявку, выбрать дату и получить ответ команды.',
    bookClean: 'Заказать уборку',
    viewServices: 'Смотреть услуги',
    visualOne: 'Свежий результат',
    visualTwo: 'Эко-средства готовы',
    joined: '200+ специалистов подключились в этом месяце',
    whyTitle: 'Почему Leadflow?',
    whyText: 'Клининг с акцентом на доверие, понятный процесс и аккуратное сопровождение заявки.',
    benefits: [
      ['Проверенные специалисты', 'Каждая уборка проходит по чеклисту и единому стандарту качества.'],
      ['Эко-подход', 'Мягкие средства помогают сохранить свежесть без лишней химии.'],
      ['Удобное планирование', 'Заявки, даты и статусы собраны в одной простой системе.']
    ],
    servicesTitle: 'Чистые пространства под ваши задачи.',
    servicesText: 'Выберите готовую услугу или оставьте заявку на индивидуальный план уборки.',
    services: [
      ['Домашняя уборка', 'Аккуратный уход за кухней, ванными, полами и жилыми зонами.', 'От $120'],
      ['Коммерческая уборка', 'Планы уборки для офисов, студий и торговых помещений.', 'От $250'],
      ['Уборка при переезде', 'Глубокая уборка для переезда и свежего старта.', 'От $180'],
      ['После ремонта', 'Удаление пыли, мусора и следов работ после ремонта.', 'От $300']
    ],
    quoteTitle: 'Готовы к чистому старту?',
    quoteText: 'Оставьте заявку за минуту. Мы изучим детали и свяжемся с вами по доступному времени.',
    checklistTitle: 'Стандартный чеклист уборки',
    checklist: ['Санитизация кухни', 'Уход за полами', 'Глубокая уборка ванной', 'Полировка зеркал'],
    customQuote: 'Индивидуальный расчет',
    formTitle: 'Запросить план уборки',
    name: 'Имя',
    phone: 'Телефон',
    serviceType: 'Услуга',
    chooseService: 'Выберите услугу',
    preferredDate: 'Желаемая дата',
    instructions: 'Комментарий',
    commentPlaceholder: 'Расскажите о комнатах, времени, питомцах или важных зонах...',
    send: 'Получить расчет',
    sending: 'Отправка...',
    success: 'Заявка получена. Мы скоро свяжемся с вами.',
    submitError: 'Не удалось отправить заявку',
    footerRights: '2026 LeadFlowClean. Все права защищены.',
    contactUs: 'Контакты',
    admin: {
      portal: 'Панель управления',
      user: 'Администратор',
      role: 'Главный доступ',
      dashboard: 'Дашборд',
      leads: 'Заявки',
      services: 'Услуги',
      settings: 'Настройки',
      refresh: 'Обновить',
      logout: 'Выйти',
      serviceLeads: 'Заявки на услуги',
      title: 'Панель заявок',
      export: 'Экспорт CSV',
      total: 'Всего заявок',
      new: 'Новые',
      contacted: 'Связались',
      done: 'Завершено',
      search: 'Поиск клиента или услуги',
      searchPlaceholder: 'Имя, телефон, услуга или комментарий',
      status: 'Статус',
      all: 'Все',
      sort: 'Сортировка',
      newest: 'Сначала новые',
      oldest: 'Сначала старые',
      loading: 'Загрузка заявок...',
      empty: 'Заявок пока нет.',
      noMatches: 'Нет заявок под текущие фильтры.',
      recent: 'Последние заявки',
      showing: 'Показано',
      of: 'из',
      customer: 'Клиент',
      service: 'Услуга',
      date: 'Дата',
      action: 'Действия',
      noInstructions: 'Без комментария',
      cleaningScope: 'Объем работ',
      activity: 'Активность',
      leadCreated: 'Заявка создана',
      delete: 'Удалить',
      confirmDelete: 'Удалить эту заявку?',
      deleteError: 'Не удалось удалить заявку',
      updateError: 'Не удалось изменить статус',
      loadError: 'Не удалось загрузить заявки'
    },
    login: {
      title: 'Вход в админку',
      password: 'Пароль',
      button: 'Войти',
      checking: 'Проверка...',
      failed: 'Ошибка входа',
      invalid: 'Неверный пароль'
    },
    status: {
      new: 'Новая',
      contacted: 'Связались',
      done: 'Готово'
    },
    controls: {
      language: 'EN',
      themeLight: 'Светлая',
      themeDark: 'Темная'
    }
  }
}

function App() {
  const [language, setLanguageState] = useState(() => localStorage.getItem(languageKey) || 'en')
  const [theme, setThemeState] = useState(() => localStorage.getItem(themeKey) || 'light')
  const isAdmin = window.location.pathname === '/admin'
  const t = copy[language] || copy.en

  function setLanguage(nextLanguage) {
    localStorage.setItem(languageKey, nextLanguage)
    setLanguageState(nextLanguage)
  }

  function setTheme(nextTheme) {
    localStorage.setItem(themeKey, nextTheme)
    setThemeState(nextTheme)
  }

  const sharedProps = { language, theme, t, setLanguage, setTheme }

  return isAdmin ? <AdminPage {...sharedProps} /> : <LandingPage {...sharedProps} />
}

function UtilityControls({ language, theme, setLanguage, setTheme, t }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="utilityControls" aria-label="Display preferences">
      <motion.button type="button" onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')} {...buttonMotion(shouldReduceMotion)}>
        {t.controls.language}
      </motion.button>
      <motion.button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} {...buttonMotion(shouldReduceMotion)}>
        {theme === 'light' ? t.controls.themeDark : t.controls.themeLight}
      </motion.button>
    </div>
  )
}

function LandingPage({ language, theme, t, setLanguage, setTheme }) {
  const shouldReduceMotion = useReducedMotion()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }))
  }

  async function submitLead(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || t.submitError)
      }

      setForm(initialForm)
      setStatus('success')
      setMessage(t.success)
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <main className={`sitePage theme-${theme}`}>
      <nav className="siteNav">
        <a className="brand" href="/">
          {t.brand}
        </a>
        <div className="navLinks">
          <a href="#home">{t.nav[0]}</a>
          <a href="#services">{t.nav[1]}</a>
          <a href="#quote">{t.nav[2]}</a>
          <a href="#benefits">{t.nav[3]}</a>
          <a href="#quote">{t.nav[4]}</a>
        </div>
        <div className="navTools">
          <UtilityControls language={language} theme={theme} setLanguage={setLanguage} setTheme={setTheme} t={t} />
          <a className="navCta" href="#quote">
            {t.bookNow}
          </a>
        </div>
      </nav>

      <motion.section
        className="landingHero"
        id="home"
        {...getMotionProps(shouldReduceMotion, {
          initial: 'hidden',
          animate: 'visible',
          variants: staggerGroup
        })}
      >
        <motion.div className="heroCopy" variants={fadeUp}>
          <span className="trustPill">{t.trust}</span>
          <h1>
            {t.heroTitle} <span>{t.heroAccent}</span> {t.heroEnd}
          </h1>
          <p>{t.heroText}</p>
          <div className="heroActions">
            <motion.a className="primaryButton" href="#quote" {...buttonMotion(shouldReduceMotion)}>
              {t.bookClean}
            </motion.a>
            <motion.a className="ghostButton" href="#services" {...buttonMotion(shouldReduceMotion)}>
              {t.viewServices}
            </motion.a>
          </div>
        </motion.div>
        <motion.div className="heroVisual" aria-label="Clean home preview" variants={fadeUp}>
          <div className="imageCard">
            <img src={cleaningHero} alt="Bright clean kitchen after professional cleaning" />
          </div>
          <div className="visualStack">
            <div className="visualTile tealTile">{t.visualOne}</div>
            <div className="visualTile towelTile">{t.visualTwo}</div>
          </div>
          <div className="joinedCard">
            <span></span>
            <span></span>
            <span></span>
            <p>{t.joined}</p>
          </div>
        </motion.div>
      </motion.section>

      <section className="sectionBlock" id="benefits">
        <div className="sectionHeader">
          <h2>{t.whyTitle}</h2>
          <p>{t.whyText}</p>
        </div>
        <motion.div
          className="benefitGrid"
          {...getMotionProps(shouldReduceMotion, {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: viewportOnce,
            variants: staggerGroup
          })}
        >
          {t.benefits.map(([title, text]) => (
            <motion.article className="benefitCard" key={title} variants={fadeUp}>
              <div className="iconBox">OK</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="sectionBlock servicesBlock" id="services">
        <div className="sectionHeader">
          <h2>{t.servicesTitle}</h2>
          <p>{t.servicesText}</p>
        </div>
        <motion.div
          className="serviceGrid"
          {...getMotionProps(shouldReduceMotion, {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: viewportOnce,
            variants: staggerGroup
          })}
        >
          {t.services.map(([title, text, price], index) => (
            <motion.article className={index === 0 ? 'serviceCard featuredService' : 'serviceCard'} key={title} variants={fadeUp}>
              <span className="serviceIcon">{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>{price}</strong>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="quoteSection" id="quote">
        <div className="quoteIntro">
          <h2>{t.quoteTitle}</h2>
          <p>{t.quoteText}</p>
          <div className="checklistCard">
            <h3>{t.checklistTitle}</h3>
            <ul>
              {t.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <form className="leadForm quoteForm" onSubmit={submitLead}>
          <div>
            <span className="formKicker">{t.customQuote}</span>
            <h2>{t.formTitle}</h2>
          </div>
          <div className="formGrid">
            <label>
              {t.name}
              <input name="name" value={form.name} onChange={updateField} required placeholder="John Doe" />
            </label>
            <label>
              {t.phone}
              <input name="phone" value={form.phone} onChange={updateField} required placeholder="+1 555 123 4567" />
            </label>
          </div>
          <label>
            {t.serviceType}
            <select name="service" value={form.service} onChange={updateField} required>
              <option value="">{t.chooseService}</option>
              {t.services.map(([title]) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.preferredDate}
            <input name="preferredDate" type="date" value={form.preferredDate} onChange={updateField} />
          </label>
          <label>
            {t.instructions}
            <textarea name="comment" value={form.comment} onChange={updateField} rows="4" placeholder={t.commentPlaceholder} />
          </label>
          <motion.button type="submit" disabled={status === 'loading'} {...buttonMotion(shouldReduceMotion)}>
            {status === 'loading' ? t.sending : t.send}
          </motion.button>
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                className={`formMessage ${status}`}
                key={message}
                {...getMotionProps(shouldReduceMotion, {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -6 },
                  transition: { duration: 0.22 }
                })}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </section>

      <footer className="siteFooter">
        <strong>{t.brand}</strong>
        <span>© {t.footerRights}</span>
        <div>
          <a href="#quote">{t.contactUs}</a>
          <a href="/admin">Admin</a>
        </div>
      </footer>
    </main>
  )
}

function AdminPage({ language, theme, t, setLanguage, setTheme }) {
  const shouldReduceMotion = useReducedMotion()
  const [token, setToken] = useState(() => localStorage.getItem(adminTokenKey) || '')
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')

  const dashboard = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((lead) => lead.status === 'new').length,
      contacted: leads.filter((lead) => lead.status === 'contacted').length,
      done: leads.filter((lead) => lead.status === 'done').length
    }),
    [leads]
  )

  const visibleLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return leads
      .filter((lead) => statusFilter === 'all' || lead.status === statusFilter)
      .filter((lead) => {
        if (!normalizedSearch) {
          return true
        }

        return [lead.name, lead.phone, lead.service, lead.comment].some((value) =>
          String(value || '').toLowerCase().includes(normalizedSearch)
        )
      })
      .sort((first, second) => {
        const firstTime = new Date(first.createdAt || 0).getTime()
        const secondTime = new Date(second.createdAt || 0).getTime()
        return sortOrder === 'newest' ? secondTime - firstTime : firstTime - secondTime
      })
  }, [leads, search, sortOrder, statusFilter])

  function logout() {
    localStorage.removeItem(adminTokenKey)
    setToken('')
    setLeads([])
    setError('')
  }

  function exportCsv() {
    const csv = buildCsv(visibleLeads)
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const exportDate = new Date().toISOString().slice(0, 10)

    link.href = url
    link.download = `leads-export-${exportDate}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  async function loadLeads() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) {
        throw new Error(t.admin.loadError)
      }

      setLeads(await response.json())
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id, status) {
    const previous = leads
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)))

    try {
      const response = await fetch(`${API_URL}/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        throw new Error(t.admin.updateError)
      }

      const updatedLead = await response.json()
      setLeads((current) => current.map((lead) => (lead.id === id ? updatedLead : lead)))
    } catch (updateError) {
      setLeads(previous)
      setError(updateError.message)
    }
  }

  async function deleteLead(id) {
    if (!window.confirm(t.admin.confirmDelete)) {
      return
    }

    const previous = leads
    setLeads((current) => current.filter((lead) => lead.id !== id))

    try {
      const response = await fetch(`${API_URL}/api/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) {
        throw new Error(t.admin.deleteError)
      }
    } catch (deleteError) {
      setLeads(previous)
      setError(deleteError.message)
    }
  }

  useEffect(() => {
    if (token) {
      loadLeads()
    }
  }, [token])

  if (!token) {
    return <LoginPage language={language} theme={theme} t={t} setLanguage={setLanguage} setTheme={setTheme} onLogin={setToken} />
  }

  return (
    <main className={`adminShell theme-${theme}`}>
      <aside className="sidebar">
        <div className="sidebarBrand">
          <strong>Leadflow Admin</strong>
          <span>{t.admin.portal}</span>
        </div>
        <UtilityControls language={language} theme={theme} setLanguage={setLanguage} setTheme={setTheme} t={t} />
        <div className="adminProfile">
          <div>AU</div>
          <span>
            <strong>{t.admin.user}</strong>
            <small>{t.admin.role}</small>
          </span>
        </div>
        <nav className="sideNav">
          <a href="/admin">{t.admin.dashboard}</a>
          <a className="active" href="/admin">
            {t.admin.leads}
          </a>
          <a href="/admin">{t.admin.services}</a>
          <a href="/admin">{t.admin.settings}</a>
        </nav>
        <motion.button className="sidebarCta" type="button" onClick={loadLeads} {...buttonMotion(shouldReduceMotion)}>
          {t.admin.refresh}
        </motion.button>
        <motion.button className="sidebarLogout" type="button" onClick={logout} {...buttonMotion(shouldReduceMotion)}>
          {t.admin.logout}
        </motion.button>
      </aside>

      <section className="adminContent">
        <header className="adminHeader">
          <div>
            <p className="eyebrow">{t.admin.serviceLeads}</p>
            <h1>{t.admin.title}</h1>
          </div>
          <div className="adminActions">
            <motion.button
              className="exportButton"
              type="button"
              onClick={exportCsv}
              disabled={visibleLeads.length === 0}
              {...buttonMotion(shouldReduceMotion)}
            >
              {t.admin.export}
            </motion.button>
          </div>
        </header>

        <section className="dashboardGrid" aria-label="Lead counters">
          <DashboardCard label={t.admin.total} value={dashboard.total} index={0} shouldReduceMotion={shouldReduceMotion} />
          <DashboardCard label={t.admin.new} value={dashboard.new} tone="new" index={1} shouldReduceMotion={shouldReduceMotion} />
          <DashboardCard
            label={t.admin.contacted}
            value={dashboard.contacted}
            tone="contacted"
            index={2}
            shouldReduceMotion={shouldReduceMotion}
          />
          <DashboardCard label={t.admin.done} value={dashboard.done} tone="done" index={3} shouldReduceMotion={shouldReduceMotion} />
        </section>

        <section className="adminToolbar" aria-label="Lead filters">
          <label className="searchField">
            {t.admin.search}
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.admin.searchPlaceholder}
            />
          </label>
          <label>
            {t.admin.status}
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">{t.admin.all}</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {t.status[status]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.admin.sort}
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="newest">{t.admin.newest}</option>
              <option value="oldest">{t.admin.oldest}</option>
            </select>
          </label>
        </section>

        {error && <p className="adminError">{error}</p>}
        {loading && <p className="emptyState">{t.admin.loading}</p>}
        {!loading && leads.length === 0 && <p className="emptyState">{t.admin.empty}</p>}
        {!loading && leads.length > 0 && visibleLeads.length === 0 && <p className="emptyState">{t.admin.noMatches}</p>}

        <section className="leadsPanel">
          <div className="panelHeader">
            <h2>{t.admin.recent}</h2>
            <span>
              {t.admin.showing} {visibleLeads.length} {t.admin.of} {leads.length}
            </span>
          </div>
          <motion.div className="leadTable" layout>
            <div className="tableHead">
              <span>{t.admin.customer}</span>
              <span>{t.admin.service}</span>
              <span>{t.admin.date}</span>
              <span>{t.admin.status}</span>
              <span>{t.admin.action}</span>
            </div>
            <AnimatePresence initial={false}>
              {visibleLeads.map((lead) => (
                <motion.article
                  className="leadRow"
                  key={lead.id}
                  layout
                  {...getMotionProps(shouldReduceMotion, {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, x: 18, height: 0, paddingTop: 0, paddingBottom: 0 },
                    transition: { duration: 0.24 }
                  })}
                >
                  <div className="customerCell">
                    <div className="avatar">{getInitials(lead.name)}</div>
                    <span>
                      <strong>{lead.name}</strong>
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </span>
                  </div>
                  <div>
                    <strong>{lead.service}</strong>
                    <small>{lead.comment || t.admin.noInstructions}</small>
                  </div>
                  <div>{formatDate(lead.createdAt)}</div>
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        className={`statusBadge ${lead.status}`}
                        key={lead.status}
                        {...getMotionProps(shouldReduceMotion, {
                          initial: { opacity: 0, scale: 0.96 },
                          animate: { opacity: 1, scale: 1 },
                          exit: { opacity: 0, scale: 0.96 },
                          transition: { duration: 0.16 }
                        })}
                      >
                        {t.status[lead.status] || lead.status}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="actionButtons" aria-label={`Actions for ${lead.name}`}>
                    <div className="statusButtons">
                      {statuses.map((status) => (
                        <motion.button
                          className={lead.status === status ? 'active' : ''}
                          key={status}
                          type="button"
                          onClick={() => updateStatus(lead.id, status)}
                          disabled={lead.status === status}
                          {...buttonMotion(shouldReduceMotion)}
                        >
                          {t.status[status]}
                        </motion.button>
                      ))}
                    </div>
                    <motion.button className="deleteButton" type="button" onClick={() => deleteLead(lead.id)} {...buttonMotion(shouldReduceMotion)}>
                      {t.admin.delete}
                    </motion.button>
                  </div>
                  <div className="leadDetails">
                    <div>
                      <span>{t.preferredDate}</span>
                      <strong>{lead.preferredDate || '-'}</strong>
                    </div>
                    <div>
                      <span>{t.admin.cleaningScope}</span>
                      <strong>{lead.service}</strong>
                    </div>
                    <div>
                      <span>{t.admin.activity}</span>
                      <strong>
                        {t.admin.leadCreated} - {formatDate(lead.createdAt)}
                      </strong>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </section>
    </main>
  )
}

function DashboardCard({ label, value, tone = 'total', index = 0, shouldReduceMotion = false }) {
  return (
    <motion.article
      className={`dashboardCard ${tone}`}
      {...getMotionProps(shouldReduceMotion, {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.28, delay: index * 0.05 }
      })}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.article>
  )
}

function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Date(value).toLocaleString()
}

function getInitials(name) {
  return String(name || 'Lead')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function buildCsv(leads) {
  const columns = [
    ['Дата создания', 'createdAt'],
    ['Имя', 'name'],
    ['Телефон', 'phone'],
    ['Услуга', 'service'],
    ['Желаемая дата', 'preferredDate'],
    ['Комментарий', 'comment'],
    ['Статус', 'status']
  ]
  const header = columns.map(([label]) => escapeCsvValue(label)).join(';')
  const rows = leads.map((lead) => columns.map(([, key]) => escapeCsvValue(lead[key])).join(';'))

  return [header, ...rows].join('\r\n')
}

function escapeCsvValue(value) {
  const text = String(value ?? '').replaceAll(/\r?\n/g, ' ')
  return `"${text.replaceAll('"', '""')}"`
}

function LoginPage({ language, theme, t, setLanguage, setTheme, onLogin }) {
  const shouldReduceMotion = useReducedMotion()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function submitLogin(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (!response.ok) {
        throw new Error(t.login.failed)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(t.login.invalid)
      }

      localStorage.setItem(adminTokenKey, result.token)
      onLogin(result.token)
    } catch (loginError) {
      setStatus('error')
      setMessage(loginError.message)
    }
  }

  return (
    <main className={`loginPage theme-${theme}`}>
      <motion.form
        className="loginForm"
        onSubmit={submitLogin}
        {...getMotionProps(shouldReduceMotion, {
          initial: { opacity: 0, y: 18, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.32 }
        })}
      >
        <UtilityControls language={language} theme={theme} setLanguage={setLanguage} setTheme={setTheme} t={t} />
        <p className="eyebrow">LeadFlowClean</p>
        <h1>{t.login.title}</h1>
        <label>
          {t.login.password}
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <motion.button type="submit" disabled={status === 'loading'} {...buttonMotion(shouldReduceMotion)}>
          {status === 'loading' ? t.login.checking : t.login.button}
        </motion.button>
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              className="formMessage error"
              key={message}
              {...getMotionProps(shouldReduceMotion, {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -6 },
                transition: { duration: 0.22 }
              })}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </main>
  )
}

export default App
