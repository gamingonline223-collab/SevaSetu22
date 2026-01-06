# Seva-Setu Component Library & Usage Guide

## Component Inventory

### 📦 Core Components

#### 1. **Button** (`Button.jsx`)

Reusable button with multiple variants and sizes.

**Variants**:

- `primary` (blue) - Main CTAs
- `secondary` (light) - Alternative actions
- `outline` (bordered) - Tertiary actions
- `danger` (red) - Destructive actions

**Sizes**:

- `sm` - Small (compact)
- `md` - Medium (default)
- `lg` - Large
- `full` - Full width

**Usage**:

```jsx
import Button from '@/components/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button variant="outline" isLoading={true}>
  Loading...
</Button>

<Button disabled>Disabled</Button>
```

**Props**:

```javascript
{
  variant: 'primary' | 'secondary' | 'outline' | 'danger',
  size: 'sm' | 'md' | 'lg' | 'full',
  isLoading: boolean,
  disabled: boolean,
  className: string,
  onClick: function,
  children: ReactNode
}
```

---

#### 2. **Card** (`Card.jsx`)

Generic container for content with optional image and clickability.

**Features**:

- Image section (optional, responsive height)
- Content area with padding
- Hover effects
- Clickable variant

**Usage**:

```jsx
import Card from '@/components/Card';

<Card title="Issue Title" subtitle="Location info">
  Card content goes here
</Card>

<Card
  title="Issue with Image"
  imageUrl="/image.jpg"
  imageHeight="h-[200px]"
  clickable={true}
  onClick={() => console.log('Clicked')}
>
  Content
</Card>
```

**Props**:

```javascript
{
  title: string,
  subtitle: string,
  imageUrl: string,
  imageHeight: string, // Tailwind class like 'h-[180px]'
  clickable: boolean,
  onClick: function,
  className: string,
  children: ReactNode
}
```

---

### 🎯 Admin Dashboard Components

#### 3. **IssueCard** (`IssueCard.jsx`)

Specialized card for displaying municipal issues with action buttons.

**Features**:

- Image placeholder
- Category icon + title + priority badge
- Location info (ward, address)
- Description (3-line truncated)
- Reporter name + timestamp
- "View Details" button
- "Quick Assign" dropdown (worker selection)
- Assigned state styling

**Usage**:

```jsx
import IssueCard from "@/components/IssueCard";

<IssueCard
  issue={{
    id: "ISS-001",
    title: "Water Pipe Leaking",
    category: "water",
    priority: "urgent",
    ward: "Ward 12",
    location: "Sector 5-A",
    address: "Main Street near Post Office",
    description: "Water is leaking from the main supply pipe...",
    reportedBy: "Rajesh Kumar",
    timeAgo: "2 hours ago",
    images: ["/img1.jpg"],
  }}
  onViewDetails={(issue) => openModal(issue)}
  onAssign={(worker) => assignWorker(worker)}
  isAssigned={false}
/>;
```

**Props**:

```javascript
{
  issue: {
    id: string,
    title: string,
    category: 'water' | 'electricity' | 'road' | 'sanitation' | 'fire',
    priority: 'urgent' | 'medium' | 'low',
    ward: string,
    location: string,
    address: string,
    description: string,
    reportedBy: string,
    timeAgo: string,
    images: array,
  },
  onViewDetails: (issue) => {},
  onAssign: (worker) => {},
  isAssigned: boolean,
  assignedWorker: object
}
```

**Rendered States**:

- **Unassigned**: Normal white card, blue action buttons
- **Assigned**: Blue left border, green success badge showing worker name
- **Resolved**: Grayed out (70% opacity), green left border

---

#### 4. **StatCard** (`StatCard.jsx`)

Compact stat display for issue status (Pending, Urgent, Medium, Low).

**Features**:

- Icon + label + count
- Clickable for filtering
- Hover effects

**Usage**:

```jsx
import StatCard from "@/components/StatCard";

<div class="grid grid-cols-2 gap-md">
  <StatCard status="pending" onClick={(status) => filter(status)} />
  <StatCard status="urgent" onClick={(status) => filter(status)} />
  <StatCard status="medium" onClick={(status) => filter(status)} />
  <StatCard status="low" onClick={(status) => filter(status)} />
</div>;
```

**Props**:

```javascript
{
  status: 'pending' | 'urgent' | 'medium' | 'low',
  onClick: (status) => {}
}
```

**Built-in Data**:

- Pending: 🔴 23
- Urgent: ⚠️ 8
- Medium: 🟡 15
- Low: 🔵 12

---

#### 5. **DepartmentBar** (`DepartmentBar.jsx`)

Horizontal progress bar showing department issue distribution.

**Features**:

- Department icon + name
- Count display
- Animated progress bar
- Responsive design

**Usage**:

```jsx
import DepartmentBar from '@/components/DepartmentBar';

<DepartmentBar department="Water" count={12} total={58} />
<DepartmentBar department="Electricity" count={18} total={58} />
<DepartmentBar department="Roads" count={16} total={58} />
```

**Props**:

