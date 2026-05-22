---
name: Leadflow
colors:
  surface: '#f8f9ff'
  surface-dim: '#d7dae2'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3fc'
  surface-container: '#ebeef6'
  surface-container-high: '#e5e8f0'
  surface-container-highest: '#dfe2eb'
  on-surface: '#181c22'
  on-surface-variant: '#43474f'
  inverse-surface: '#2d3137'
  inverse-on-surface: '#eef1f9'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#395f94'
  primary: '#30568b'
  on-primary: '#ffffff'
  primary-container: '#4a6fa5'
  on-primary-container: '#edf1ff'
  inverse-primary: '#a7c8ff'
  secondary: '#426464'
  on-secondary: '#ffffff'
  secondary-container: '#c2e7e6'
  on-secondary-container: '#466969'
  tertiary: '#705000'
  on-tertiary: '#ffffff'
  tertiary-container: '#8c6814'
  on-tertiary-container: '#fff0d9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#1e477b'
  secondary-fixed: '#c5eae9'
  secondary-fixed-dim: '#a9cdcd'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#2a4c4d'
  tertiary-fixed: '#ffdea4'
  tertiary-fixed-dim: '#edc065'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#f8f9ff'
  on-background: '#181c22'
  surface-variant: '#dfe2eb'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system for Leadflow is anchored in a philosophy of **Trustworthy Efficiency**. It is designed for a modern cleaning and service management platform where the primary goal is to project professional reliability while maintaining a welcoming, approachable atmosphere.

The aesthetic follows a **Corporate Modern** style with a leaning toward **Minimalism**. It utilizes expansive white space to denote cleanliness and a refined color palette to evoke a sense of calm organization. The interface should feel breezy yet structured, avoiding heavy ornamentation in favor of crisp typography and subtle depth. The emotional response is one of "total control" and "professional peace of mind."

## Colors
The palette has been evolved to favor professional sophistication over high-intensity contrast. 

- **Primary (Slate Blue):** A calm, dusty blue that serves as the foundation for the brand. It suggests stability and reliability without the aggressive saturation of standard corporate blues.
- **Secondary (Muted Sage):** A soft, organic green that reinforces the "cleaning" and "freshness" aspect of the service. It is used for accents, success states, and subtle highlights.
- **Neutral:** A deep charcoal-grey (not pure black) is used for text to maintain high legibility while appearing softer on the eyes.
- **Containers:** Derived tonal palettes provide soft backgrounds for grouping information. Always ensure a minimum 4.5:1 contrast ratio for any text placed on these containers.

## Typography
Montserrat is the exclusive typeface for this design system, chosen for its geometric clarity and modern professional appeal. 

- **Headlines:** Use Bold (700) or Semi-Bold (600) weights with slightly tightened letter-spacing for a confident, structured look.
- **Body:** Standard weights (400) ensure high readability in data-heavy views. 
- **Labels:** Uppercase styling with increased letter-spacing should be used for small labels, table headers, and overlines to distinguish them from interactive text.
- **Scaling:** On mobile devices, Display and Headline sizes should scale down by 15-20% to prevent excessive line breaks while maintaining hierarchy.

## Layout & Spacing
This design system utilizes an **8px linear grid** to ensure consistency across all components.

- **Grid Model:** A 12-column fluid grid is used for desktop (breakpoint 1280px+), transitioning to an 8-column grid for tablets (768px+) and a 4-column grid for mobile (360px+).
- **Rhythm:** Spacing should be used to group related items. A "tight" 8px or 12px gap for internal component elements and a "loose" 24px or 40px gap for section separators.
- **Safe Areas:** On mobile, a minimum side margin of 16px is required. On desktop, content is typically max-width 1200px and centered.

## Elevation & Depth
To maintain the "clean" vibe, depth is conveyed through **Tonal Layers** and **Soft Ambient Shadows**.

- **Level 0 (Base):** The `surface` color (#FCFCFD).
- **Level 1 (Cards/Inputs):** A 1px outline using `outline` color (#D1D9E0) or a very soft shadow (0px 2px 4px rgba(0, 0, 0, 0.05)).
- **Level 2 (Modals/Dropdowns):** A more pronounced but still diffused shadow (0px 8px 16px rgba(0, 0, 0, 0.08)).
- **Stacked Depth:** Use the `surface-variant` color (#F1F3F5) to create distinct background regions (like sidebars or secondary panels) without needing shadows. This keeps the interface flat and modern.

## Shapes
Shapes in the design system are distinctly **Rounded**, reflecting an approachable and friendly service. 

- **Components:** Standard buttons, input fields, and chips use a 0.5rem (8px) corner radius.
- **Containers:** Large cards and modals use 1rem (16px) or 1.5rem (24px) for a "softer" presence.
- **Exceptions:** Icons and small indicators may use 4px (Soft) to maintain clarity at small scales.

## Components
- **Buttons:** Primary buttons use the Slate Blue background with White text. Secondary buttons use a Sage Green outline or the Sage Green container with a dark label. Avoid harsh gradients; use subtle hover states that darken the background color by 10%.
- **Input Fields:** Use a 1px border (`outline` color). On focus, the border should transition to the Primary Slate Blue with a 2px stroke or a soft blue outer glow.
- **Chips/Badges:** For status indicators (e.g., "Cleaned", "Scheduled"), use the Secondary Sage Green container with a darker green label to signify completion and freshness.
- **Cards:** Cards should be flat with a 1px `outline` border. Use `surface-variant` for headers within cards to create internal hierarchy.
- **Lists:** Use ample vertical padding (16px) between list items. Use subtle horizontal dividers in `outline` color at 50% opacity to maintain a light, airy feel.
- **Selection Controls:** Checkboxes and Radio buttons should use the Primary Slate Blue for the active state, reinforcing the brand color during user interaction.