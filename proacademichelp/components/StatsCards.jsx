'use client';

export default function StatsCards({ items = [] }) {
  const ratings = (items || [])
    .map(r => Number(r?.rating) || 0)
    .filter(n => n > 0);

  const total = ratings.length;
  const avg = total ? ratings.reduce((a, b) => a + b, 0) / total : 0;
  const satisfied = total ? ratings.filter(r => r >= 4).length : 0;
  const satisfiedPct = total ? Math.round((satisfied / total) * 100) : 0;

  const onTimes = (items || []).filter(r => r?.onTime === true).length;
  const offTimes = (items || []).filter(r => r?.onTime === false).length;
  const timelyPct =
    onTimes + offTimes > 0 ? Math.round((onTimes / (onTimes + offTimes)) * 100) : satisfiedPct;

  const grade = toLetter(avg);

  const cards = [
    { title: 'Order Arrives Timely', value: `${timelyPct}%`, sub: 'Based on project feedback', icon: ClockIcon },
    { title: 'Overall Grade', value: grade, sub: `${avg.toFixed(2)}/5 average`, icon: MedalIcon },
    { title: 'Client Reviews', value: String(total), sub: 'Total submissions', icon: ChatIcon },
    { title: 'Satisfied Customers', value: `${satisfiedPct}%`, sub: 'Ratings ≥ 4 stars', icon: SmileIcon },
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
              <p className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mt-1">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </div>
            {/* White-accent icon on teal chip */}
            <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 ring-1 ring-white/30">
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function toLetter(avg) {
  if (avg >= 4.75) return 'A+';
  if (avg >= 4.5) return 'A';
  if (avg >= 4.2) return 'A-';
  if (avg >= 3.8) return 'B+';
  if (avg >= 3.5) return 'B';
  if (avg >= 3.2) return 'B-';
  if (avg >= 2.8) return 'C+';
  if (avg >= 2.5) return 'C';
  return 'C-';
}

/* inline icons */
function ClockIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="12" r="9" strokeWidth="2"/><path d="M12 7v5l3 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function MedalIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="8" r="4" strokeWidth="2"/><path d="M7 14l5 7 5-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function ChatIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5H7l-4 3 1.5-5.5A8.5 8.5 0 1 1 21 12Z" strokeWidth="2"/><path d="M8 12h8M8 8h6" strokeWidth="2" strokeLinecap="round"/></svg>);}
function SmileIcon(props){return(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="12" r="9" strokeWidth="2"/><path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth="2" strokeLinecap="round"/><path d="M9 10h.01M15 10h.01" strokeWidth="2" strokeLinecap="round"/></svg>);}
