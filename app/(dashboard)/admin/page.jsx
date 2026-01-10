'use client';

import { useState } from 'react';
import IssueCard from '@/components/IssueCard';
import IssueStatsPanel from '@/components/IssueStatsPanel';
import WorkerStatusPanel from '@/components/WorkerStatusPanel';
import Link from 'next/link';

// Dummy Issues Data
const dummyIssues = [
  {
    id: 'ISS-001',
    title: 'Water Pipe Leaking',
    category: 'water',
    priority: 'urgent',
    ward: 'Ward 12',
    location: 'Sector 5-A',
    address: 'Main Street near Post Office',
    description:
      'Water is leaking from the main supply pipe. Children are drinking contaminated water. Needs urgent repair and water quality testing.',
    reportedBy: 'Rajesh Kumar',
    timeAgo: '2 hours ago',
    images: ['/img1.jpg'],
  },
  {
    id: 'ISS-002',
    title: 'Damaged Road Surface',
    category: 'road',
    priority: 'medium',
    ward: 'Ward 8',
    location: 'Sector 3-B',
    address: 'Highway near traffic light',
    description:
      'Large pothole on main road causing traffic congestion and accidents. Multiple complaints from commuters.',
    reportedBy: 'Priya Sharma',
    timeAgo: '5 hours ago',
    images: ['/img2.jpg'],
  },
  {
    id: 'ISS-003',
    title: 'Streetlight Not Working',
    category: 'electricity',
    priority: 'medium',
    ward: 'Ward 15',
    location: 'Sector 7-C',
    address: 'Near park entrance',
    description:
      'Street light is not functioning. This causes safety issues at night. Residents report security concerns.',
    reportedBy: 'Amit Patel',
    timeAgo: '8 hours ago',
    images: ['/img3.jpg'],
  },
  {
    id: 'ISS-004',
    title: 'Garbage Pile-up',
    category: 'sanitation',
    priority: 'low',
    ward: 'Ward 5',
    location: 'Sector 2-A',
    address: 'Market area',
    description: 'Garbage not collected for 3 days. Creating odor and attracting rodents.',
    reportedBy: 'Deepak Singh',
    timeAgo: '1 day ago',
    images: ['/img4.jpg'],
  },
  {
    id: 'ISS-005',
    title: 'Fire Safety Equipment Missing',
    category: 'fire',
    priority: 'urgent',
    ward: 'Ward 3',
    location: 'Sector 4-D',
    address: 'Shopping mall area',
    description:
      'Fire extinguishers missing from emergency exit. High occupancy area. Immediate inspection needed.',
    reportedBy: 'Neha Gupta',
    timeAgo: '3 hours ago',
    images: ['/img5.jpg'],
  },
  {
    id: 'ISS-006',
    title: 'Water Quality Issue',
    category: 'water',
    priority: 'low',
    ward: 'Ward 10',
    location: 'Sector 6-B',
    address: 'Residential area',
    description: 'Tap water has yellowish tint and unusual smell. Testing recommended.',
    reportedBy: 'Vikram Desai',
    timeAgo: '2 days ago',
    images: ['/img6.jpg'],
  },
];

// Ongoing Issues Data
const ongoingIssues = [
  {
    id: 'ONG-001',
    title: 'Sewer Line Blockage',
    category: 'sanitation',
    priority: 'medium',
    ward: 'Ward 7',
    location: 'Sector 4-A',
    address: 'Near colony gate',
    description:
      'Main sewer line blocked causing water backflow. Repair work in progress for 5 days.',
    reportedBy: 'Suresh Kumar',
    timeAgo: '5 days ago',
    images: ['/img7.jpg'],
  },
  {
    id: 'ONG-002',
    title: 'Street Repair Work',
    category: 'road',
    priority: 'medium',
    ward: 'Ward 6',
    location: 'Sector 2-C',
    address: 'Main commercial road',
    description:
      'Pothole repair work started. Expected completion in 3 days. Traffic diversion in place.',
    reportedBy: 'Patel Construction',
    timeAgo: '3 days ago',
    images: ['/img8.jpg'],
  },
  {
    id: 'ONG-003',
    title: 'Electricity Network Upgrade',
    category: 'electricity',
    priority: 'low',
    ward: 'Ward 11',
    location: 'Sector 8-A',
    address: 'Central transformer station',
    description:
      'Scheduled maintenance of electrical grid. Work in progress for power stabilization.',
    reportedBy: 'Electricity Board',
    timeAgo: '4 days ago',
    images: ['/img9.jpg'],
  },
];

