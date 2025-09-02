// inside UploadBox.jsx
async function handleUpload() {
  if (files.length === 0) { alert("Please choose at least one file."); return; }
  setSubmitting(true);
  try {
    const fd = new FormData();
    files.forEach(f => fd.append("files", f));
    fd.append("note", note);
    fd.append("quoteId", quoteId);

    const res = await fetch("/api/uploads", { method: "POST", body: fd }); // ← plural
    if (!res.ok) throw new Error("Upload failed");
    await res.json();

    setDone(true);
    setFiles([]); setNote("");
  } catch {
    alert("Sorry, something went wrong while uploading.");
  } finally {
    setSubmitting(false);
  }
}
