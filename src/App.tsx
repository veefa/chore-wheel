import React from 'react';
import ChoreWheel from './components/ChoreWheel';


const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <h1 className="font-bold text-gray-800 text-3xl">Chore Wheel App</h1>
      <ChoreWheel/>
    </div>
  );
};

export default App;