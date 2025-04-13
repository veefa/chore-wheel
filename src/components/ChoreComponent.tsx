import React from "react";

interface ChoreComponentProps {
  selectedChore: string | null;
  tasks: string[];
}

const ChoreComponent: React.FC<ChoreComponentProps> = ({ selectedChore, tasks }) => {
  return (
    <div className="mt-6 text-center">
      {selectedChore && (
        <div className="mb-4 font-bold text-green-700 text-xl">
          🎯 Selected Chore: {selectedChore}
        </div>
      )}
      <div className="text-gray-700 text-sm">Chore List: {tasks.join(", ")}</div>
    </div>
  );
};

export default ChoreComponent;