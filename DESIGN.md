---
name: Clinical Light
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#414754'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#717786'
  outline-variant: '#c0c6d6'
  surface-tint: '#005db8'
  primary: '#005ab3'
  on-primary: '#ffffff'
  primary-container: '#0073e0'
  on-primary-container: '#fefcff'
  inverse-primary: '#aac7ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#4d5d73'
  on-tertiary: '#ffffff'
  tertiary-container: '#66768d'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00468d'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '450'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin: 24px
---

## Brand & Style
The design system embodies a **Clinical Modernist** aesthetic, pivoting from a high-tech dark mode to a hyper-legible, bright, and sterile environment. It targets healthcare professionals and patients who require high cognitive clarity and a sense of institutional trust.

The style leverages **Minimalism** with a focus on "Medical Precision." By utilizing a white-dominant palette with structured cool-gray layering, the UI evokes a sense of cleanliness, efficiency, and calm. High-contrast interactive elements ensure that the sophisticated energy of the brand is preserved through sharp execution rather than decorative flair.

## Colors
This design system utilizes a high-clarity light palette designed for long-term use in clinical settings.
- **Primary Color:** Precision Cyan (#0A84FF) is used for critical calls to action, active states, and focus indicators.
- **Secondary Color:** Deep Navy (#0F172A) provides the structural anchor, used for primary text and headings to ensure maximum contrast.
- **Tertiary/Muted:** Slate Gray (#64748B) is reserved for secondary information, metadata, and placeholder text.
- **Neutral/Background:** The base surface is pure white (#FFFFFF), while the application background uses a cool-gray tint (#F8FAFC) to define work areas and separate navigation rails from content.

## Typography
The typography leverages **Plus Jakarta Sans** for its modern, geometric clarity. To adapt to the light theme, weight is used strategically:
- **Headings:** Utilize Semibold (600) and Bold (700) weights in Deep Navy to create a strong visual hierarchy against white surfaces.
- **Body Text:** Uses a weight of 400-450 for optimal legibility.
- **Data Labels:** Small labels utilize a 600 weight with slight letter spacing to ensure technical data is scannable at a glance.

## Layout & Spacing
The layout follows a **Fluid Grid** system based on an 8px base unit (4px for micro-adjustments). 
- **Desktop:** A 12-column grid with 20px gutters and 40px outer margins. Content containers are typically elevated on the cool-gray background.
- **Mobile:** A 4-column grid with 16px margins.
- **Philosophy:** Spacing is generous to prevent "data density fatigue," common in medical applications. Use white space as a functional separator rather than lines whenever possible.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** and **Refined Outlines** rather than heavy shadows.
- **Level 0 (Background):** #F8FAFC (Cool Gray).
- **Level 1 (Cards/Containers):** Pure #FFFFFF with a 1px solid border of `rgba(0,0,0,0.05)`.
- **Level 2 (Interactive/Floating):** Use a very soft, diffused shadow (0px 4px 12px rgba(15, 23, 42, 0.04)) to indicate items that can be dragged or are currently active.
- **Dividers:** Should be minimal—1px stroke using the `border_subtle` variable.

## Shapes
The shape language is "Soft Professional." 
- **Base Components:** 0.5rem (8px) radius provides a modern, approachable feel while maintaining the structure of a professional tool.
- **Large Containers:** 1rem (16px) for main dashboard modules to differentiate primary content areas.
- **Buttons:** 0.5rem (8px) consistent with components, avoiding fully round pills to keep the look "technical" rather than "casual."

## Components
- **Buttons:** Primary buttons use Precision Cyan (#0A84FF) with white text. Secondary buttons use a white fill with a 1px border (#CBD5E1) and Navy text.
- **Input Fields:** Use a 1px border. On focus, the border shifts to Precision Cyan with a subtle 2px outer glow of the same color at 10% opacity.
- **Cards:** White background, subtle border, no shadow unless in a "hover" or "active" state.
- **Status Chips:** Use a desaturated background of the status color (e.g., light emerald for "Stable") with high-contrast dark text of the same hue.
- **Data Tables:** Alternate row striping is not used; instead, use 1px horizontal dividers and highlight the row on hover with the neutral #F8FAFC color.
- **Progress Indicators:** Use a thick 4px stroke for circular loaders and linear bars to emphasize the "Clinical High-Tech" energy.