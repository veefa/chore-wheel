import React, { useState } from "react";

const ChoreWheel: React.FC = () => {
    const tasks = ['Dishes', 'Laundry', 'Trash', 'Vacuum', 'Cooking', 'Shopping'];
    const [spinning, setSpinning] = useState(false);

    //  Trigger the spinning animation
   const handleSpin = () => {
        setSpinning(true);    //Start the spin
        // Stop the spin after 2 seconds
        setTimeout(() => setSpinning(false), 2000);
    }

    return (
        <div className="flex flex-col items-center">
      {/* The wheel container */}
      <div
        className={`
          relative w-64 h-64 rounded-full border-4 border-blue-500 
          flex items-center justify-center 
          transition-transform duration-[2000ms] ease-out
          ${spinning ? 'rotate-[1080deg]' : ''}
        `}
      >
        {/* Inner circle in the center of the wheel */}
        <div className="z-10 absolute flex justify-center items-center bg-white shadow rounded-full w-16 h-16">
          🎯 {/* Center icon (can be changed to a pointer later) */}
        </div>

        {/* Loop through each task and position it around the wheel */}
        {tasks.map((task, index) => {
          // Calculate the angle at which this task should be placed
          const angle = (360 / tasks.length) * index;

          return (
            <div
              key={task}
              className="absolute origin-center transform"
              style={{
                // Rotate the element by the angle and move it outward
                transform: `rotate(${angle}deg) translateY(-100px)`,
              }}
            >
              {/* Task label styling */}
              <div className="bg-white shadow px-2 py-1 rounded text-gray-800 text-xs">
                {task}
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to trigger the spin */}
      <button
        onClick={handleSpin}
        className="bg-blue-600 hover:bg-blue-700 mt-6 px-4 py-2 rounded-xl text-white transition"
      >
        Spin the Wheel
      </button>
    </div>
  );
}

export default ChoreWheel;