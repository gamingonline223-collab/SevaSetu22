# 🚀 Quick Start Guide

## Installation & Setup

```bash
# 1. Navigate to project directory
cd d:\SevaSetu

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

## Project Structure Overview

```
Seva-Setu/
├── app/
│   ├── admin/
│   │   └── page.jsx          ← Admin Dashboard (FULLY BUILT)
│   ├── user/
│   │   └── page.jsx          ← User Dashboard (placeholder)
│   ├── worker/
│   │   └── page.jsx          ← Worker Dashboard (placeholder)
│   ├── layout.jsx            ← Global layout wrapper
│   └── page.jsx              ← Landing / role selection page
│
├── components/               ← Reusable UI components
│   ├── Button.jsx            ✅ Primary button with variants
│   ├── Card.jsx              ✅ Generic card container
│   ├── Navbar.jsx            ✅ Top navigation bar
│   ├── Sidebar.jsx           ✅ Mobile/desktop sidebar
│   ├── IssueCard.jsx         ✅ Issue card (with quick assign)
│   ├── StatCard.jsx          ✅ Status stat display
│   ├── DepartmentBar.jsx     ✅ Department progress bar
│   ├── WorkerStatusPanel.jsx ✅ Worker availability
│   └── IssueStatsPanel.jsx   ✅ Stats & analytics
│
├── styles/
│   ├── globals.css           ✅ Global styles & Tailwind
│   └── theme.css             ✅ Design tokens
│
├── public/
│   ├── manifest.json         ✅ PWA manifest
│   └── icons/                ← Place icons here
│
├── tailwind.config.js        ✅ Color palette & spacing
├── next.config.js            ✅ Next.js config
├── package.json              ✅ Dependencies
├── README.md                 ✅ Full documentation
└── .gitignore                ✅ Git ignore rules
```

## What's Already Built

### ✅ Admin Dashboard (`/admin`)

- **Header**: Fixed navbar with search, logo, notifications
- **Left Sidebar**:
  - Mobile hamburger menu (toggleable)
  - Desktop: Always visible with navigation
  - Collapsible on tablet
- **Center Feed** (Main Content):

  - Twitter-like scrollable issue cards
  - Each card shows: image, title, category, priority, location, description, reporter
  - Quick Assign dropdown (select worker without opening modal)
  - View Details button
  - 6 dummy issues with various priorities

- **Right Sidebar** (Sticky on Desktop):

  - Issue Status: 4 stat cards (Pending, Urgent, Medium, Low)
  - Department-wise breakdown: 5 progress bars
  - Quick action buttons (Generate Report, Export CSV)

- **Mobile Layout**:
  - Stacked sections (feed, then stats, then workers)
  - Bottom navigation bar (4 tabs: Home, Issues, Analytics, Profile)
  - Fixed on scroll, 56px height
  - Touch-friendly design (44px+ buttons)

### ✅ Design System

- **Colors**: Primary Blue, Success Green, Warning Orange, Danger Red + grays
- **Typography**: Inter font, 7-level hierarchy
- **Spacing**: 8px-based system
- **Shadows**: Flat/Elevated/Floating
- **Accessibility**: WCAG AA contrast, keyboard nav, focus states

### ✅ Responsive Design

- Mobile (375px–767px): 1 column + bottom nav
- Tablet (768px–1279px): 2 columns + hamburger
- Desktop (1280px+): 3 columns + sticky sidebars

### ✅ Components (Reusable)

- `<Button>` - primary, secondary, outline, danger variants
- `<Card>` - clickable/non-clickable, with images
- `<IssueCard>` - complex issue display with dropdown
- `<StatCard>` - status indicators
- `<DepartmentBar>` - progress bars
- Plus navbar, sidebar, panels

### ✅ PWA Ready

- Manifest.json for installable app
- Mobile viewport optimization
- Touch-friendly interface
- Ready for Service Worker (offline support)

---

## File Locations

| File                                                                 | Purpose                                   |
| -------------------------------------------------------------------- | ----------------------------------------- |
| [app/layout.jsx](app/layout.jsx)                                     | Global wrapper + metadata                 |
| [app/page.jsx](app/page.jsx)                                         | Role selection landing page               |
| [app/admin/page.jsx](app/admin/page.jsx)                             | **Admin Dashboard** (main implementation) |
| [components/IssueCard.jsx](components/IssueCard.jsx)                 | Issue card with quick assign              |
| [components/WorkerStatusPanel.jsx](components/WorkerStatusPanel.jsx) | Worker availability                       |
| [components/IssueStatsPanel.jsx](components/IssueStatsPanel.jsx)     | Stats & department bars                   |
| [tailwind.config.js](tailwind.config.js)                             | Design tokens (colors, spacing)           |
| [styles/globals.css](styles/globals.css)                             | Tailwind import & resets                  |
| [styles/theme.css](styles/theme.css)                                 | CSS variables & utilities                 |

---

## Viewing the Dashboard

### Desktop (1280px+)

```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR (Logo, Search, Notifications, Profile)               │
├──────────────┬──────────────────────────────┬───────────────┤
│ SIDEBAR      │ NEW ISSUES FEED              │ STATS & DEPTS  │
│              │ (scrollable cards)           │ (sticky)       │
│ • Home       │ • Issue Card 1               │ • Pending: 23  │
│ • Issues (23)│ • Issue Card 2               │ • Urgent: 8    │
│ • Analytics  │ • Issue Card 3               │ • Medium: 15   │
│ • Workers    │ • [Load More]                │ • Low: 12      │
│ • Settings   │                              │                │
│              │                              │ Dept-wise:     │
│              │                              │ • Elec. ████░░ │
│ [Logout]     │                              │ • Water ███░░░ │
│              │                              │ • Roads ████░░░│
│              │                              │ • Fire ██░░░░░ │
│              │                              │ • Sanit █████░░│
└──────────────┴──────────────────────────────┴───────────────┘
```

### Mobile (375px–767px)

```
┌───────────────────────────────┐
│ NAVBAR (Search + Profile)     │
├───────────────────────────────┤
│ NEW ISSUES FEED               │
│ (scrollable)                  │
│ • Issue Card 1                │
│ • Issue Card 2                │
│ • Issue Card 3                │
│ • Issue Card 4                │
│ • Issue Card 5                │
│ • Issue Card 6                │
│                               │
│ STATS CARDS (4-grid)          │
│ [Pending:23] [Urgent:8]       │
│ [Medium:15]  [Low:12]         │
│                               │
│ DEPARTMENT BARS               │
│ Electricity ████░░  18        │
│ Water      ██░░░░░  12        │
│ Roads      ███░░░░░ 16        │
│ Fire       ██░░░░░░  4        │
│                               │
│ WORKERS                       │
│ 🟢 Free: 5                    │
│ 🔵 On-site: 3                 │
│ 🟡 Break: 2                   │
│                               │
├───────────────────────────────┤
│ 🏠 Home | 📋 Issues(23) | 📊 📊 │
│ Analytics | 👤 Profile        │
└───────────────────────────────┘
```

---

## Key Features Implemented

✅ **3-Column Desktop Layout**

- Sticky sidebars (workers on left, stats on right)
- Scrollable center feed

✅ **Twitter-like Issue Cards**

- Image with count badge
- Category + Priority badge
- Location + Address
- Description (truncated)
- Reporter + timestamp
- View Details button
- Quick Assign dropdown

✅ **Quick Assign Dropdown**

- No modal needed
- Shows worker name, dept, distance, status
- Color-coded availability (🟢 Free, 🔵 Busy, 🟡 Break)
- Updates card UI on assign

✅ **Responsive Mobile Layout**

- Hamburger menu for sidebar
- Bottom navigation (4 tabs)
- Stacked sections
- Full-width cards
- Touch-friendly (44px+ buttons)

✅ **Design System**

- Tailwind configuration with custom colors
- CSS variables for themes
- Consistent spacing, typography
- Accessible (WCAG AA)

✅ **Placeholder Data**

- 6 dummy issues
- Worker availability
- Department stats
- Status counts

---

## Next Steps (What to Build)

1. **User/Citizen Dashboard**

   - Report new issue form
   - Track issue status
   - View community impact

2. **Worker Dashboard**

   - Location-based task list
   - Map navigation
   - Photo capture & status updates

3. **Backend Integration**

   - API endpoints for issues
   - Worker management
   - Authentication

4. **Advanced Features**
   - Real maps (Google Maps API)
   - Real notifications
   - Service Worker (offline)
   - Image optimization

---

## Customization

### Change Colors

Edit [tailwind.config.js](tailwind.config.js):

```javascript
colors: {
  primary: { 700: '#0066CC' }, // Change this
  success: '#22C55E',           // Or this
  // ... etc
}
```

### Change Spacing

Adjust `spacing` in same file:

```javascript
spacing: {
  xs: '4px',
  sm: '8px',
  // ... etc
}
```

### Change Typography

Modify `fontSize` in `tailwind.config.js`:

```javascript
fontSize: {
  base: ['14px', { lineHeight: '1.5' }],
  // ... etc
}
```

### Add More Issues

Edit [app/admin/page.jsx](app/admin/page.jsx), update `dummyIssues` array:

```javascript
const dummyIssues = [
  // Add more issue objects here
];
```

---

## Troubleshooting

### Port 3000 Already in Use?

```bash
npm run dev -- -p 3001
```

### Styles Not Applying?

1. Make sure `npm install` ran successfully
2. Check that Tailwind classes are correct (no typos)
3. Restart the dev server: `npm run dev`

### Mobile View Issues?

1. Use browser DevTools (F12)
2. Toggle device toolbar (mobile view)
3. Refresh page

---

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm start            # Run production server
npm run lint         # Check code quality
```

---

## Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ iOS Safari 14+  
✅ Chrome Mobile 90+

---

**Ready to start?**

```bash
npm install && npm run dev
```

Then visit: **http://localhost:3000** → Click "Admin / Officer" → See the dashboard!
