// components/ReviewsTeaser.jsx
'use client';

export default function ReviewsTeaser({ items = [] }) {
  if (!items.length) return <p className="text-gray-600">No reviews yet.</p>;
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.slice(0, 6).map((r) => (
        <li key={r.id} className="rounded-2xl bg-white border p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">{r.name || 'Anonymous'}</p>
            <span className="text-xs rounded-full px-2.5 py-1 bg-teal-50 text-teal-700 border">
              {r.rating}/5
            </span>
          </div>
          {r.comment && <p className="mt-2 text-sm text-gray-700 line-clamp-4">{r.comment}</p>}
          <p className="mt-2 text-xs text-gray-500">
            <time suppressHydrationWarning dateTime={r.createdAt}>
              {new Date(r.createdAt).toLocaleString()}
            </time>
          </p>
        </li>
      ))}
    </ul>
  );
}
