// app/dashboard/layout.jsx
export const metadata = {
  title: 'Dashboard — ProAcedmicHelp',
};

export default function DashboardLayout({ children }) {
  return (
    <section className="relative min-h-screen">
      {/* Pastel greenish-blue / teal background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50" />
      {/* Keep your dashboard content as-is */}
      <div className="container-max py-8">
        {children}
      </div>
    </section>
  );
}
