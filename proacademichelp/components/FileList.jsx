'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatIn } from '@/lib/dates';

export default function FileList({ files = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function archiveFile(name) {
    if (!confirm('Archive this file? It will be moved out of active uploads.')) return;
    const res = await fetch(`/api/upload?name=${encodeURIComponent(name)}`, { method: 'PATCH' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || 'Failed to archive');
      return;
    }
    startTransition(() => router.refresh());
  }

  async function deleteFile(name) {
    if (!confirm('Permanently delete this file? This cannot be undone.')) return;
    const res = await fetch(`/api/upload?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || 'Failed to delete');
      return;
    }
    startTransition(() => router.refresh());
  }

  if (!files.length) return <p className="text-gray-500">No files uploaded yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200/60 dark:border-gray-800/60">
            <th className="py-2 pr-4">File</th>
            <th className="py-2 pr-4">Size (KB)</th>
            <th className="py-2 pr-4">Last Modified</th>
            <th className="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f, i) => (
            <tr key={f.name || i} className="border-b border-gray-100 dark:border-gray-800/60">
              <td className="py-2 pr-4">{f.name}</td>
              <td className="py-2 pr-4">{(f.size / 1024).toFixed(1)}</td>
              <td className="py-2 pr-4">
                <time suppressHydrationWarning dateTime={new Date(f.mtime).toISOString()}>
                  {formatIn(f.mtime)}
                </time>
              </td>
              <td className="py-2 pr-4 flex items-center gap-2">
                <button
                  onClick={() => archiveFile(f.name)}
                  disabled={isPending}
                  className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 disabled:opacity-60"
                  title="Archive (move to uploads_archive)"
                >
                  {isPending ? 'Working…' : 'Archive'}
                </button>
                <button
                  onClick={() => deleteFile(f.name)}
                  disabled={isPending}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 disabled:opacity-60"
                  title="Delete permanently"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
