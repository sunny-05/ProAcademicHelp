export default function StarRating({ value = 5, size = 'text-base' }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <div className={`inline-flex ${size}`} aria-label={`${v} out of 5 stars`}>
      {[0,1,2,3,4].map(i => (
        <span key={i} className={i < v ? 'text-yellow-500' : 'text-gray-300'}>★</span>
      ))}
    </div>
  );
}
