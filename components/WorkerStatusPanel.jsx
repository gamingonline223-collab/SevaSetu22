'use client';

import { useState } from 'react';

export default function WorkerStatusPanel() {
  const [showAllWorkers, setShowAllWorkers] = useState(false);

  const allWorkers = [
    { id: 1, name: 'John Doe', department: 'Electricity', status: 'free' },
    { id: 2, name: 'Jane Smith', department: 'Water', status: 'onsite' },
    { id: 3, name: 'Alice Johnson', department: 'Roads', status: 'free' },
    { id: 4, name: 'Bob Williams', department: 'Electricity', status: 'free' },
    { id: 5, name: 'Carol Davis', department: 'Water', status: 'onsite' },
    { id: 6, name: 'David Miller', department: 'Roads', status: 'free' },
    { id: 7, name: 'Emma Wilson', department: 'Fire/Emergency', status: 'break' },
    { id: 8, name: 'Frank Brown', department: 'Electricity', status: 'onsite' },
    { id: 9, name: 'Grace Lee', department: 'Water', status: 'free' },
    { id: 10, name: 'Henry Moore', department: 'Roads', status: 'break' },
  ];

  const workers = [
    { status: 'free', label: 'Free', count: 5, color: 'text-neutral-700' },
    { status: 'onsite', label: 'On-site', count: 3, color: 'text-neutral-700' },
    { status: 'break', label: 'On Break', count: 2, color: 'text-neutral-700' },
  ];

  const departments = [
    { name: 'Electricity', count: 2, status: 'free' },
    { name: 'Water', count: 1, status: 'onsite' },
    { name: 'Roads', count: 2, status: 'free' },
    { name: 'Fire/Emergency', count: 0, status: 'break' },
  ];

  const getStatusDot = (status) => {
    switch (status) {
      case 'free':
        return 'check_circle';
      case 'onsite':
        return 'assignment_ind';
      case 'break':
        return 'schedule';
      default:
        return 'help';
    }
  };

  const getStatusColor = (status) => {
    return 'text-neutral-700';
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-lg h-fit sticky top-[80px] md:top-[80px]">
      {/* Header */}
      <h3 className="text-lg font-bold text-neutral-800 mb-md flex items-center justify-between">
        Available Workers
        <button className="text-neutral-400 hover:text-neutral-600">
          <span className="material-icons">close</span>
        </button>
      </h3>

      {/* Total */}
      <p className="text-sm text-neutral-500 mb-md">Total: 10 Workers Online</p>

      {/* Status Breakdown */}
      <div className="bg-white border border-neutral-200 rounded-lg p-md mb-lg">
        {workers.map((worker) => (
          <div key={worker.status} className="flex items-center justify-between mb-sm last:mb-0">
            <span className={`text-sm text-neutral-700 flex items-center gap-2`}>
              <span className={worker.color}>
                <span className="material-icons text-lg">{getStatusDot(worker.status)}</span>
              </span>
              {worker.label}
            </span>
            <span className="text-sm font-bold text-neutral-800">{worker.count}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShowAllWorkers(!showAllWorkers)}
        className="w-full text-primary-700 text-sm font-semibold hover:text-primary-800 mb-lg flex items-center justify-center gap-sm"
      >
        <span className="material-icons text-lg">people</span>
        {showAllWorkers ? 'Hide' : 'View'} All Workers ({allWorkers.length})
      </button>

      {/* All Workers List */}
      {showAllWorkers && (
        <div className="mb-lg pb-lg border-b border-neutral-200">
          <h4 className="text-sm font-bold text-neutral-700 mb-md">All Workers ({allWorkers.length})</h4>
          <div className="space-y-sm max-h-96 overflow-y-auto">
            {allWorkers.map((worker) => (
              <div key={worker.id} className="flex items-center justify-between p-sm bg-neutral-50 rounded border border-neutral-100">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-800">{worker.name}</p>
                  <p className="text-xs text-neutral-500">{worker.department}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  worker.status === 'free' ? 'bg-success-100 text-success-700' :
                  worker.status === 'onsite' ? 'bg-warning-100 text-warning-700' :
                  'bg-neutral-100 text-neutral-700'
                }`}>
                  {worker.status === 'free' ? 'Free' : worker.status === 'onsite' ? 'On-site' : 'Break'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department Breakdown */}
      <h4 className="text-sm font-bold text-neutral-700 mb-md">Department-wise</h4>
      <div className="space-y-md">
        {departments.map((dept) => (
          <div key={dept.name} className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">{dept.name}</span>
            <div className="flex items-center gap-sm">
              <span className="text-xs font-bold text-neutral-800">{dept.count}</span>
              <span className={getStatusColor(dept.status)}>
                <span className="material-icons text-lg">{getStatusDot(dept.status)}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
