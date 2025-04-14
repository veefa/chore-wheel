import React from "react";

interface WheelProps {
  tasks: string[];
  rotation: number;
  onSpin: () => void;
  spinning: boolean;
}

const WheelComponent: React.FC<WheelProps> = ({ tasks, rotation, onSpin, spinning }) => {
  const svgSize = 600;
  const radius = svgSize / 2 - 10; // Adjust padding
  const center = svgSize / 2;
  const textRadius = radius - 50;
  const anglePerSlice = 360 / tasks.length;
  const fontSize = tasks.length > 14 ? 12 : 16;

  return (
    <div className="relative flex justify-center items-center mx-auto w-full max-w-[500px] h-full max-h-[500px]">
      {/* Pointer */}
      <div className="top-1/2 right-0 z-10 absolute -translate-y-1/2 translate-x-[50%]">
        <svg xmlns="http://www.w3.org/2000/svg" width="78" height="47" viewBox="0 0 78 47" fill="none">
          <path d="M76.15 0.078L0.308 24.542L77.02 46.839L58.419 23.461L76.15 0.078Z" fill="white" />
          <path
            d="M75.65 45.92L2.014 24.518L74.792 1.041L58.021 23.159L57.786 23.468L58.028 23.772L75.65 45.92Z"
            stroke="#C3CFE4"
            strokeOpacity="0.8"
          />
        </svg>
      </div>

      {/* SVG Wheel */}
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ transform: `rotate(${rotation}deg)`, transition: "transform 4s ease-out" }}
        className="cursor-pointer"
        onClick={!spinning ? onSpin : undefined}
        role="button"
        aria-label="Spin the wheel"
      >
        <circle cx={center} cy={center} r={radius} fill="#040C1B" />

        {/* Wheel Slices */}
        {tasks.map((_, i) => {
          const angle = (i * anglePerSlice * Math.PI) / 180;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={`line-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#273C62"
              strokeWidth="3"
            />
          );
        })}

        {/* Task Labels */}
        {tasks.map((task, i) => {
          const angle = (i * anglePerSlice - anglePerSlice / 2) * (Math.PI / 180);
          const x = center + textRadius * Math.cos(angle);
          const y = center + textRadius * Math.sin(angle);

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize={fontSize}
              transform={`rotate(${i * anglePerSlice - 90}, ${x}, ${y})`}
            >
              {task}
            </text>
          );
        })}

        {/* Center Circle */}
        <circle cx={center} cy={center} r="15" fill="#273C62" />
      </svg>
    </div>
  );
};

export default WheelComponent;