```javascript
{
  department: string, // 'Electricity', 'Water', 'Roads', etc.
  count: number,      // Issues in this department
  total: number       // Total issues (for % calculation)
}
```

---

#### 6. **WorkerStatusPanel** (`WorkerStatusPanel.jsx`)

Sticky sidebar showing worker availability by status and department.

**Features**:

- Status breakdown (Free, On-site, On Break)
- Department-wise distribution
- Color-coded status dots
- "View All Workers" button
- Sticky on desktop (stays visible during scroll)

**Usage**:

```jsx
import WorkerStatusPanel from "@/components/WorkerStatusPanel";

<WorkerStatusPanel />;
```

**No Props** - Uses hardcoded dummy data:

- 5 Free, 3 On-site, 2 On Break
- Department breakdown per status

---

#### 7. **IssueStatsPanel** (`IssueStatsPanel.jsx`)

Complete stats & analytics sidebar with filtering.

**Features**:

- 4 StatCards for issue status
- 5 DepartmentBars
- Quick action buttons (Generate Report, Export CSV)
- Sticky on desktop
- Total issue count

**Usage**:

```jsx
import IssueStatsPanel from "@/components/IssueStatsPanel";

<IssueStatsPanel onFilterChange={(status) => filterIssues(status)} />;
```

**Props**:

```javascript
{
  onFilterChange: (status) => {}; // Called when stat card clicked
}
```

---

### 🧭 Navigation Components

#### 8. **Navbar** (`Navbar.jsx`)

Fixed top navigation bar with search, logo, notifications, and profile.

**Features**:

- Sticky/fixed positioning (top-0 z-50)
- Search bar (hidden on mobile)
- Notification bell with count
- Profile avatar dropdown
- Mobile-optimized height (48px mobile, 60px desktop)

**Usage**:

```jsx
import Navbar from "@/components/Navbar";

<Navbar />;
```

**No Props** - Global component for layout

**Mobile (max-width: 768px)**:

- Height: 48px
- Search icon (hidden input)
- Profile avatar visible
- No logo text

**Desktop (min-width: 768px)**:

- Height: 64px
- Search bar visible (200-250px)
- Logo + "Admin Dashboard" text
- Notifications + profile

---

#### 9. **Sidebar** (`Sidebar.jsx`)

Responsive sidebar navigation with mobile hamburger menu.

**Features**:

- Desktop: Always visible, left-aligned
- Tablet: Collapses to hamburger icon
- Mobile: Toggle button (bottom-right floating button) or hamburger
- Menu items with badges
- Active state highlighting
- Logout button

**Usage**:

```jsx
import Sidebar from "@/components/Sidebar";

<Sidebar />;
```

**No Props** - Global component for layout

**Mobile Layout**:

- Hamburger toggle button (bottom-right, FAB-style)
- Slide-out sidebar from left
- Dark overlay when open
- Click overlay to close

**Menu Items** (Hardcoded):

- 🏠 Home (active)
- 📋 Issues (badge: 23)
- 📊 Analytics
- 👥 Workers
- ⚙️ Settings
- [Logout] button (danger variant)

---

## Layout Structure

### Root Layout (`app/layout.jsx`)

```jsx
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0066cc" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="fonts" />
  </head>
  <body>
    <Navbar /> {/* Fixed top */}
    <div className="flex">
      <Sidebar /> {/* Left, responsive */}
      <main>{children}</main> {/* Main content, flex-1 */}
    </div>
  </body>
</html>
```

### Admin Page (`app/admin/page.jsx`)

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
  {/* LEFT COLUMN: Hidden on mobile, visible on desktop */}
  <WorkerStatusPanel />

  {/* CENTER COLUMN: Full width on mobile, 1/3 on desktop */}
  <div>
    <h2>New Issues</h2>
    <IssueCard ... />
    <IssueCard ... />
    {/* ... more cards ... */}
  </div>

  {/* RIGHT COLUMN: Hidden on mobile, visible on desktop */}
  <IssueStatsPanel />
</div>

{/* Mobile: Sections below feed */}
<IssueStatsPanel />
<WorkerStatusPanel />

{/* Mobile: Bottom navigation */}
<nav className="md:hidden fixed bottom-0">
  {/* 4 tabs */}
</nav>
```

---

## Component Composition Examples

### Example 1: Admin Dashboard Main Page

```jsx
'use client';

import IssueCard from '@/components/IssueCard';
import IssueStatsPanel from '@/components/IssueStatsPanel';
import WorkerStatusPanel from '@/components/WorkerStatusPanel';

export default function AdminDashboard() {
  const [issues, setIssues] = useState([...]);
  const [assignedIssues, setAssignedIssues] = useState({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
      <WorkerStatusPanel />

      <div>
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onAssign={(worker) => handleAssign(issue.id, worker)}
          />
        ))}
      </div>

      <IssueStatsPanel onFilterChange={handleFilter} />
    </div>
  );
}
```

### Example 2: Statistics Section

```jsx
<div className="bg-white rounded-lg p-lg">
  <h3 className="text-lg font-bold mb-md">Issue Status</h3>

  <div className="space-y-sm">
    <StatCard status="pending" onClick={handleFilter} />
    <StatCard status="urgent" onClick={handleFilter} />
    <StatCard status="medium" onClick={handleFilter} />
    <StatCard status="low" onClick={handleFilter} />
  </div>

  <p className="text-sm text-neutral-500 mt-md">Total: 58 Issues</p>
