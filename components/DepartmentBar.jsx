'use client';

export default function DepartmentBar({ department, count, total }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  const deptIcons = {
    electricity: '💡',
    water: '🚱',
    roads: '🚗',
    fire: '🔥',
    sanitation: '🧹',
  };

  return (
    <div className="mb-lg">
      <div className="flex items-center justify-between mb-sm">
        <span className="text-sm font-semibold text-neutral-800">
          {deptIcons[department.toLowerCase()] || '📍'} {department}
        </span>
        <span className="text-sm font-bold text-neutral-700">{count}</span>
      </div>
      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-700 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
