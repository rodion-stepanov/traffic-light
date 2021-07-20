<template>
  <div class="traffic-light">
    <div :class="['traffic-light__item',
          redLight ? 'traffic-light__item_red_on' : 'traffic-light__item_red_off',
          redLight && pulse ? 'traffic-light__item_pulse_red' : '']">
      <p :class="['traffic-light__timer', redLight ? 'traffic-light__timer_active' : '']">{{ timer + 1 }}</p>
    </div>
    <div
        :class="['traffic-light__item',
         yellowLight ? 'traffic-light__item_yellow_on' : 'traffic-light__item_yellow_off',
         yellowLight && pulse ? 'traffic-light__item_pulse_yellow' : '']">
      <p :class="['traffic-light__timer', yellowLight ? 'traffic-light__timer_active' : '']">{{ timer + 1 }}</p>
    </div>
    <div
        :class="['traffic-light__item',
         greenLight ? 'traffic-light__item_green_on' : 'traffic-light__item_green_off',
         greenLight && pulse ? 'traffic-light__item_pulse_green' : '']">
      <p :class="['traffic-light__timer', greenLight ? 'traffic-light__timer_active' : '']"> {{ timer + 1 }}</p>
    </div>

  </div>
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
      pulse: false
    }
  },
  beforeRouteLeave(from, to, next) {
    this.timer = 0;
    this.pulse = false;
    next()
    },
  methods: {
    routeReplace(route) {
      this.$router.replace(route).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.log(err);
        }
      });
    },
    changeColor(route, time) {
      setTimeout(this.routeReplace, time, route)
    },
    timerHandler() {
      if (this.timer > 1) {
        setTimeout(this.timerHandler, 1000);
      }
      if (this.timer < 4) {
        this.pulse = true;
      }
      this.timer--;
    },
    showTime(ms) {
      this.timer = ms / 1000 - 1
      setTimeout(this.timerHandler, 1000);
    },
    routesHandler() {
      if (this.light === 'red') {
        const timeToYellow = 10000;
        this.showTime(timeToYellow)
        this.changeColor('yellow', timeToYellow)
      }
      if (this.light === 'yellow') {
        const timeToGreen = 3000;
        this.showTime(timeToGreen)
        this.changeColor('green', timeToGreen)
      }
      if (this.light === 'green') {
        const timeToRed = 15000;
        this.showTime(timeToRed)
        this.changeColor('red', timeToRed)
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
    }
  }
}

</script>

<style scoped>
.traffic-light {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
}

.traffic-light__item {
  position: relative;
  width: 25vh;
  border-radius: 100%;
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
  font-size: 2em;
}

.traffic-light__timer_active {
  display: flex;
}

.traffic-light__item_red_off {
  background: hsl(0, 30%, 50%);
}

.traffic-light__item_red_on {
  background: hsl(0, 100%, 50%);
}

.traffic-light__item_yellow_off {
  background: hsl(50, 30%, 50%);
}

.traffic-light__item_yellow_on {
  background: hsl(50, 100%, 50%);
}

.traffic-light__item_green_off {
  background: hsl(100, 30%, 50%);
}

.traffic-light__item_green_on {
  background: hsl(100, 100%, 50%);
}


.traffic-light__item_pulse_red {
  animation: pulse-red 1s ease infinite;
}

.traffic-light__item_pulse_yellow {
  animation: pulse-yellow 1s ease infinite;
}

.traffic-light__item_pulse_green{
  animation: pulse-green 1s ease infinite;
}

@keyframes pulse-red {
  0% {
    background: hsl(0, 30%, 50%);
  }
  50% {
    background: hsl(0, 100%, 50%);
  }
  100% {
    background: hsl(0, 30%, 50%);
  }
}

@keyframes pulse-yellow {
  0% {
    background: hsl(50, 30%, 50%);
  }
  50% {
    background: hsl(50, 100%, 50%);
  }
  100% {
    background: hsl(50, 30%, 50%);
  }
}

@keyframes pulse-green {
  0% {
    background: hsl(100, 30%, 50%);
  }
  50% {
    background: hsl(100, 100%, 50%);
  }
  100% {
    background: hsl(100, 30%, 50%);
  }
}
</style>
