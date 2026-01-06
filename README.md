# Seva-Setu Admin Dashboard

A mobile-first PWA for municipal issue management and administrative oversight.

## Project Structure

```
/app
  /admin              → Admin dashboard main screen
  /user               → Citizen dashboard (placeholder)
  /worker             → Worker dashboard (placeholder)
  layout.jsx          → Global layout (navbar, sidebar)
  page.jsx            → Landing / role selection screen

/components
  Button.jsx          → Reusable button component
  Card.jsx            → Reusable card component
  Navbar.jsx          → Top navigation bar
  Sidebar.jsx         → Dashboard sidebar (desktop & mobile)
  IssueCard.jsx       → Issue display card with actions
  StatCard.jsx        → Status statistic card
  DepartmentBar.jsx   → Department progress bar
  WorkerStatusPanel.jsx    → Worker availability panel
  IssueStatsPanel.jsx      → Issue statistics & analytics panel

/styles
  globals.css         → Global styles & reset
  theme.css           → Design tokens & component utilities

/public
  /icons              → Icons and images
  manifest.json       → PWA manifest

tailwind.config.js    → Tailwind CSS configuration
postcss.config.js     → PostCSS configuration
next.config.js        → Next.js configuration
package.json          → Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Features

### Admin Dashboard

- ✅ Twitter-like issue feed (scrollable cards)
- ✅ Quick assign worker (dropdown from card)
- ✅ Issue statistics & filtering
- ✅ Department-wise breakdown with progress bars
- ✅ Worker availability panel
- ✅ Mobile-responsive design with sticky panels
- ✅ Bottom navigation for mobile

### Design System

- **Colors**: Primary Blue (#0066CC), Success Green, Warning Orange, Danger Red
- **Typography**: Inter font family with 7-level scale
- **Spacing**: 8px-based system (xs: 4px → 2xl: 48px)
- **Shadows**: Flat, Elevated, Floating hierarchy
- **Components**: Buttons, Cards, Stats, Badges (all accessible)

### Responsive Breakpoints

- **Mobile**: 375px – 767px (1-column layout, bottom nav)
- **Tablet**: 768px – 1279px (2-column layout, hamburger menu)
- **Desktop**: 1280px+ (3-column layout with sticky sidebars)

### Accessibility

- WCAG AA contrast ratios (4.5:1 minimum)
- 44×44px minimum touch targets
- Keyboard navigation support
- Focus visible indicators
- Semantic HTML

### PWA Support

- Manifest.json for installable app
- Viewport optimization for mobile
- Touch-friendly interface
- Offline support ready (add service worker)

## Components

### IssueCard

Displays municipal issue with:

- Image placeholder
- Category & priority
- Location & description
- Reporter info & timestamp
- View Details button
- Quick Assign dropdown (worker selection)

**Props**:

```javascript
{
  issue: {
    id, title, category, priority, ward, location,
    address, description, reportedBy, timeAgo, images
  },
  onViewDetails: (issue) => {},
  onAssign: (worker) => {},
  isAssigned: boolean,
  assignedWorker: object
}
```

### StatCard

Shows issue status with icon, label, and count.

**Props**:

```javascript
{
  status: 'pending' | 'urgent' | 'medium' | 'low',
  onClick: (status) => {}
}
```

### DepartmentBar

Horizontal progress bar for department issue distribution.

**Props**:

```javascript
{
  department: string,
  count: number,
  total: number
}
```

## Styling

### Tailwind Classes Used

- `bg-primary-700`, `text-primary-700`
- `bg-danger`, `bg-warning`, `bg-success`
- `shadow-elevated`, `shadow-floating`
- `hover:shadow-floating`, `transition-all`
- `min-h-[44px]` for touch targets
- `line-clamp-3` for text truncation
- `sticky top-[80px]` for sticky panels

### Custom CSS Classes

- `.btn-base`, `.btn-primary`, `.btn-outline`
- `.card`, `.badge`
- `.text-heading-1` through `.text-label`

## Dummy Data

Admin dashboard uses placeholder data for:

- 6 sample issues with various categories & priorities
- Worker availability (5 free, 3 on-site, 2 on break)
- Department-wise distribution
- Status statistics (23 Pending, 8 Urgent, 15 Medium, 12 Low)

No backend integration yet—all data is hardcoded.

## Next Steps

1. **Backend Integration**

   - Connect to issue API
   - Real worker availability data
   - Authentication

2. **Citizen Dashboard**

   - Report new issue form
   - Track submission status
   - Community impact view

3. **Worker Dashboard**

   - Location-based task list
   - Photo capture for updates
   - Completion confirmation

4. **Advanced Features**
   - Map integration (Google Maps)
   - Real-time notifications
   - Service Worker (offline support)
   - Image compression & upload

## Design Decisions

1. **Mobile-First**: Stacked layout on mobile, 3-column on desktop
2. **Twitter-like Feed**: Familiar scrolling UX for issue scanning
3. **Quick Actions**: Assign without leaving card (efficiency)
4. **Sticky Panels**: Always-visible stats & workers (mobile admin needs context)
5. **Color-Coded Priority**: Visual hierarchy without reading (fast scanning)
6. **Bottom Navigation**: One-handed mobile navigation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## License

Copyright © 2026 Seva-Setu
