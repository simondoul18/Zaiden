<template>
  <!--
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      url="http://foo.bar/particles.json"
    /> -->

  <!-- or -->

  <particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="options"
  />
  <!-- </div> -->
</template>
<script>
import { loadFull } from "tsparticles";
// import Particles from "./particles.vue";
// import Particles from "particles.vue";

export default {
  components: {
    // Particles/,
    // par: Particles,
  },
  data() {
    return {
      options: {
        background: {
          color: {
            value: "#E8EEFA",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.4,
              size: 50,
            },
            push: {
              quantity: 10,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#7554e1",
          },
          links: {
            color: "#000",
            distance: 160,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            speed: 5,
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
          number: {
            density: {
              enable: true,
              area: 1800,
            },
            value: 180,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      },
    };
  },
  methods: {
    async particlesInit(engine) {
      await loadFull(engine);
    },

    async particlesLoaded(container) {
      console.log("Particles container loaded", container);
    },
  },
};
</script>
