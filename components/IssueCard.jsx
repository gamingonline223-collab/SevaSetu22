'use client';

import { useState } from 'react';

const priorityConfig = {
  urgent: { label: 'Urgent', icon: 'priority_high', color: 'bg-neutral-800', textColor: 'text-neutral-800' },
  medium: { label: 'Medium', icon: 'info', color: 'bg-neutral-700', textColor: 'text-neutral-700' },
  low: { label: 'Low', icon: 'check_circle', color: 'bg-neutral-600', textColor: 'text-neutral-600' },
};

const categoryIcons = {
  water: 'water_drop',
  electricity: 'lightbulb',
  road: 'directions_car',
  sanitation: 'cleaning_services',
  fire: 'fire_emergency',
  health: 'local_hospital',
};

export default function IssueCard({
  issue,
  onViewDetails,
  onAssign,
  isAssigned = false,
  assignedWorker = null,
  hideAssign = false,
}) {
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const priorityData = priorityConfig[issue.priority] || priorityConfig.low;
  const categoryIcon = categoryIcons[issue.category] || '📍';

  const workers = [
    { id: 1, name: 'Ravi', dept: 'Water', distance: '2.5 km', status: 'free' },
    { id: 2, name: 'Priya', dept: 'Water', distance: '1.8 km', status: 'free' },
    { id: 3, name: 'Arjun', dept: 'Water', distance: '4.2 km', status: 'busy' },
  ];

  const handleAssignWorker = (worker) => {
    setSelectedWorker(worker);
    setShowAssignDropdown(false);
    onAssign(worker);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-elevated hover:shadow-floating transition-all duration-200 mb-md relative">
      {/* Image Section */}
      <div className="relative h-[180px] md:h-[200px] bg-gradient-to-br from-neutral-200 to-neutral-300 overflow-hidden flex items-center justify-center rounded-t-lg">
        {issue.imageUrl ? (
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <span className="material-icons text-5xl text-neutral-400">{categoryIcon}</span>
            <p className="text-neutral-500 text-sm mt-sm">Issue Image</p>
          </div>
        )}
        {issue.images && issue.images.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-semibold">
            1/{issue.images.length}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-lg">
        {/* Title & Priority Badge */}
        <div className="flex items-start justify-between gap-md mb-md">
          <div className="flex-1">
            <div className="flex items-center gap-sm mb-sm">
              <span className="material-icons text-2xl">{categoryIcon}</span>
              <h3 className="text-lg font-bold text-neutral-800 flex-1">
                {issue.title}
              </h3>
            </div>
            <span className={`inline-flex items-center gap-sm px-2 py-1 rounded text-xs font-bold text-white ${priorityData.color}`}>
              <span className="material-icons text-sm">{priorityData.icon}</span>
              {priorityData.label}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-md">
          <p className="text-sm text-neutral-600 font-semibold flex items-center gap-sm">
            <span className="material-icons text-lg">location_on</span>
            {issue.ward}, {issue.location}
          </p>
          <p className="text-sm text-neutral-500 ml-md">{issue.address}</p>
        </div>

        {/* Description */}
        <p className="text-base text-neutral-700 mb-md line-clamp-3">
          {issue.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-neutral-500 mb-md pb-md border-b border-neutral-200">
          <span className="flex items-center gap-sm">
            <span className="material-icons text-lg">person</span>
            {issue.reportedBy}
          </span>
          <span className="flex items-center gap-sm">
            <span className="material-icons text-lg">access_time</span>
            {issue.timeAgo}
          </span>
        </div>

        {/* Assigned Status (if applicable) */}
        {isAssigned && assignedWorker && (
          <div className="mb-md p-sm bg-primary-50 border-l-4 border-primary-700 rounded">
            <p className="text-sm text-primary-700 font-semibold flex items-center gap-sm">
              <span className="material-icons text-lg">check_circle</span>
              Assigned to {assignedWorker.name} ({assignedWorker.dept})
            </p>
            <p className="text-xs text-primary-600 flex items-center gap-sm mt-sm">
              <span className="material-icons text-sm">access_time</span>
              5 mins ago
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-md">
          <button
            onClick={() => onViewDetails(issue)}
            className={`px-md py-sm border border-primary-700 text-primary-700 rounded-md font-semibold hover:bg-primary-50 transition-colors text-sm ${hideAssign ? 'w-full' : 'flex-1'}`}
          >
            View Details
          </button>

          {!hideAssign && (
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                className="w-full px-md py-sm bg-primary-700 text-white rounded-md font-semibold hover:bg-primary-800 transition-colors text-sm flex items-center justify-center gap-sm"
              >
                {isAssigned ? 'Reassign' : 'Quick Assign'}
                <span className="material-icons text-sm">expand_more</span>
              </button>

              {/* Dropdown Menu */}
              {showAssignDropdown && (
                <div className="absolute top-full mt-2 right-0 left-0 bg-white border border-neutral-200 rounded-md shadow-lg z-50 min-w-[280px] md:min-w-[320px]">
                  <div className="p-md max-h-[300px] overflow-y-auto">
                    <p className="text-xs font-bold text-neutral-500 mb-md">SELECT A WORKER</p>
                    {workers.length > 0 ? (
                      workers.map((worker) => (
                        <button
                          key={worker.id}
                          type="button"
                          onClick={() => handleAssignWorker(worker)}
                          className="w-full text-left px-md py-sm hover:bg-primary-50 rounded mb-sm transition-colors"
                        >
                          <div className="flex items-center gap-md">
                            <span className={`material-icons text-sm font-bold ${worker.status === 'free' ? 'text-success-600' : 'text-warning-600'}`}>
                              {worker.status === 'free' ? 'check_circle' : 'schedule'}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-neutral-800">{worker.name}</p>
                              <p className="text-xs text-neutral-500">
                                {worker.dept} • {worker.distance}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-neutral-600 text-center py-md">No workers available</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
