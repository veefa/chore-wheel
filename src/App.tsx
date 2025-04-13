import React, { useState } from "react";
import WheelComponent from "./components/WheelComponent";
import ChoreComponent from "./components/ChoreComponent";

const tasks = ["Dishes", "Laundry", "Trash", "Vacuum", "Cooking", "Shopping", "Cleaning"];

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedChore, setSelectedChore] = useState<string | null>(null);

  const calculateSelectedTask = (finalRotation: number) => {
    const angle = (finalRotation % 360 + 360) % 360; // Normalize angle to 0–359
    const index = Math.floor((tasks.length - angle / (360 / tasks.length)) % tasks.length);
    return tasks[Math.abs(index)];
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
    <div className="flex flex-col justify-center items-center bg-blue-100 p-6 min-h-screen">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Chore Wheel App</h1>

      <WheelComponent tasks={tasks} rotation={rotation} onSpin={handleSpin} spinning={spinning} />
      
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