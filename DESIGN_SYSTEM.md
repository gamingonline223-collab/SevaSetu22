# Seva-Setu Design System Reference

## Color Palette

### Primary Colors

- **Primary Blue**: `#0066CC` (Interactive elements, CTAs, headers)
  - Hover: `#0052A3`
  - Light: `#e0effe`
- **Success Green**: `#22C55E` (Resolved status, positive actions)
- **Warning Orange**: `#F97316` (Pending status, attention needed)
- **Danger Red**: `#EF4444` (Urgent issues, errors, critical)

### Neutral Colors

- **Dark Gray**: `#1F2937` (Text, headings - 95% black)
- **Medium Gray**: `#6B7280` (Secondary text, disabled)
- **Light Gray**: `#F3F4F6` (Backgrounds, borders)
- **White**: `#FFFFFF` (Cards, surfaces)
- **Border**: `#E5E7EB` (Light dividers)

## Typography

### Font Family

```css
font-family: "Inter", "Segoe UI", sans-serif;
```

### Type Scale

| Level | Size | Weight | Line Height | Usage           |
| ----- | ---- | ------ | ----------- | --------------- |
| 3xl   | 32px | 700    | 1.2         | Page heading    |
| 2xl   | 24px | 700    | 1.3         | Section heading |
| xl    | 18px | 600    | 1.4         | Subheading      |
| lg    | 16px | 400    | 1.6         | Body large      |
| base  | 14px | 400    | 1.5         | Body default    |
| sm    | 12px | 500    | 1.4         | Small text      |
| xs    | 11px | 600    | 1.3         | Labels          |

### Tailwind Classes

```javascript
// Headings
.text-3xl .font-bold           // 32px, 700
.text-2xl .font-bold           // 24px, 700
.text-xl .font-semibold        // 18px, 600

// Body
.text-lg                        // 16px, 400
.text-base                      // 14px, 400

// Small
.text-sm                        // 12px, 500
.text-xs .font-bold             // 11px, 600
```

## Spacing System (8px Base)

```javascript
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
```

### Common Patterns

- **Button padding**: `sm md` (8px 16px)
- **Card padding**: `lg` (24px)
- **Section spacing**: `xl` (32px)
- **Page margins**: `md` on mobile, `lg` on desktop

### Tailwind Classes

```javascript
.p-xs   .p-sm   .p-md   .p-lg   .p-xl   .p-2xl
.px-md  .py-sm
.gap-sm .gap-md
.mb-lg  .mt-xl
```

## Shadows

### Elevation Hierarchy

- **Flat**: No shadow (default cards on light bg)
- **Elevated**: `0 1px 3px rgba(0,0,0,0.1)` (Hover states, interactive)
- **Floating**: `0 10px 25px rgba(0,0,0,0.15)` (Modals, dropdowns)

### Tailwind Classes

```javascript
.shadow-elevated   // 0 1px 3px rgba(0,0,0,0.1)
.shadow-floating   // 0 10px 25px rgba(0,0,0,0.15)
.hover:shadow-floating
```

## Components

### Button Variants

#### Primary Button

```html
<button class="bg-primary-700 text-white hover:bg-primary-800">Action</button>
```

**States**:

- Default: `bg-primary-700`
- Hover: `bg-primary-800` + shadow
- Active: `bg-primary-900`
- Disabled: `opacity-60 cursor-not-allowed`

#### Outline Button

```html
<button class="border border-primary-700 text-primary-700">Secondary</button>
```

#### Danger Button

```html
<button class="bg-danger text-white hover:bg-red-600">Delete</button>
```

### Card Styles

#### Default Card

```html
<div
  class="bg-white border border-neutral-200 rounded-lg p-lg shadow-elevated hover:shadow-floating"
>
  Content
</div>
```

#### Card with Image

```html
<div class="bg-white border border-neutral-200 rounded-lg overflow-hidden">
  <div class="h-[180px] bg-neutral-100">
    <img src="" alt="" class="w-full h-full object-cover" />
  </div>
  <div class="p-lg">Content</div>
</div>
```

### Badge Styles

#### Priority Badge

```html
<!-- Urgent -->
<span class="px-2 py-1 bg-danger text-white rounded text-xs font-bold">
  🔴 Urgent
</span>

<!-- Medium -->
<span class="px-2 py-1 bg-warning text-white rounded text-xs font-bold">
  🟡 Medium
</span>

<!-- Low -->
<span class="px-2 py-1 bg-primary-700 text-white rounded text-xs font-bold">
  🔵 Low
</span>
```

### Status Indicators

#### Status Dots

