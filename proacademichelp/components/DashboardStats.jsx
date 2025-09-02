// components/DashboardStats.jsx
'use client';

export default function DashboardStats({ stats }) {
  const cards = [
    {
      title: 'Total Requests',
      value: stats.total ?? 0,
      sub: 'All time',
      icon: GridIcon,
    },
    {
      title: 'Open',
      value: stats.open ?? 0,
      sub: 'Awaiting action',
      icon: InboxIcon,
    },
    {
      title: 'Completed',
      value: stats.completed ?? 0,
      sub: 'Delivered work',
      icon: CheckIcon,
    },
    {
      title: 'Avg. Rating',
      value: (stats.avgRating ?? 0).toFixed(1),
      sub: 'From reviews',
      icon: StarIcon,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ title, value, sub, icon: Icon }) => (
        <div
          key={title}
          className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mt-1">
                {value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </div>
            {/* White accent: white icon on a teal chip */}
            <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 ring-1 ring-white/30">
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* minimal inline icons (stroke = currentColor) */
function GridIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><rect x="3" y="3" width="8" height="8" rx="2" strokeWidth="2"/><rect x="13" y="3" width="8" height="8" rx="2" strokeWidth="2"/><rect x="3" y="13" width="8" height="8" rx="2" strokeWidth="2"/><rect x="13" y="13" width="8" height="8" rx="2" strokeWidth="2"/></svg>);}
function InboxIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M3 13V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" strokeWidth="2"/><path d="M3 13h5a4 4 0 0 0 8 0h5" strokeWidth="2"/><path d="M3 13l2.7 7.1A2 2 0 0 0 7.6 22h8.8a2 2 0 0 0 1.9-1.9L21 13" strokeWidth="2"/></svg>);}
function CheckIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M20 6 9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function StarIcon(props){return(<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 17.3 6.2 20l1.1-6.4L2 8.9l6.5-.9L12 2l3.5 6 6.5.9-5.3 4.7L17.8 20z"/></svg>);}
