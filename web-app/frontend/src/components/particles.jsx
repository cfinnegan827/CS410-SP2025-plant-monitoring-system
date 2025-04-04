import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Loads the lightweight version

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // Load the particles engine
  }, []);

  return (
    // id="tsparticles", for css go to src/styles/Home.css. For altering partiles look at docs
    // for options.
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000",
        },
        particles: {
          number: { value: 80 },
          shape: { type: "circle" },
          opacity: {
            value: .9,
            random: true,
            animation: {
              enable: true,
              speed: 1, 
              minimumValue: 0.5, 
              sync: false, 
            },
        },
          size: { 
            maximumValue: 3,
            random: true
           },
          move: { enable: true, speed: .05 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "attract" } },
          modes: { repulse: { distance: 100 } },
        },
      }}
    />
  );
};

export default ParticleBackground;
