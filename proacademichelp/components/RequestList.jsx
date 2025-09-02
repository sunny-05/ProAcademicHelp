// components/RequestList.jsx
'use client';
import { useState } from 'react';

export default function RequestList({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);

  async function onDelete(id) {
    try {
      const res = await fetch(`/api/requests?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems((list) => list.filter((r) => r.id !== id));
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  }

  return (
    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((r) => {
        const dt = r.createdAt ? new Date(r.createdAt) : null;
        return (
          <li key={r.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold truncate">{r.name || 'Anonymous'}</p>
                {r.email && <p className="text-sm text-gray-600 truncate">{r.email}</p>}
                {r.phone && <p className="text-sm text-gray-600 truncate">{r.phone}</p>}
                {dt && (
                  <p className="text-xs text-gray-500 mt-1">
                    <time suppressHydrationWarning dateTime={r.createdAt}>
                      {dt.toLocaleString()}
                    </time>
                  </p>
                )}
              </div>
              <button
                onClick={() => onDelete(r.id)}
                className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-50"
              >
                Delete
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {r.service && <p><span className="text-gray-500">Service:</span> {r.service}</p>}
              {r.deadline && <p><span className="text-gray-500">Deadline:</span> {r.deadline}</p>}
            </div>

            {r.details && <p className="mt-3 text-gray-700">{r.details}</p>}
          </li>
        );
      })}

      {!items.length && (
        <li className="card text-gray-600">
          No requests yet. Submit the “Get Quote” form on Home to see items here.
        </li>
      )}
    </ul>
  );
}
