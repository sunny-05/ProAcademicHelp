// components/ReviewCard.jsx
'use client';

export default function ReviewCard({ item, onDelete }) {
  const dt = item.createdAt ? new Date(item.createdAt) : null;
  const fallback = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    item.name || 'User'
  )}`;

  return (
    <li className="rounded-2xl bg-teal-600 text-white border border-white/20 shadow-xl p-6">
      <div className="flex items-start gap-3">
        {/* Avatar (Gravatar if available, otherwise initials) */}
        <img
          src={item.avatar || fallback}
          alt={item.name || 'User'}
          referrerPolicy="no-referrer"
          className="h-10 w-10 rounded-full ring-2 ring-white/40 object-cover flex-shrink-0"
          onError={(e) => {
            // swap to fallback once if gravatar 404/no image
            if (e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold truncate">{item.name || 'Anonymous'}</p>
            <span className="text-xs rounded-full px-2.5 py-1 bg-white text-teal-700 shadow border border-white/0">
              {item.rating}/5
            </span>
          </div>

          {dt && (
            <p className="text-xs text-white/80 mt-0.5">
              <time suppressHydrationWarning dateTime={item.createdAt}>
                {dt.toLocaleString()}
              </time>
            </p>
          )}

          {item.comment && <p className="mt-2 text-white/90">{item.comment}</p>}

          {onDelete && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => onDelete(item.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20 border border-white/20"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
