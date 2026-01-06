'use client';

const priorityConfig = {
  pending: { icon: 'pending_actions', label: 'Pending', count: 23, color: 'text-neutral-800' },
  urgent: { icon: 'priority_high', label: 'Urgent', count: 8, color: 'text-neutral-800' },
  medium: { icon: 'info', label: 'Medium', count: 15, color: 'text-neutral-700' },
  low: { icon: 'check_circle', label: 'Low', count: 12, color: 'text-neutral-600' },
};

export default function StatCard({ status, onClick }) {
  const data = priorityConfig[status];

  return (
    <button
      onClick={() => onClick?.(status)}
      className="bg-white border border-neutral-200 rounded-lg p-md hover:shadow-floating transition-all duration-200 w-full"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <span className="material-icons text-2xl">{data.icon}</span>
          <span className="text-sm md:text-base text-neutral-700 font-medium">{data.label}</span>
        </div>
        <span className="text-xl md:text-2xl font-bold text-neutral-800">{data.count}</span>
      </div>
    </button>
  );
}
