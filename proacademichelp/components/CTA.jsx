import Link from 'next/link';


export default function CTA(){
return (
<div className="card text-center bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
<h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to get it done?</h2>
<p className="text-gray-600 dark:text-gray-300 mb-6">Tell us what you need and when. We’ll send a quick quote.
</p>
<Link className="btn-primary" href="/request">Request a Quote</Link>
</div>
);
}