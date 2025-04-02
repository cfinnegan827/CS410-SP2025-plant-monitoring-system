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
            value: 0.5,
            random: true, // Make opacity different for each particle
            animation: {
              enable: true,
              speed: .2, // Adjust speed for twinkle effect
              minimumValue: 0.1, // Minimum opacity
              sync: false, 
            },
        },
          size: { 
            maximumValue: 3,
            random: true
           },
          move: { enable: true, speed: .1 },
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
