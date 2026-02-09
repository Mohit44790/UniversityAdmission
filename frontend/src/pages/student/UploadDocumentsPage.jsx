import React, { useState } from "react";
import api from "../../redux/config/api";
import { useNavigate } from "react-router-dom";

const UploadDocumentsPage = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    photo: null,
    signature: null,
    abcFile: null,
    marksheet10: null,
    marksheet12: null,
    categoryCert: null,
    itiCert: null,
    ugCert: null,
  });

  const [loading, setLoading] = useState(false);

  // ======================
  // HANDLE FILE CHANGE
  // ======================
  const handleFileChange = (field, file) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  // ======================
  // VALIDATION
  // ======================
  const validate = () => {
    if (!files.photo) return alert("Photo required");
    if (!files.signature) return alert("Signature required");
    if (!files.abcFile) return alert("ABC ID document required");
    if (!files.marksheet10) return alert("10th marksheet required");
    return true;
  };

  // ======================
  // UPLOAD
  // ======================
  const handleUpload = async () => {
    if (!validate()) return;

    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      if (files[key]) formData.append(key, files[key]);
    });

    try {
      setLoading(true);

      await api.post("/api/student/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Documents uploaded successfully");
      navigate("/student/review-submit");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err?.response?.data || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>

      <div className="grid grid-cols-2 gap-6">

        <UploadField label="Passport Photo *" field="photo" accept="image/*" onChange={handleFileChange} file={files.photo} />

        <UploadField label="Signature *" field="signature" accept="image/*" onChange={handleFileChange} file={files.signature} />

        <UploadField label="ABC ID Document *" field="abcFile" accept=".pdf,image/*" onChange={handleFileChange} file={files.abcFile} />

        <UploadField label="10th Marksheet *" field="marksheet10" accept=".pdf,image/*" onChange={handleFileChange} file={files.marksheet10} />

        <UploadField label="12th Marksheet" field="marksheet12" accept=".pdf,image/*" onChange={handleFileChange} file={files.marksheet12} />

        <UploadField label="Category Certificate" field="categoryCert" accept=".pdf,image/*" onChange={handleFileChange} file={files.categoryCert} />

        <UploadField label="ITI Certificate" field="itiCert" accept=".pdf,image/*" onChange={handleFileChange} file={files.itiCert} />

        <UploadField label="UG Marksheet" field="ugCert" accept=".pdf,image/*" onChange={handleFileChange} file={files.ugCert} />

      </div>

      {/* BUTTON */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload & Continue →"}
        </button>
      </div>
    </div>
  );
};

export default UploadDocumentsPage;


// ================= COMPONENT =================

const UploadField = ({ label, field, accept, onChange, file }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>

    <input
      type="file"
      accept={accept}
      onChange={(e) => onChange(field, e.target.files[0])}
      className="border p-2 rounded w-full"
    />

    {file && (
      <p className="text-xs text-green-600 mt-1">
        Selected: {file.name}
      </p>
    )}
  </div>
);
