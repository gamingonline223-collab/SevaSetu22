# Seva-Setu Application Routes

## Route Map

### Public Routes (No Authentication Required)

| Route     | File                  | Component        | Description                                        |
| --------- | --------------------- | ---------------- | -------------------------------------------------- |
| `/`       | `app/page.jsx`        | Landing Page     | Role selection screen (Citizen, Admin, Worker)     |
| `/admin`  | `app/admin/page.jsx`  | Admin Dashboard  | **MAIN DASHBOARD** - Issue management for officers |
| `/user`   | `app/user/page.jsx`   | User Dashboard   | Placeholder for citizen dashboard                  |
| `/worker` | `app/worker/page.jsx` | Worker Dashboard | Placeholder for field worker dashboard             |

---

## Page Descriptions

### `/` (Landing / Role Selection)

**File**: `app/page.jsx`

**Purpose**: Allow user to select their role and navigate to appropriate dashboard

**Visual**:

```
┌─────────────────────────────┐
│   Logo: ৎ                   │
│                             │
│ SEVA-SETU                   │
│ Your Ward, Your Voice.      │
│ Fixed by AI.                │
│                             │
│ Select Your Role:           │
│ [👨‍💼 Admin / Officer]       │
│ [👤 Citizen / User]         │
│ [👷 Field Worker]           │
│                             │
│ © 2026 Seva-Setu            │
└─────────────────────────────┘
```

**Interactions**:

- Click "Admin / Officer" → Navigate to `/admin`
- Click "Citizen / User" → Navigate to `/user`
- Click "Field Worker" → Navigate to `/worker`

**Responsive**: Yes (centered card on all sizes)

---

### `/admin` (Admin Dashboard) ⭐ MAIN

**File**: `app/admin/page.jsx`

**Purpose**: Complete dashboard for municipal officers to manage issues

**Layout**:

- **Desktop** (1280px+): 3-column layout

  - Left: Worker status (sticky)
  - Center: Issue feed (scrollable)
  - Right: Stats & analytics (sticky)

- **Tablet** (768px-1279px): 2-column layout

  - Sidebar: Hamburger menu
  - Main: Feed + stats below

- **Mobile** (375px-767px): Single column
  - Navbar: Top
  - Feed: Main content
  - Bottom sections: Stats, workers
  - Bottom nav: 4 tabs

**Key Components**:

- `<Navbar />` - Top navigation
- `<Sidebar />` - Left navigation
- `<IssueCard />` - Issue display (multiple)
- `<IssueStatsPanel />` - Right sidebar stats
- `<WorkerStatusPanel />` - Left sidebar workers
- Bottom navigation (mobile only)

**Features**:
✅ Scrollable issue feed (6 sample issues)  
✅ Quick assign dropdown (select worker)  
✅ Filter buttons (Filter, Sort, Refresh)  
✅ Load more button  
✅ Sticky sidebars on desktop  
✅ Bottom navigation on mobile  
✅ Responsive design

**States**:

- Unassigned issue (default)
- Assigned issue (shows worker, green border)
- Resolved issue (grayed out, green border)

**Dummy Data**:

- 6 issues (Urgent, Medium, Low mix)
- Worker availability (5 free, 3 on-site, 2 break)
- Department stats (Electricity, Water, Roads, Fire, Sanitation)
- Status counts (23 pending, 8 urgent, 15 medium, 12 low)

**Interactive Elements**:

1. **Quick Assign Dropdown**:

   - Click "Quick Assign ▼" on any card
   - Dropdown shows available workers
   - Select worker → Card updates with assignment badge

2. **View Details Button**:

   - Placeholder (would open modal in production)

3. **Filter/Sort Buttons**:

   - Placeholder (would filter feed in production)

4. **Stat Cards** (right sidebar):

   - Clickable to filter by status
   - Shows count + icon

5. **Bottom Navigation** (mobile):
   - 4 tabs: Home (active), Issues, Analytics, Profile
   - Home tab highlighted

**Responsive Behavior**:

- Desktop: 3 columns, sticky sidebars
- Tablet: 2 columns, hamburger menu visible
- Mobile: 1 column, sections stacked, bottom nav shown

---

### `/user` (User/Citizen Dashboard)

**File**: `app/user/page.jsx`

**Status**: Placeholder

**Future Purpose**:

- Report new issues
- Track issue status
- View resolved issues in ward
- Rate solutions
- Community impact view

**Current**: Simple "Coming Soon" page with link back to home

---

### `/worker` (Worker/Field Staff Dashboard)

**File**: `app/worker/page.jsx`

**Status**: Placeholder

**Future Purpose**:

- View assigned tasks (location-based)
- Navigate to problem sites
- Capture photos of work
- Update issue status
- Mark tasks complete
- View performance metrics

**Current**: Simple "Coming Soon" page with link back to home

