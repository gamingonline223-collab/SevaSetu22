'use client';

import StatCard from './StatCard';
import DepartmentBar from './DepartmentBar';

export default function IssueStatsPanel({ onFilterChange }) {
  const departments = [
    { name: 'Electricity', count: 18, total: 58 },
    { name: 'Water', count: 12, total: 58 },
    { name: 'Roads', count: 16, total: 58 },
    { name: 'Fire/Emergency', count: 4, total: 58 },
    { name: 'Sanitation', count: 8, total: 58 },
  ];

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-lg h-fit sticky top-[80px] md:top-[80px]">
      {/* Issue Status Section */}
      <h3 className="text-lg font-bold text-neutral-800 mb-md">Issue Status</h3>

      <div className="space-y-sm mb-lg">
        <StatCard status="pending" onClick={onFilterChange} />
        <StatCard status="urgent" onClick={onFilterChange} />
        <StatCard status="medium" onClick={onFilterChange} />
        <StatCard status="low" onClick={onFilterChange} />
      </div>

      <p className="text-xs text-neutral-500 mb-lg text-center">Total: 58 Issues</p>

      {/* Department-wise Section */}
      <div className="border-t border-neutral-200 pt-lg">
        <h4 className="text-sm font-bold text-neutral-700 mb-md">Department-wise Issues</h4>

        <div className="space-y-md">
          {departments.map((dept) => (
            <DepartmentBar
              key={dept.name}
              department={dept.name}
              count={dept.count}
              total={dept.total}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-neutral-200 mt-lg pt-lg space-y-sm">
        <button className="w-full px-md py-sm bg-neutral-100 text-neutral-800 rounded-md text-sm font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-sm">
          <span className="material-icons text-lg">download</span>
          Generate Report
        </button>
        <button className="w-full px-md py-sm bg-neutral-100 text-neutral-800 rounded-md text-sm font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-sm">
          <span className="material-icons text-lg">table_chart</span>
          Export CSV
        </button>
      </div>
    </div>
  );
}
