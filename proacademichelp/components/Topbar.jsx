import { COMPANY, telHref, mailHref } from '@/lib/site';

export default function Topbar() {
  return (
    <div className="w-full bg-white/90 dark:bg-gray-950/80 border-b border-gray-200/70 dark:border-gray-800/60 text-xs">
      <div className="container-max py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">{COMPANY.name}</span> — We reply fast ✅
        </div>
        <div className="flex items-center gap-4">
          <a href={telHref} className="hover:text-brand-700 text-gray-700 dark:text-gray-200">📞 {COMPANY.phone}</a>
          <a href={mailHref} className="hover:text-brand-700 text-gray-700 dark:text-gray-200">✉️ {COMPANY.email}</a>
        </div>
      </div>
    </div>
  );
}