</div>
```

### Example 3: Department Breakdown

```jsx
<div className="border-t pt-lg">
  <h4 className="text-sm font-bold mb-md">Department-wise</h4>

  <div className="space-y-lg">
    <DepartmentBar department="Electricity" count={18} total={58} />
    <DepartmentBar department="Water" count={12} total={58} />
    <DepartmentBar department="Roads" count={16} total={58} />
    <DepartmentBar department="Fire" count={4} total={58} />
    <DepartmentBar department="Sanitation" count={8} total={58} />
  </div>
</div>
```

---

## Styling Guidelines

### Using Tailwind Classes

**Colors**:

```jsx
{
  /* Primary (blue) */
}
className = "bg-primary-700 text-primary-700 hover:bg-primary-800";

{
  /* Success (green) */
}
className = "bg-success text-success";

{
  /* Warning (orange) */
}
className = "bg-warning text-warning";

{
  /* Danger (red) */
}
className = "bg-danger text-danger";

{
  /* Neutral */
}
className = "bg-neutral-100 text-neutral-800 border-neutral-200";
```

**Spacing**:

```jsx
{/* Padding */}
className="p-sm"    {/* 8px */}
className="p-md"    {/* 16px */}
className="p-lg"    {/* 24px */}
className="px-md py-sm" {/* 16px horizontal, 8px vertical */}

{/* Margins */}
className="mb-md"   {/* margin-bottom: 16px */}
className="mt-lg"
className="gap-sm"  {/* grid/flex gap */}
```

**Typography**:

```jsx
className="text-lg font-bold"       {/* 16px, 700 weight */}
className="text-base font-semibold" {/* 14px, 600 weight */}
className="text-sm text-neutral-500" {/* 12px, 500, gray */}
```

**Responsive**:

```jsx
className="block md:hidden"         {/* Hide on desktop */}
className="hidden md:block"         {/* Hide on mobile */}
className="grid grid-cols-1 md:grid-cols-3" {/* 1 col mobile, 3 col desktop */}
className="p-md md:p-lg"            {/* Different padding */}
```

---

## State Management Patterns

### Issue Assignment State

```jsx
const [assignedIssues, setAssignedIssues] = useState({});
const [assignedWorkers, setAssignedWorkers] = useState({});

const handleAssignWorker = (issueId, worker) => {
  setAssignedIssues((prev) => ({
    ...prev,
    [issueId]: true,
  }));
  setAssignedWorkers((prev) => ({
    ...prev,
    [issueId]: worker,
  }));
};

// Usage in IssueCard
<IssueCard
  issue={issue}
  onAssign={(worker) => handleAssignWorker(issue.id, worker)}
  isAssigned={assignedIssues[issue.id]}
  assignedWorker={assignedWorkers[issue.id]}
/>;
```

### Filter State

```jsx
const [activeFilter, setActiveFilter] = useState(null);

const handleFilterChange = (status) => {
  setActiveFilter(status);
  // Filter issues array based on status
};

// Usage
<IssueStatsPanel onFilterChange={handleFilterChange} />;
```

---

## Mobile vs Desktop Rendering

### Conditional Rendering

```jsx
{
  /* Desktop only */
}
<div className="hidden md:block md:col-span-1">
  <WorkerStatusPanel />
</div>;

{
  /* Mobile only */
}
<div className="md:hidden">
  <WorkerStatusPanel />
</div>;
```

### Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
  {/* 1 column on mobile, 3 columns on desktop */}
</div>
```

### Sticky Positioning

```jsx
<div className="sticky top-[80px] h-fit">
  {/* Stays fixed on scroll, respects navbar height */}
</div>
```

---

## Accessibility Checklist

✅ Button minimum size: 44×44px  
✅ Contrast ratios: 4.5:1+  
✅ Focus visible: 2px blue outline  
✅ Semantic HTML (button, nav, main)  
✅ Alt text on images  
✅ Color + icon (not color alone)  
✅ Tab navigation support  
✅ Keyboard shortcuts documented

---

## Common Issues & Solutions

### Issue: Tailwind classes not applying

**Solution**:

1. Restart dev server
2. Check class names are spelled correctly
3. Verify Tailwind config includes the file path

### Issue: Responsive layout breaks on tablet

**Solution**:

1. Add `md:` prefixes for tablet+ sizes
2. Test at 768px breakpoint
3. Use `md:block` and `hidden` classes

### Issue: Sticky sidebar overlaps content on mobile

**Solution**:

1. Use `hidden md:block` to hide desktop sidebar on mobile
2. Use fixed position for mobile drawer instead
3. Add `z-index` management

### Issue: Images not loading

**Solution**:

1. Use `/public` folder for static images
2. Check image paths (relative vs absolute)
3. Verify image format (jpg, png, webp)

---

**Last Updated**: January 3, 2026  
**For**: Seva-Setu Admin Dashboard  
**Version**: 1.0
