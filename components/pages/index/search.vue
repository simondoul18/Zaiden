<template>
  <!-- <div class="container"> -->
  <form autocomplete="off" @submit.prevent="handleSearchSubmit">
    <div
      class="finder"
      :class="{ active: isFinderActive && !loading, processing: loading }"
    >
      <div class="finder__outer">
        <div class="finder__inner">
          <div class="finder__icon" ref="icon"></div>
          <input
            class="finder__input"
            @focus="isFinderActive = true"
            @blur="handleBlur"
            type="text"
            name="q"
            :disabled="loading"
            v-model="search"
          />
        </div>
      </div>
    </div>
  </form>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      isFinderActive: false,
      search: null,
      loading: false,
    };
  },

  methods: {
    handleBlur() {
      if (this.search?.length === 0) {
        this.isFinderActive = false;
      }
    },
    handleSearchSubmit() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;

        if (this.search?.length > 0) {
          this.isFinderActive = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
// .container {
//   text-align: center;
//   color: #2c3e50;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// }

form {
  transition: all 0.5s;
  // position: absolute;
  // top: 50%;
  // transform: translateY(-50%);
}
.finder {
  border: 1px solid #fff;
  background-color: #f6f5f0;
  border-radius: 15px;
  padding: 8px;
  box-shadow: 9px 9px 16px rgb(106 144 230 / 60%),
    -9px -9px 16px rgb(205 168 240 / 50%);
}

.finder__outer {
  display: flex;
  width: 100%;
  padding: .7rem .7rem;
  border-radius: 10px;
  box-shadow: inset 10px 10px 15px -10px #c3c3c3,
    inset -10px -10px 15px -10px #ffffff;
}

.finder__inner {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
}

.finder__form {
  flex: 1;
  height: calc(100%);
}

.finder__input {
  height: calc(100% +);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1.5rem;
  letter-spacing: 0.75px;
  width: 95%;
}

.finder__icon {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  transition: all 0.2s;
  box-shadow: inset 0 0 0 20px #4e88d9;
  border-radius: 50%;
  position: relative;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &:after {
    width: 10px;
    height: 10px;
    background-color: #4e88d9;
    border: 3px solid #f6f5f0;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    left: 0px;
    right: 0;
    margin: auto;
    border-radius: 50%;

    @at-root .active & {
      border-width: 10px;
      background-color: #f6f5f0;
    }
  }

  &:before {
    width: 4px;
    height: 13px;
    background-color: #f6f5f0;
    top: 50%;
    left: 20px;
    transform: rotateZ(45deg) translate(-50%, 0);
    transform-origin: 0 0;
    border-radius: 4px;

    @at-root .active & {
      background-color: #292929;
      width: 6px;
      transform: rotateZ(45deg) translate(-50%, 25px);
    }
  }

  @at-root .processing & {
    transform-origin: 50%;
    animation: spinner 0.3s linear infinite;
    animation-delay: 0.5s;
  }

  @at-root .active & {
    transform: translateY(-5px);
  }
}

@keyframes spinner {
  0% {
    transform: rotateZ(45deg);
  }
  100% {
    transform: rotateZ(405deg);
  }
}
</style>
