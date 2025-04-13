import React from "react";
import wheelSvg from "../assets/wheelSvg.svg";
import Vector from "../assets/Vector.svg";

interface WheelComponentProps {
  rotation?: number; // Degrees
  onClick?: () => void;
}

const WheelComponent: React.FC<WheelComponentProps> = ({ rotation = 0, onClick }) => {
  return (
    <div className="relative mx-auto w-[300px] h-[300px]">
      {/* Fixed pointer outside the wheel */}
      <div className="top-1/2 right-[-60px] z-10 absolute -translate-y-1/2">
        <img src={Vector} alt="Pointer Icon" />
      </div>
      {/* Wheel SVG */}
      <img
        src={wheelSvg}
        alt="Chore Wheel"
        onClick={() => {
          onClick?.();
        }}
        onTransitionEnd={() => console.log("Rotation animation ended")}
        className="w-full h-full transition-transform duration-[4000ms] ease-out cursor-pointer"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default WheelComponent;
