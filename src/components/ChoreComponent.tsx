import React from "react";

interface ChoreComponentProps {
  selectedChore: string | null;
  tasks: string[];
}

const ChoreComponent: React.FC<ChoreComponentProps> = ({ selectedChore, tasks }) => {
  return (
    <div className="mt-6 text-center">
      {selectedChore ? (
        <div
          className="mb-4 font-bold text-green-700 text-xl"
          aria-live="polite"
        >
          🎯 Selected Chore: {selectedChore}
        </div>
      ) : (
        <div className="mb-4 text-gray-500 text-sm">
          Spin the wheel to select a chore!
        </div>
      )}
      <div className="text-gray-700 text-sm">
        <strong>Chore List:</strong> {tasks.join(", ")}
      </div>
    </div>
  );
};

export default ChoreComponent;