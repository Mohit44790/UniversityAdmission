import React, { useState } from "react";
import api from "../../redux/config/api";
import { useNavigate } from "react-router-dom";

const UploadDocumentsPage = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    photo: null,
    signature: null,
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
    setFiles({ ...files, [field]: file });
  };

  // ======================
  // UPLOAD
  // ======================
  const handleUpload = async () => {
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      setLoading(true);
      await api.post("/api/student/upload-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Documents uploaded successfully");
      navigate("/student/rank");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>

      <div className="grid grid-cols-2 gap-6">

        {/* PHOTO */}
        <div>
          <label className="block font-medium mb-1">
            Passport Photo *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange("photo", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* SIGNATURE */}
        <div>
          <label className="block font-medium mb-1">
            Signature *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange("signature", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* 10TH */}
        <div>
          <label className="block font-medium mb-1">
            10th Marksheet *
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange("marksheet10", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* 12TH */}
        <div>
          <label className="block font-medium mb-1">
            12th Marksheet
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange("marksheet12", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block font-medium mb-1">
            Category Certificate
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange("categoryCert", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* ITI */}
        <div>
          <label className="block font-medium mb-1">
            ITI Certificate
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange("itiCert", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* UG */}
        <div>
          <label className="block font-medium mb-1">
            UG Marksheet
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange("ugCert", e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>
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
