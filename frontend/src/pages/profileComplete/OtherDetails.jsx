import React, { useState } from 'react'
import { saveOtherDetails } from '../../redux/slices/profileSlice';

const OtherDetails = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pwbd:false,
    kashmiriMigrant:false,
    pmss:false,
    defenceWard:false,
    hasDefenceCertificate:false,
    medicalCondition:false,
    abcId:"",
    universityEmployeeId:"",
  })

  const handleChange = (e) =>{
    const {name,type,checked,value} = e.target;
    setFormData((prev) =>({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Other Details Payload:", formData);

    try {
      setLoading(true);

      // 🔗 API CALL GOES HERE
      await saveOtherDetails(formData);

      toast.success("Other details saved successfully");
    } catch (error) {
      toast.error("Failed to save other details");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>OtherDetails</div>
  )
}

export default OtherDetails