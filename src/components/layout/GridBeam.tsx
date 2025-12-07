"use client";

export const GridBeam = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Animated Beams */}
      <div className="absolute inset-0">
        {/* Horizontal Beams */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className="absolute h-px w-full opacity-20 animate-beam-horizontal"
            style={{
              top: `${20 + i * 20}%`,
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 20%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 80%,
                transparent 100%
              )`,
              animationDuration: `${8 + i * 2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Vertical Beams */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`vertical-${i}`}
            className="absolute w-px h-full opacity-20 animate-beam-vertical"
            style={{
              left: `${25 + i * 25}%`,
              background: `linear-gradient(
                180deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 20%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 80%,
                transparent 100%
              )`,
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        {/* Diagonal Beams */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`diagonal-${i}`}
            className="absolute w-[200%] h-px opacity-10 animate-beam-diagonal"
            style={{
              top: `${30 + i * 20}%`,
              left: "-50%",
              transform: `rotate(${-45 + i * 15}deg)`,
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(229, 22, 22, 0.2) 40%,
                rgba(229, 22, 22, 0.4) 50%,
                rgba(229, 22, 22, 0.2) 60%,
                transparent 100%
              )`,
              animationDuration: `${12 + i * 3}s`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top left, rgba(229, 22, 22, 0.3), transparent 70%)`,
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.1), transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
};

