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
  return (
    <div>OtherDetails</div>
  )
}

export default OtherDetails