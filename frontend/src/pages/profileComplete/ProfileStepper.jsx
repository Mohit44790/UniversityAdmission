import React from "react";

const ProfileStepper = ({ steps = [] }) => {
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = steps.length
    ? Math.round((completedCount / steps.length) * 100)
    : 0;

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step circles */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${
                  step.completed
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStepper;