---

## Global Layout

**File**: `app/layout.jsx`

**Applied To**: All routes

**Components**:

1. `<Navbar />` - Fixed at top (60px desktop, 48px mobile)
2. `<Sidebar />` - Left navigation (desktop always visible, mobile hamburger)
3. `<main>{children}</main>` - Page content

**Features**:

- Metadata (title, description, theme color)
- PWA manifest link
- Font preload (Inter)
- Apple mobile web app meta tags
- Responsive viewport

---

## Navigation Flow

```
START
  ↓
/ (Landing)
  ├─→ Click "Admin" → /admin ⭐
  ├─→ Click "User" → /user (placeholder)
  └─→ Click "Worker" → /worker (placeholder)

/admin
  ├─→ Top Navbar
  │   ├─→ Click Notifications 🔔
  │   ├─→ Click Profile 👤
  │   └─→ Search bar
  │
  ├─→ Left Sidebar
  │   ├─→ Home (active)
  │   ├─→ Issues (badge: 23)
  │   ├─→ Analytics
  │   ├─→ Workers
  │   ├─→ Settings
  │   └─→ [Logout]
  │
  ├─→ Center Feed
  │   ├─→ Filter, Sort, Refresh buttons
  │   ├─→ Issue cards (scrollable)
  │   │   ├─→ View Details button
  │   │   └─→ Quick Assign dropdown
  │   └─→ Load More button
  │
  └─→ Right Sidebar (sticky on desktop)
      ├─→ Issue Status cards (4)
      └─→ Department-wise bars (5)
```

---

## Route Metadata

### `/` (Landing)

- **Title**: "Seva-Setu: Your Ward, Your Voice. Fixed by AI."
- **Layout**: Centered card, gradient background
- **Mobile**: Full-width card with padding

### `/admin` (Admin Dashboard)

- **Title**: "Seva-Setu - Admin Dashboard"
- **Layout**: Navbar + Sidebar + Main content
- **Sticky Elements**: Sidebars on desktop
- **Bottom Nav**: Mobile only

### `/user`, `/worker`

- **Title**: Respective names
- **Status**: Coming Soon placeholders
- **Link**: Back to `/` button

---

## Future Routes (Not Yet Built)

```
/admin
  /settings        → Admin settings
  /reports         → Analytics & reports
  /workers         → Worker management & details
  /issue/:id       → Issue detail view (modal or page)

/user
  /report          → New issue form
  /issues          → My issues list
  /issues/:id      → Issue detail & status tracking
  /community       → Ward-wide stats

/worker
  /tasks           → Task list (assigned)
  /task/:id        → Task detail & navigation
  /completed       → Completed tasks history
  /profile         → Worker performance
```

---

## Redirects & Navigation

### From Landing (`/`)

```
Admin button → /admin
User button → /user
Worker button → /worker
```

### From Any Dashboard

```
Navbar logo → / (would go to landing or dashboard depending on role)
Sidebar menu items → Different sections (not implemented yet)
Logout button → / (would logout and go to landing)
```

### Mobile Navigation

```
Bottom nav Home → /admin (or respective dashboard)
Bottom nav Issues → Filters feed to issues tab
Bottom nav Analytics → Shows stats
Bottom nav Profile → Would go to user profile
```

---

## URL Structure Summary

| Route     | Type   | Status         | Purpose                |
| --------- | ------ | -------------- | ---------------------- |
| `/`       | Public | ✅ Complete    | Role selection         |
| `/admin`  | Public | ✅ Complete    | Admin dashboard (MAIN) |
| `/user`   | Public | 🔄 Placeholder | Citizen dashboard      |
| `/worker` | Public | 🔄 Placeholder | Worker dashboard       |

---

## Testing Routes

### To Test All Routes

```bash
# Start dev server
npm run dev

# Visit each route in browser
1. http://localhost:3000/ → Click buttons
2. http://localhost:3000/admin → Main dashboard
3. http://localhost:3000/user → Placeholder
4. http://localhost:3000/worker → Placeholder
```

### To Test Responsive Design

```
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select preset:
   - iPhone 12 (390px)
   - iPad (768px)
   - Desktop (1280px)
4. Test navigation at each size
```

---

## Accessing Admin Dashboard

### Desktop

1. `npm run dev`
2. Visit `http://localhost:3000`
3. Click "👨‍💼 Admin / Officer"
4. See full admin dashboard with 3 columns

### Mobile (via browser DevTools)

1. Same steps above
2. In DevTools, toggle device toolbar
3. Select "iPhone 12" or similar
4. See mobile layout (1 column + bottom nav)

### Direct Access

- Skip landing page: Go directly to `http://localhost:3000/admin`

---

**Last Updated**: January 3, 2026  
**For**: Seva-Setu Application  
**Status**: Routes documented and ready
