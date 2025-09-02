// components/ReviewList.jsx
'use client';

export default function ReviewList({ items = [], onRemoved }) {
  const removeOne = async (id) => {
    const res = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const json = await res.json();
    if (res.ok) onRemoved?.(id);
    else alert(json?.error || 'Failed to delete');
  };

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((r) => (
        <li key={r.id} className="rounded-2xl bg-white border p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">{r.name || 'Anonymous'}</p>
            <span className="text-xs rounded-full px-2.5 py-1 bg-teal-50 text-teal-700 border">
              {r.rating}/5
            </span>
          </div>
          {r.comment && <p className="mt-2 text-sm text-gray-700">{r.comment}</p>}
          <p className="mt-2 text-xs text-gray-500">
            <time suppressHydrationWarning dateTime={r.createdAt}>
              {new Date(r.createdAt).toLocaleString()}
            </time>
          </p>
          <button onClick={() => removeOne(r.id)} className="btn-ghost mt-3">Delete</button>
        </li>
      ))}
    </ul>
  );
}
