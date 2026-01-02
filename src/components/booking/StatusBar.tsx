import React from 'react';

const StatusBar = ({ step }) => {
  const steps = ['Service', 'Booking', 'Success'];

  return (
    <div className="flex items-center justify-center mb-4">
      {steps.map((name, index) => {
        const stepNumber = index + 1;
        const isCompleted = step > stepNumber;
        const isActive = step === stepNumber;

        return (
          <React.Fragment key={name}>
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                {isCompleted ? <span>&#10003;</span> : stepNumber}
              </div>
              <div className={`ml-2 text-sm ${isActive ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{name}</div>
            </div>
            {stepNumber < steps.length && (
              <div className={`flex-auto border-t-2 mx-2 ${isCompleted ? 'border-green-500' : 'border-border'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StatusBar;
