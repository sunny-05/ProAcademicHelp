// components/ReviewsClient.jsx
'use client';
import { useState } from 'react';
import ReviewForm from '@/components/ReviewForm';
import ReviewCard from '@/components/ReviewCard';

export default function ReviewsClient({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);

  function handleAdd(item) {
    setItems((list) => [item, ...list]);
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems((list) => list.filter((r) => r.id !== id));
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  }

  return (
    <div className="space-y-8">
      <ReviewForm onAdd={handleAdd} />

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ReviewCard key={item.id} item={item} onDelete={handleDelete} />
        ))}

        {!items.length && (
          <li className="rounded-2xl bg-teal-600 text-white border border-white/20 shadow-xl p-6">
            No reviews yet — be the first to share your feedback!
          </li>
        )}
      </ul>
    </div>
  );
}
