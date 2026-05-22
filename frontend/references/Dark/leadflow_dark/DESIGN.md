---
name: Leadflow Dark
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
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
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base_unit: 8px
  container_padding_mobile: 16px
  container_padding_desktop: 32px
  gutter: 24px
  max_width: 1440px
---

## Brand & Style
The design system is engineered for high-performance SaaS environments, focusing on lead generation and data visualization. The personality is authoritative, modern, and technically proficient. 

The aesthetic leverages a **Corporate Modern** style with subtle **Glassmorphism** influences to create depth within a dark environment. By utilizing deep navy and charcoal foundations, the UI recedes to let user data and call-to-actions take center stage. The atmosphere should feel like a premium command center—calm, focused, and high-trust.

## Colors
The palette is built on a "Deep Sea" foundation. The primary background uses a deep navy to reduce eye strain and provide a sophisticated backdrop. 

- **Primary Base (#0f172a):** Used for the main application background.
- **Secondary Surface (#1e293b):** Used for cards, sidebars, and elevated containers to create a tonal hierarchy.
- **Accent Blue (#60a5fa):** A soft, luminous blue for primary actions and indications of progress.
- **Accent Sage (#86efac):** A calming green used for success states, conversion metrics, and growth indicators.
- **Neutrals:** Typography utilizes high-contrast off-whites for readability and slate-greys for secondary metadata.

## Typography
Montserrat is the sole typeface, providing a clean, geometric, and modern feel. In this dark theme, we favor slightly increased letter-spacing for smaller labels to prevent "ink bleed" visual effects. 

Headlines should be bold and impactful to establish a clear information hierarchy against the dark background. For body text, we use a slightly lighter weight (400) with generous line heights to ensure long-form data remains legible and accessible.

## Layout & Spacing
The layout follows a strict 8px grid system to ensure mathematical harmony. 

- **Dashboard Layout:** Utilizes a fluid 12-column grid with a fixed sidebar (280px). Gutters are set to 24px to provide ample breathing room between data-heavy widgets.
- **Content Width:** For marketing or landing pages, content is centered with a max-width of 1440px.
- **Mobile Adaptation:** On mobile devices, margins shrink to 16px, and multi-column card layouts collapse into a single-column vertical stack.

## Elevation & Depth
In this dark system, elevation is conveyed through **Tonal Layering** rather than heavy shadows. 

1. **Level 0 (Base):** #0f172a - The foundation.
2. **Level 1 (Cards/Panels):** #1e293b - Slightly lighter to indicate interaction and containment.
3. **Overlays (Modals/Popovers):** Use the #1e293b surface with a subtle 1px border (#334155) and a soft, diffused navy shadow (0px 20px 50px rgba(0,0,0,0.5)).

To enhance the premium feel, use a 1px inner-border (stroke) on cards to simulate a "beveled edge" light catch from an imaginary top-down light source.

## Shapes
The shape language is consistently **Rounded**, striking a balance between approachable and professional. 

- **Standard Elements:** Buttons, input fields, and small tags use a 0.5rem (8px) radius.
- **Containers:** Main dashboard cards and content sections use a 1rem (16px) radius to soften the technical nature of the data.
- **Interactive States:** On hover, shapes do not change their radius, but rather their background luminance.

## Components

### Buttons
- **Primary:** Background #60a5fa, Text #0f172a (for maximum contrast). High-gloss finish optional.
- **Secondary:** Transparent background, 1px border #334155, Text #f8fafc.
- **Success:** Background #86efac, Text #0f172a.

### Input Fields
- Background #0f172a (recessed into the card), Border 1px #334155. 
- Focus state: Border color changes to #60a5fa with a subtle outer glow.

### Cards
- Background #1e293b.
- Padding: 24px.
- Border: 1px solid #334155 to define edges against the navy background.

### Chips & Badges
- Small, rounded-pill shapes.
- Use low-opacity versions of the accent colors (e.g., Blue at 15% opacity) with full-saturation text for a "glowing" effect that remains readable.

### Lists & Tables
- Row dividers: 1px #334155.
- Hover state: Row background shifts to a slightly lighter charcoal to provide instant feedback.