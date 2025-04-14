import React, { useState } from "react";
import WheelComponent from "./components/WheelComponent";
import ChoreComponent from "./components/ChoreComponent";

// List of chores to display on the wheel
const tasks = ["Dishes", "Laundry", "Trash", "Vacuum", "Cooking", "Shopping", "Cleaning"];

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0); // Total rotation in degrees
  const [spinning, setSpinning] = useState(false); // Whether the wheel is spinning
  const [selectedChore, setSelectedChore] = useState<string | null>(null); // Final result

  const handleSpin = () => {
    if (spinning) return; // Prevent double clicks during spin

    setSpinning(true);
    setSelectedChore(null); // Clear previous result while spinning

    const sliceAngle = 360 / tasks.length; // Angle per task slice
    const randomIndex = Math.floor(Math.random() * tasks.length); // Random task index
    const randomOffset = Math.random() * sliceAngle; // Slight offset for natural feel

    // Calculate spin: 5 full rotations + target slice + a small offset
    const targetRotation = 360 * 5 + randomIndex * sliceAngle + randomOffset;

    setRotation(prev => prev + targetRotation); // Rotate from current position

    // Wait for the animation to finish before showing the selected chore
    setTimeout(() => {
      const finalRotation = (rotation + targetRotation) % 360; // Normalize rotation to 0–359
      const adjustedRotation = (360 - finalRotation + sliceAngle / 2) % 360; // Adjust for pointer at 0 degrees
      const selectedIndex = Math.floor(adjustedRotation / sliceAngle); // Calculate task index
      setSelectedChore(tasks[selectedIndex]);
      setSpinning(false);
      setRotation(prev => prev % 360); // Reset rotation to avoid overflow
    }, 4000); // Match with the wheel's CSS transition duration
  };

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 p-4 min-h-screen">
      <h1 className="mb-8 font-bold text-gray-800 text-3xl text-center">
        Chore Wheel App
      </h1>

      {/* Wheel Container */}
      <div className="relative flex justify-center items-center mb-6 w-[300px] h-[300px]">
        <WheelComponent
          tasks={tasks}
          rotation={rotation}
          onSpin={handleSpin}
          spinning={spinning}
        />
      </div>

      {/* Selected Chore */}
      {selectedChore && (
        <ChoreComponent selectedChore={selectedChore} tasks={tasks} />
      )}

      {/* Loading text while spinning */}
      {spinning && (
        <p className="mt-4 text-gray-600">Spinning... Please wait!</p>
      )}
    </div>
  );
};

export default App;