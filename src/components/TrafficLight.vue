<template>
  <section class="traffic-light">
    <div class="traffic-light__wrap">
      <div :class="['traffic-light__item',
          redLight ? 'traffic-light__item_red_on' : 'traffic-light__item_red_off',
          redLight && pulse ? 'traffic-light__item_pulse_red' : '']">
        <p :class="['traffic-light__timer', redLight ? 'traffic-light__timer_active' : '']">{{ timer }}</p>
      </div>
      <div
          :class="['traffic-light__item',
         yellowLight ? 'traffic-light__item_yellow_on' : 'traffic-light__item_yellow_off',
         yellowLight && pulse ? 'traffic-light__item_pulse_yellow' : '']">
        <p :class="['traffic-light__timer', yellowLight ? 'traffic-light__timer_active' : '']">{{ timer }}</p>
      </div>
      <div
          :class="['traffic-light__item',
         greenLight ? 'traffic-light__item_green_on' : 'traffic-light__item_green_off',
         greenLight && pulse ? 'traffic-light__item_pulse_green' : '']">
        <p :class="['traffic-light__timer', greenLight ? 'traffic-light__timer_active' : '']"> {{ timer }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TrafficLight',
  props: {
    light: String
  },
  data() {
    return {
      timer: 0,
      pulse: false,
      routeTimerId: null,
      secondsTimerId: null,
    }
  },
  beforeRouteLeave(from, to, next) {
    this.timer = null;
    this.pulse = false;
    clearTimeout(this.routeTimerId);
    clearTimeout(this.secondsTimerId);
    next()
  },
  beforeMount() {
    if (localStorage.timer && this.light === localStorage.light) {
      this.timer = localStorage.timer;
    }
    if (localStorage.pulse && this.light === localStorage.light) {
      this.pulse = localStorage.pulse;
    }
    localStorage.light = this.light
    localStorage.pulse = this.pulse
  },
  methods: {
    routeReplace(route) {
      this.$router.replace(route).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.log(err);
        }
      });
    },
    changeColor(route, time = 0) {
      if (!time) {
        clearTimeout(this.routeTimerId)
        this.routeReplace(route)
      } else {
        this.routeTimerId = setTimeout(this.routeReplace, time, route)
      }
    },
    timerHandler() {
      if (this.timer > 1) {
        this.secondsTimerId = setTimeout(this.timerHandler, 1000);
      }
      this.timer--;
    },
    showTime(ms) {
      this.timer = ms / 1000
      this.secondsTimerId = setTimeout(this.timerHandler, 1000);
    },
    routesHandler() {
      if (this.light === 'red') {
        const timeToYellow = 10000;
        this.showTime(timeToYellow);
        this.changeColor('yellow', timeToYellow);
      }
      if (this.light === 'yellow') {
        const timeToGreen = 3000;
        this.showTime(timeToGreen);
        this.changeColor('green', timeToGreen);
      }
      if (this.light === 'green') {
        const timeToRed = 15000;
        this.showTime(timeToRed);
        this.changeColor('red', timeToRed);
      }
    }
  },
  computed: {
    redLight: vm => vm.light === 'red',
    yellowLight: vm => vm.light === 'yellow',
    greenLight: vm => vm.light === 'green'
  },
  created() {
    this.routesHandler();
  },
  watch: {
    $route() {
      this.routesHandler();
    },
    timer() {
      localStorage.timer = this.timer;
      if (this.timer === 0) {
        clearTimeout(this.routeTimerId)
        if (this.light === 'red') this.changeColor('yellow');
        if (this.light === 'yellow') this.changeColor('green');
        if (this.light === 'green') this.changeColor('red');
      }
      if (this.timer < 4) {
        this.pulse = true;
      }
      if (this.timer >= 4) {
        this.pulse = false;
      }
    },
    pulse() {
      localStorage.pulse = this.pulse;
    },
    light() {
      localStorage.light = this.light
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');

.traffic-light {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-position: center;
}

.traffic-light__wrap {
  display: flex;
  flex-direction: column;
  background: #1f202d;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  padding: 10px;
  height: 85%;
  box-shadow: 0px 0px 100px 10px rgba(255, 255, 255, 0.75);
}

.traffic-light__item {
  position: relative;
  width: 25vh;
  border-radius: 100%;
  box-sizing: border-box;
}

.traffic-light__item:after {
  content: '';
  display: block;
  padding-top: 100%;
}

.traffic-light__timer {
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: all .5s ease;
  font-size: 5em;
  font-family: 'Black Ops One', cursive;
}

.traffic-light__timer_active {
  display: flex;
}

.traffic-light__item_red_off {
  background: hsl(0, 100%, 15%);
}

.traffic-light__item_red_on {
  background: hsl(0, 100%, 50%);
  box-shadow: 0px 0px 10px 2px hsla(0, 100%, 50%, 0.75);
}

.traffic-light__item_yellow_off {
  background: hsl(50, 100%, 15%);
}

.traffic-light__item_yellow_on {
  background: hsl(50, 100%, 50%);
  box-shadow: 0px 0px 10px 2px hsla(50, 100%, 50%, 0.75);
}

.traffic-light__item_green_off {
  background: hsl(100, 100%, 15%);
}

.traffic-light__item_green_on {
  background: hsl(100, 100%, 50%);
  box-shadow: 0px 0px 10px 2px hsla(100, 100%, 50%, 0.75);
}


.traffic-light__item_pulse_red {
  animation: pulse-red 1s ease infinite;
}

.traffic-light__item_pulse_yellow {
  animation: pulse-yellow 1s ease infinite;
}

.traffic-light__item_pulse_green {
  animation: pulse-green 1s ease infinite;
}

@keyframes pulse-red {
  0% {
    background: hsl(0, 100%, 15%);
  }
  50% {
    background: hsl(0, 100%, 50%);
  }
  100% {
    background: hsl(0, 100%, 15%);
  }
}

@keyframes pulse-yellow {
  0% {
    background: hsl(50, 100%, 15%);
  }
  50% {
    background: hsl(50, 100%, 50%);
  }
  100% {
    background: hsl(50, 100%, 15%);
  }
}

@keyframes pulse-green {
  0% {
    background: hsl(100, 100%, 15%);
  }
  50% {
    background: hsl(100, 100%, 50%);
  }
  100% {
    background: hsl(100, 100%, 15%);
  }
}
</style>