```javascript
🟢 Free       // text-success (#22C55E)
🔵 On-site    // text-primary-700 (#0066CC)
🟡 On Break   // text-warning (#F97316)
🔴 Urgent     // text-danger (#EF4444)
```

### Input States

#### Default Input

```html
<input
  class="px-md py-sm border border-neutral-300 rounded-md text-sm focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
/>
```

#### Focus State

```
border-primary-700 + ring-2 ring-primary-100
```

#### Error State

```html
<input class="border border-danger focus:border-danger" />
<label class="text-danger text-sm">Error message</label>
```

## Mobile vs Desktop

### Viewport Breakpoints

```javascript
// Mobile (default)
375px - 767px

// Tablet
768px - 1279px

// Desktop
1280px+
```

### Responsive Classes

```javascript
// Hidden on mobile, visible on desktop
.hidden .md:block

// Mobile-only
.md:hidden

// Stack on mobile, grid on desktop
.grid .grid-cols-1 .md:grid-cols-3

// Different padding
.p-md .md:p-lg
```

## Accessibility

### Contrast Ratios

- **Text on background**: 4.5:1 minimum (WCAG AA)
- **Dark Gray (#1F2937) on White**: 14:1 ✅
- **Primary Blue (#0066CC) on White**: 5.3:1 ✅
- **Medium Gray (#6B7280) on White**: 6.9:1 ✅

### Touch Targets

- **Minimum size**: 44×44px
- **Padding around**: 8px

```javascript
.min-h-[44px] .min-w-[44px]
```

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### Keyboard Navigation

- Tab: Move between elements
- Shift+Tab: Reverse direction
- Enter/Space: Activate button
- Escape: Close modal/dropdown
- Arrow keys: Navigate lists

## Responsive Examples

### 3-Column Grid (Desktop)

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</div>
```

### Sticky Sidebar (Desktop)

```html
<div class="bg-white rounded-lg p-lg h-fit sticky top-[80px]">
  Sidebar content
</div>
```

### Mobile Bottom Navigation

```html
<nav class="md:hidden fixed bottom-0 left-0 right-0 h-14 border-t">
  <!-- Tabs -->
</nav>
```

### Hamburger Menu (Mobile/Tablet)

```html
<button class="md:hidden">☰</button>
<!-- Slide-out sidebar -->
```

## Icon Set

Used in Seva-Setu (Emoji + Text):

### Categories

- 🚱 Water
- 💡 Electricity
- 🚗 Road
- 🧹 Sanitation
- 🔥 Fire/Emergency
- 🏥 Health

### Actions

- 🔍 Search
- 🔔 Notifications
- 📋 Issues/Tasks
- 👥 Workers
- 📊 Analytics
- ⚙️ Settings
- 🏠 Home
- 👤 Profile
- 📍 Location
- ⏰ Time

### Status

- 🟢 Free/Available
- 🔵 On-site/Active
- 🟡 Warning/Break
- 🔴 Urgent/Critical
- ✓ Completed
- → Next/Forward

## Code Examples

### Using Primary Button

```jsx
import Button from "@/components/Button";

<Button variant="primary" size="md">
  Quick Assign
</Button>;
```

### Using Issue Card

```jsx
import IssueCard from "@/components/IssueCard";

<IssueCard
  issue={{
    id: "ISS-001",
    title: "Water Leak",
    category: "water",
    priority: "urgent",
    // ... more props
  }}
  onViewDetails={(issue) => console.log(issue)}
  onAssign={(worker) => console.log(worker)}
/>;
```

### Using Stat Card

```jsx
import StatCard from "@/components/StatCard";

<StatCard status="pending" onClick={(status) => filterByStatus(status)} />;
```

### Using Department Bar

```jsx
import DepartmentBar from "@/components/DepartmentBar";

<DepartmentBar department="Water" count={12} total={58} />;
```

## Tailwind Configuration

Located in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        700: '#0066CC',
        800: '#0c4a6e',
      },
      success: '#22C55E',
      warning: '#F97316',
      danger: '#EF4444',
      neutral: {
        50: '#FFFFFF',
        100: '#F3F4F6',
        200: '#E5E7EB',
        800: '#1F2937',
      },
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
    },
    boxShadow: {
      elevated: '0 1px 3px rgba(0, 0, 0, 0.1)',
      floating: '0 10px 25px rgba(0, 0, 0, 0.15)',
    },
  },
},
```

---

**Last Updated**: January 3, 2026  
**Designed for**: Seva-Setu Admin Dashboard  
**Responsive**: Mobile, Tablet, Desktop  
**Accessible**: WCAG AA compliant
