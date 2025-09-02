// app/upload/page.jsx
import UploadForm from "@/components/UploadForm";

export const metadata = {
  title: "Upload — ProAcademicHelp",
  description: "Upload supporting files for your request.",
};

export default function UploadPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Upload files</h1>
      <p className="mt-3 text-slate-700">
        Add references, rubrics, images, or datasets. We’ll attach them to your request.
      </p>

      <div className="mt-8">
        <UploadForm />
      </div>
    </section>
  );
}
