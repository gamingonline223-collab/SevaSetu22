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
    console.log('Filter by status:', status);
    // In production, this would filter the issues
  };

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

            <div className="flex flex-wrap gap-sm mb-md">
              <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                <span className="material-icons text-sm">tune</span>
                Filter
              </button>
              <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                <span className="material-icons text-sm">sort</span>
                Sort
              </button>
              <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                <span className="material-icons text-sm">refresh</span>
                Refresh
              </button>
            </div>
          </div>

          {/* Issue Cards Feed */}
          <div className="space-y-md">
            {issues.map((issue) => (
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
                <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                  <span className="material-icons text-sm">tune</span>
                  Filter
                </button>
                <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                  <span className="material-icons text-sm">sort</span>
                  Sort
                </button>
                <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                  <span className="material-icons text-sm">refresh</span>
                  Refresh
                </button>
              </div>
            </div>

            {/* Ongoing Issue Cards Feed */}
            <div className="space-y-md">
              {ongoingIssuesData.map((issue) => (
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
                  <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                    <span className="material-icons text-sm">tune</span>
                    Filter
                  </button>
                  <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                    <span className="material-icons text-sm">sort</span>
                    Sort
                  </button>
                  <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                    <span className="material-icons text-sm">refresh</span>
                    Refresh
                  </button>
                </div>
              </div>

              {/* Issue Cards Feed */}
              <div className="space-y-md mb-2xl">
                {issues.map((issue) => (
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
                    <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                      <span className="material-icons text-sm">tune</span>
                      Filter
                    </button>
                    <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                      <span className="material-icons text-sm">sort</span>
                      Sort
                    </button>
                    <button className="px-md py-sm border border-neutral-300 rounded-md text-sm hover:border-primary-700 transition-colors flex items-center gap-sm">
                      <span className="material-icons text-sm">refresh</span>
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Ongoing Issue Cards Feed */}
                <div className="space-y-md">
                  {ongoingIssuesData.map((issue) => (
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
    </div>
  );
}
