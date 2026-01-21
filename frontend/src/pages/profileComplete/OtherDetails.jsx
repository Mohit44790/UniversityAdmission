import React, { useState } from 'react'

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
  return (
    <div>OtherDetails</div>
  )
}

export default OtherDetails