export default function AdminDashboard() {
  const [issues, setIssues] = useState(dummyIssues);
  const [ongoingIssuesData, setOngoingIssuesData] = useState(ongoingIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [assignedIssues, setAssignedIssues] = useState({});
  const [assignedWorkers, setAssignedWorkers] = useState({});
  const [mobileTab, setMobileTab] = useState('issues'); // 'issues' or 'status'
  const [workersOpen, setWorkersOpen] = useState(false); // Mobile workers side panel
  const [filterPriority, setFilterPriority] = useState(null); // Filter state
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Filter menu visibility
  const [sortType, setSortType] = useState(null); // Sort state: null, 'priority-high', 'priority-low', 'newest', 'oldest'
  const [showSortMenu, setShowSortMenu] = useState(false); // Sort menu visibility
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    // In production, this would open a modal
  };

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

  const handleFilterChange = (status) => {
    // Map stat card status to priority filter
    if (status === 'pending') {
      // Pending shows all issues
      setFilterPriority(null);
    } else if (status === 'urgent') {
      // Urgent shows only urgent priority
      setFilterPriority(filterPriority === 'urgent' ? null : 'urgent');
    } else if (status === 'medium') {
      // Medium shows only medium priority
      setFilterPriority(filterPriority === 'medium' ? null : 'medium');
    } else if (status === 'low') {
      // Low shows only low priority
      setFilterPriority(filterPriority === 'low' ? null : 'low');
    }
    setShowFilterMenu(false);
  };

  const handleSortChange = (newSort) => {
    setSortType(newSort);
    setShowSortMenu(false);
  };

  const handleRefresh = () => {
    setFilterPriority(null);
    setSortType(null);
    setShowFilterMenu(false);
    setShowSortMenu(false);
  };

  const getFilteredIssues = (issuesList) => {
    let filtered = issuesList;
    
    // Apply priority filter
    if (filterPriority) {
      filtered = filtered.filter(issue => issue.priority === filterPriority);
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.address.toLowerCase().includes(query) ||
        issue.location.toLowerCase().includes(query) ||
        issue.ward.toLowerCase().includes(query) ||
        issue.reportedBy.toLowerCase().includes(query) ||
        issue.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const getSortedIssues = (issuesList) => {
    if (!sortType) return issuesList;
    const sorted = [...issuesList];
    if (sortType === 'priority-high') {
      return sorted.sort((a, b) => {
        const priorityOrder = { urgent: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortType === 'priority-low') {
      return sorted.sort((a, b) => {
        const priorityOrder = { low: 0, medium: 1, urgent: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
    return issuesList;
  };

  const filteredIssues = getSortedIssues(getFilteredIssues(issues));
  const filteredOngoingIssues = getSortedIssues(getFilteredIssues(ongoingIssuesData));

  return (
    <div className="pt-md pb-md md:pb-md px-md md:px-lg max-w-7xl mx-auto">
      {/* Mobile Header */}
      <div className="md:hidden mb-lg">
        <div className="flex items-center gap-sm">
          <button 
            onClick={() => setWorkersOpen(!workersOpen)}
            className="p-sm hover:bg-neutral-100 rounded-md transition-colors"
          >
            <span className="material-icons text-lg text-neutral-800">menu</span>
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-md py-sm border border-neutral-300 rounded-md text-sm focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
            />
            <span className="material-icons absolute right-md top-1/2 transform -translate-y-1/2 text-neutral-400">
              search
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Side Panel for Workers */}
      {workersOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 top-[60px]"
          onClick={() => setWorkersOpen(false)}
        />
      )}
      <div className={`
        md:hidden fixed top-[60px] left-0 bottom-0 z-50 w-72 bg-white border-r border-neutral-200
        transform transition-transform duration-300 ease-out overflow-y-auto
        ${workersOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-lg">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="text-lg font-bold text-neutral-800">Available Workers</h3>
            <button 
              onClick={() => setWorkersOpen(false)}
              className="p-sm hover:bg-neutral-100 rounded-md"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          <WorkerStatusPanel />
        </div>
      </div>

      {/* Desktop Grid Layout - Same as before */}
      <div className="hidden md:grid grid-cols-3 gap-lg">
        {/* LEFT COLUMN - Worker Status */}
        <div className="col-span-1">
          <WorkerStatusPanel />
        </div>

        {/* CENTER COLUMN - New Issues Feed */}
        <div className="col-span-1">
          <div className="mb-lg">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-2xl font-bold text-neutral-800">
                <span className="material-icons inline-block mr-md text-danger">priority_high</span>
                New Issues <span className="text-warning text-lg ml-sm">(23 Pending)</span>
              </h2>
            </div>

            {/* Search Bar */}
            <div className="mb-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, location, reporter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-md py-md border border-neutral-300 rounded-md text-sm focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                />
                <span className="material-icons absolute right-md top-1/2 transform -translate-y-1/2 text-neutral-400">
                  search
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-sm mb-md">
              <div className="relative">
                <button 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                    filterPriority 
                      ? 'border-primary-700 bg-primary-50 text-primary-700' 
                      : 'border-neutral-300 hover:border-primary-700'
                  }`}
                >
                  <span className="material-icons text-sm">tune</span>
                  Filter {filterPriority && `(${filterPriority})`}
                </button>
                {showFilterMenu && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                    <button
                      onClick={() => handleFilterChange('urgent')}
                      className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                        filterPriority === 'urgent' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                      }`}
                    >
                      Urgent
                      {filterPriority === 'urgent' && <span className="material-icons text-sm">check</span>}
                    </button>
                    <button
                      onClick={() => handleFilterChange('medium')}
                      className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                        filterPriority === 'medium' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                      }`}
                    >
                      Medium
                      {filterPriority === 'medium' && <span className="material-icons text-sm">check</span>}
                    </button>
                    <button
                      onClick={() => handleFilterChange('low')}
                      className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                        filterPriority === 'low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                      }`}
                    >
                      Low
                      {filterPriority === 'low' && <span className="material-icons text-sm">check</span>}
                    </button>
                    {filterPriority && (
                      <button
                        onClick={() => handleFilterChange(null)}
                        className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                      >
                        Clear Filter
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                    sortType 
                      ? 'border-primary-700 bg-primary-50 text-primary-700' 
                      : 'border-neutral-300 hover:border-primary-700'
                  }`}
                >
                  <span className="material-icons text-sm">sort</span>
                  Sort {sortType && `(${sortType})`}
                </button>
                {showSortMenu && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                    <button
                      onClick={() => handleSortChange('priority-high')}
                      className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                        sortType === 'priority-high' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                      }`}
                    >
                      Priority (High to Low)
                      {sortType === 'priority-high' && <span className="material-icons text-sm">check</span>}
                    </button>
                    <button
                      onClick={() => handleSortChange('priority-low')}
                      className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                        sortType === 'priority-low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                      }`}
                    >
                      Priority (Low to High)
                      {sortType === 'priority-low' && <span className="material-icons text-sm">check</span>}
                    </button>
                    {sortType && (
                      <button
                        onClick={() => handleSortChange(null)}
                        className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                      >
                        Clear Sort
                      </button>
                    )}
                  </div>
                )}
              </div>
              <button 
                onClick={handleRefresh}
                className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm"
              >
                <span className="material-icons text-sm">refresh</span>
                Refresh
              </button>
            </div>
          </div>

          {/* Issue Cards Feed */}
          <div className="space-y-md">
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onViewDetails={handleViewDetails}
                onAssign={(worker) => handleAssignWorker(issue.id, worker)}
                isAssigned={assignedIssues[issue.id] || false}
                assignedWorker={assignedWorkers[issue.id]}
              />
            ))}
          </div>

          {/* Ongoing Issues Section */}
          <div className="mt-2xl">
            <div className="mb-lg">
              <div className="flex items-center justify-between mb-md">
                <h2 className="text-2xl font-bold text-neutral-800">
                  <span className="material-icons inline-block mr-md text-neutral-700">schedule</span>
                  Ongoing Issues <span className="text-warning text-lg ml-sm">(3 In Progress)</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-sm mb-md">
                <div className="relative">
                  <button 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                      filterPriority 
                        ? 'border-primary-700 bg-primary-50 text-primary-700' 
                        : 'border-neutral-300 hover:border-primary-700'
                    }`}
                  >
                    <span className="material-icons text-sm">tune</span>
                    Filter {filterPriority && `(${filterPriority})`}
                  </button>
                  {showFilterMenu && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                      <button
                        onClick={() => handleFilterChange('urgent')}
                        className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                          filterPriority === 'urgent' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                        }`}
                      >
                        Urgent
                        {filterPriority === 'urgent' && <span className="material-icons text-sm">check</span>}
                      </button>
                      <button
                        onClick={() => handleFilterChange('medium')}
                        className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                          filterPriority === 'medium' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                        }`}
                      >
                        Medium
                        {filterPriority === 'medium' && <span className="material-icons text-sm">check</span>}
                      </button>
                      <button
                        onClick={() => handleFilterChange('low')}
                        className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                          filterPriority === 'low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                        }`}
                      >
                        Low
                        {filterPriority === 'low' && <span className="material-icons text-sm">check</span>}
                      </button>
                      {filterPriority && (
                        <button
                          onClick={() => handleFilterChange(null)}
                          className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                        >
                          Clear Filter
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                      sortType 
                        ? 'border-primary-700 bg-primary-50 text-primary-700' 
                        : 'border-neutral-300 hover:border-primary-700'
                    }`}
                  >
                    <span className="material-icons text-sm">sort</span>
                    Sort {sortType && `(${sortType})`}
                  </button>
                  {showSortMenu && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                      <button
                        onClick={() => handleSortChange('priority-high')}
                        className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                          sortType === 'priority-high' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                        }`}
                      >
                        Priority (High to Low)
                        {sortType === 'priority-high' && <span className="material-icons text-sm">check</span>}
                      </button>
                      <button
                        onClick={() => handleSortChange('priority-low')}
                        className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                          sortType === 'priority-low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                        }`}
                      >
                        Priority (Low to High)
                        {sortType === 'priority-low' && <span className="material-icons text-sm">check</span>}
                      </button>
                      {sortType && (
                        <button
                          onClick={() => handleSortChange(null)}
                          className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                        >
                          Clear Sort
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleRefresh}
                  className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm"
                >
                  <span className="material-icons text-sm">refresh</span>
                  Refresh
                </button>
              </div>
            </div>

            {/* Ongoing Issue Cards Feed */}
            <div className="space-y-md">
              {filteredOngoingIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onViewDetails={handleViewDetails}
                  onAssign={(worker) => handleAssignWorker(issue.id, worker)}
                  isAssigned={assignedIssues[issue.id] || false}
                  assignedWorker={assignedWorkers[issue.id]}
                  hideAssign={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Stats & Analytics */}
        <div className="col-span-1">
          <IssueStatsPanel onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Mobile Tab View */}
      <div className="md:hidden">
        {/* Tabs */}
        <div className="flex border-b border-neutral-200 sticky top-[60px] bg-white z-30 -mx-md px-md">
          <button
            onClick={() => setMobileTab('issues')}
            className={`flex-1 py-md px-md border-b-2 transition-colors font-semibold text-sm ${
              mobileTab === 'issues' 
                ? 'border-primary-700 text-primary-700' 
                : 'border-transparent text-neutral-600'
            }`}
          >
            Issues
          </button>
          <button
            onClick={() => setMobileTab('status')}
            className={`flex-1 py-md px-md border-b-2 transition-colors font-semibold text-sm ${
              mobileTab === 'status' 
                ? 'border-primary-700 text-primary-700' 
                : 'border-transparent text-neutral-600'
            }`}
          >
            Status
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-lg">
          {mobileTab === 'issues' && (
            <>
              <div className="mb-lg">
                <div className="flex items-center justify-between mb-md">
                  <h2 className="text-2xl font-bold text-neutral-800">
                    <span className="material-icons inline-block mr-md text-danger">priority_high</span>
                    New Issues <span className="text-warning text-lg ml-sm">(23 Pending)</span>
                  </h2>
                </div>

                <div className="flex flex-wrap gap-sm mb-md">
                  <div className="relative">
                    <button 
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                        filterPriority 
                          ? 'border-primary-700 bg-primary-50 text-primary-700' 
                          : 'border-neutral-300 hover:border-primary-700'
                      }`}
                    >
                      <span className="material-icons text-sm">tune</span>
                      Filter {filterPriority && `(${filterPriority})`}
                    </button>
                    {showFilterMenu && (
                      <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                        <button
                          onClick={() => handleFilterChange('urgent')}
                          className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                            filterPriority === 'urgent' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                          }`}
                        >
                          Urgent
                          {filterPriority === 'urgent' && <span className="material-icons text-sm">check</span>}
                        </button>
                        <button
                          onClick={() => handleFilterChange('medium')}
                          className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                            filterPriority === 'medium' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                          }`}
                        >
                          Medium
                          {filterPriority === 'medium' && <span className="material-icons text-sm">check</span>}
                        </button>
                        <button
                          onClick={() => handleFilterChange('low')}
                          className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                            filterPriority === 'low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                          }`}
                        >
                          Low
                          {filterPriority === 'low' && <span className="material-icons text-sm">check</span>}
                        </button>
                        {filterPriority && (
                          <button
                            onClick={() => handleFilterChange(null)}
                            className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                          >
                            Clear Filter
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                        sortType 
                          ? 'border-primary-700 bg-primary-50 text-primary-700' 
                          : 'border-neutral-300 hover:border-primary-700'
                      }`}
                    >
                      <span className="material-icons text-sm">sort</span>
                      Sort {sortType && `(${sortType})`}
                    </button>
                    {showSortMenu && (
                      <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                        <button
                          onClick={() => handleSortChange('priority-high')}
                          className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                            sortType === 'priority-high' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                          }`}
                        >
                          Priority (High to Low)
                          {sortType === 'priority-high' && <span className="material-icons text-sm">check</span>}
                        </button>
                        <button
                          onClick={() => handleSortChange('priority-low')}
                          className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                            sortType === 'priority-low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                          }`}
                        >
                          Priority (Low to High)
                          {sortType === 'priority-low' && <span className="material-icons text-sm">check</span>}
                        </button>
                        {sortType && (
                          <button
                            onClick={() => handleSortChange(null)}
                            className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                          >
                            Clear Sort
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={handleRefresh}
                    className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm"
                  >
                    <span className="material-icons text-sm">refresh</span>
                    Refresh
                  </button>
                </div>
              </div>

              {/* Issue Cards Feed */}
              <div className="space-y-md mb-2xl">
                {filteredIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onViewDetails={handleViewDetails}
                    onAssign={(worker) => handleAssignWorker(issue.id, worker)}
                    isAssigned={assignedIssues[issue.id] || false}
                    assignedWorker={assignedWorkers[issue.id]}
                  />
                ))}
              </div>

              {/* Ongoing Issues Section */}
              <div>
                <div className="mb-lg">
                  <div className="flex items-center justify-between mb-md">
                    <h2 className="text-2xl font-bold text-neutral-800">
                      <span className="material-icons inline-block mr-md text-neutral-700">schedule</span>
                      Ongoing Issues <span className="text-warning text-lg ml-sm">(3 In Progress)</span>
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-sm mb-md">
                    <div className="relative">
                      <button 
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                          filterPriority 
                            ? 'border-primary-700 bg-primary-50 text-primary-700' 
                            : 'border-neutral-300 hover:border-primary-700'
                        }`}
                      >
                        <span className="material-icons text-sm">tune</span>
                        Filter {filterPriority && `(${filterPriority})`}
                      </button>
                      {showFilterMenu && (
                        <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                          <button
                            onClick={() => handleFilterChange('urgent')}
                            className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                              filterPriority === 'urgent' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                            }`}
                          >
                            Urgent
                            {filterPriority === 'urgent' && <span className="material-icons text-sm">check</span>}
                          </button>
                          <button
                            onClick={() => handleFilterChange('medium')}
                            className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                              filterPriority === 'medium' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                            }`}
                          >
                            Medium
                            {filterPriority === 'medium' && <span className="material-icons text-sm">check</span>}
                          </button>
                          <button
                            onClick={() => handleFilterChange('low')}
                            className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                              filterPriority === 'low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                            }`}
                          >
                            Low
                            {filterPriority === 'low' && <span className="material-icons text-sm">check</span>}
                          </button>
                          {filterPriority && (
                            <button
                              onClick={() => handleFilterChange(null)}
                              className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                            >
                              Clear Filter
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button 
                        onClick={() => setShowSortMenu(!showSortMenu)}
                        className={`px-md py-sm border rounded-md text-sm transition-colors flex items-center gap-sm ${
                          sortType 
                            ? 'border-primary-700 bg-primary-50 text-primary-700' 
                            : 'border-neutral-300 hover:border-primary-700'
                        }`}
                      >
                        <span className="material-icons text-sm">sort</span>
                        Sort {sortType && `(${sortType})`}
                      </button>
                      {showSortMenu && (
                        <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-300 rounded-md shadow-lg z-10 w-48">
                          <button
                            onClick={() => handleSortChange('priority-high')}
                            className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between ${
                              sortType === 'priority-high' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                            }`}
                          >
                            Priority (High to Low)
                            {sortType === 'priority-high' && <span className="material-icons text-sm">check</span>}
                          </button>
                          <button
                            onClick={() => handleSortChange('priority-low')}
                            className={`w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm flex items-center justify-between border-t border-neutral-200 ${
                              sortType === 'priority-low' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-neutral-800'
                            }`}
                          >
                            Priority (Low to High)
                            {sortType === 'priority-low' && <span className="material-icons text-sm">check</span>}
                          </button>
                          {sortType && (
                            <button
                              onClick={() => handleSortChange(null)}
                              className="w-full text-left px-md py-sm hover:bg-neutral-100 transition-colors text-sm border-t border-neutral-200 text-neutral-600"
                            >
                              Clear Sort
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={handleRefresh}
                      className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm"
                    >
                      <span className="material-icons text-sm">refresh</span>
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Ongoing Issue Cards Feed */}
                <div className="space-y-md">
                  {filteredOngoingIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onViewDetails={handleViewDetails}
                      onAssign={(worker) => handleAssignWorker(issue.id, worker)}
                      isAssigned={assignedIssues[issue.id] || false}
                      assignedWorker={assignedWorkers[issue.id]}
                      hideAssign={true}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {mobileTab === 'status' && (
            <>
              <div className="mb-lg">
                <h3 className="text-lg font-bold text-neutral-800 mb-md flex items-center gap-sm">
                  <span className="material-icons">dashboard</span>
                  Issue Status
                </h3>
                <IssueStatsPanel onFilterChange={handleFilterChange} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-md z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-800">{selectedIssue.title}</h2>
              <button
                onClick={() => setSelectedIssue(null)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-lg space-y-lg">
              {/* Priority Badge */}
              <div>
                <p className="text-xs font-bold text-neutral-500 mb-sm">PRIORITY</p>
                <div className="inline-flex items-center gap-sm px-3 py-2 rounded text-sm font-bold text-white bg-neutral-800">
                  <span className="material-icons text-sm">priority_high</span>
                  {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
                </div>
              </div>

              {/* Ward & Location */}
              <div className="grid grid-cols-2 gap-lg">
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">WARD</p>
                  <p className="text-base font-semibold text-neutral-800">{selectedIssue.ward}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">LOCATION</p>
                  <p className="text-base font-semibold text-neutral-800">{selectedIssue.location}</p>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <p className="text-xs font-bold text-neutral-500 mb-sm">FULL ADDRESS</p>
                <p className="text-base text-neutral-700">{selectedIssue.address}</p>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-bold text-neutral-500 mb-sm">CATEGORY</p>
                <p className="text-base font-semibold text-neutral-800 capitalize">{selectedIssue.category}</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-bold text-neutral-500 mb-sm">DESCRIPTION</p>
                <p className="text-base text-neutral-700 leading-relaxed">{selectedIssue.description}</p>
              </div>

              {/* Reporter Info */}
              <div className="grid grid-cols-2 gap-lg bg-neutral-50 p-lg rounded-lg border border-neutral-200">
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">REPORTED BY</p>
                  <p className="text-base font-semibold text-neutral-800">{selectedIssue.reportedBy}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">TIME</p>
                  <p className="text-base font-semibold text-neutral-800">{selectedIssue.timeAgo}</p>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-lg border-t border-neutral-200">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="w-full px-md py-md bg-primary-700 text-white rounded-md font-semibold hover:bg-primary-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
