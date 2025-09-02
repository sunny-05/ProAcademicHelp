// app/upload/layout.jsx
export const metadata = {
  title: 'Upload Files — ProAcedmicHelp',
};

export default function UploadLayout({ children }) {
  return (
    <section className="relative min-h-screen">
      {/* Pastel greenish-blue / teal background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50" />
      <div className="container-max py-10">
        {children}
      </div>
    </section>
  );
}
