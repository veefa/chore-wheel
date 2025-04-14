import React, { useState } from "react";
import WheelComponent from "./components/WheelComponent";
import ChoreComponent from "./components/ChoreComponent";

const tasks = ["Dishes", "Laundry", "Trash", "Vacuum", "Cooking", "Shopping", "Cleaning"];

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedChore, setSelectedChore] = useState<string | null>(null);

  const calculateSelectedTask = (finalRotation: number) => {
    const normalized = (finalRotation % 360 + 360) % 360;
    const sliceAngle = 360 / tasks.length;
    const adjustedAngle = (normalized + sliceAngle / 2) % 360;
    const index = Math.floor(adjustedAngle / sliceAngle);
    return tasks[index];
  };

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    const randomDegree = Math.floor(Math.random() * 360);
    const extraSpins = 360 * (Math.floor(Math.random() * 4) + 5); // 4–8 full spins
    const finalRotation = rotation + extraSpins + randomDegree;

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setSelectedChore(calculateSelectedTask(finalRotation));
      setRotation(finalRotation % 360); // Reset rotation to avoid overflow
    }, 4000);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 p-4 min-h-screen">
    <h1 className="mb-8 font-bold text-gray-800 text-3xl text-center">
      Chore Wheel App
    </h1>

    {/* Use grid to align pointer + wheel */}
    <div className="relative flex justify-center items-center mb-6 w-[300px] h-[300px]">
      <WheelComponent
        tasks={tasks}
        rotation={rotation}
        onSpin={handleSpin}
        spinning={spinning}
      />
    </div>

    {/* Display result below the wheel */}
    {selectedChore && (
      <ChoreComponent selectedChore={selectedChore} tasks={tasks} />
    )}

    {spinning && (
      <p className="mt-4 text-gray-600">Spinning... Please wait!</p>
    )}
  </div>
  );
};

export default App;