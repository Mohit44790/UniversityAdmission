import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveBankDetails } from "../../redux/slices/profileSlice";

const BankDetails = () => {
  const dispatch = useDispatch();
  const { loading, bankDetails } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
  });

  // 🔁 PREFILL FORM
  useEffect(() => {
    if (bankDetails) {
      setFormData({
        accountHolderName: bankDetails.accountHolderName || "",
        bankName: bankDetails.bankName || "",
        accountNumber: bankDetails.accountNumber || "",
        ifscCode: bankDetails.ifscCode || "",
        branchName: bankDetails.branchName || "",
      });
    }
  }, [bankDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      accountNumber: String(formData.accountNumber),
    };

    const res = await dispatch(saveBankDetails(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Bank details saved successfully");
    } else {
      toast.error(res.payload || "Failed to save bank details");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#4C489D]">
        Bank Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 grid grid-cols-2 gap-4 rounded-xl shadow"
      >
        <input
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          className="input"
          placeholder="Account Holder Name"
          required
        />

        <input
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          className="input"
          placeholder="Bank Name"
          required
        />

        <input
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          className="input"
          placeholder="Account Number"
          required
        />

        <input
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          className="input uppercase"
          placeholder="IFSC Code"
          required
        />

        <input
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          className="input"
          placeholder="Branch Name"
          required
        />

        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-64 bg-[#4C489D] text-white py-3 rounded-full font-semibold transition
              ${loading ? "opacity-60" : "hover:scale-105"}`}
          >
            {loading ? "Saving..." : "Save Bank Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;
