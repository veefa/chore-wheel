import React, { useState } from "react";
import ChoreComponent from "./components/ChoreComponent";
import WheelComponent from "./components/WheelComponent";

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    const extraSpins = 360 * (Math.floor(Math.random() * 4) + 5); // 5–8 full spins
    const randomOffset = Math.floor(Math.random() * 360); // Random stop position
    const newRotation = rotation + extraSpins + randomOffset;

    setRotation(newRotation);

    setTimeout(() => setSpinning(false), 4000);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 p-6 min-h-screen">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Chore Wheel App</h1>

      <WheelComponent tasks={tasks} rotation={rotation} onSpin={handleSpin} />
      <ChoreComponent selectedChore={selectedChore} tasks={tasks} />
    </div>
  );
};

export default App;
