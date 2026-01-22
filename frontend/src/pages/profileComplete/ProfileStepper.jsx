import React from "react";

const STEPS = [
  "Profile",
  "Bank",
  "Family",
  "Others",
  "Documents",
];

const ProfileStepper = ({ steps }) => {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all"
          style={{
            width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Step icons */}
      <div className="flex justify-between">
        {STEPS.map((label, index) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${
                  steps[index]?.completed
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStepper;
