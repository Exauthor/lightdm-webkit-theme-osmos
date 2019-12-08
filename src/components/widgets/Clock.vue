<template lang='pug'>
  .wizard-dual
    .clock.icon-container
      .position-center
        .clock-item.clock-seconds(ref='seconds')
        .clock-item.clock-minutes(ref='minutes')
        .clock-item.clock-hours(ref='hours')
    .wizard-block
      .fs-7.fw-600 {{ time.hours | formatTime}}:{{ time.minutes | formatTime}}
      //- .clock-info-time {{ time.minutes }}
</template>

<script>
import moment from 'moment'

import { mapState } from 'vuex'

export default {
  name: 'UserChoiceWidget',
  computed: {
    ...mapState('page', ['time'])
  },
  methods: {
    updateHand(hand) {
      const handTime = {
        seconds: 60,
        minutes: 3600,
        hours: 86400
      }
      this.$refs[hand].style.transform = 'rotateZ(1deg)'
      this.$refs[hand].style.animation = 'none'
      setTimeout(() => {
        this.$refs[hand].style.animation = `rotate ${handTime[hand]}s infinite linear`
      }, 10)
    }
  },
  mounted() {
    const { seconds, minutes, hours } = this.time

    const hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2),
        time: 43200
      },
      {
        hand: 'minutes',
        angle: (minutes * 6),
        time: (60 - minutes) * 60 - seconds
      },
      {
        hand: 'seconds',
        angle: (seconds * 6),
        time: 60 - seconds
      }
    ];
    hands.forEach(({ hand, angle, time }) => {
      this.$refs[hand].style.transform = `rotateZ(${angle}deg)`
      this.$refs[hand].style.animation = `rotate ${time}s infinite linear`
      setTimeout(this.updateHand, time * 1000, hand)
    })
  }
};
</script>

<style lang='stylus'>
.clock
  border .3vmin solid var(--color-active)
  border-radius 50%
  position relative

.clock-item
  position absolute
  background var(--color-active)
  top -3.5vmin
  transform-origin 50% 100%
  height 3.5vmin
  width .2vmin
  border-radius .2vmin

.clock-seconds
  animation rotate 60s infinite linear

.clock-minutes
  height 3vmin
  top -3vmin
  width .3vmin
  animation rotate 3600s infinite linear

.clock-hours
  height 2.5vmin
  top -2.5vmin
  width .4vmin
  animation rotate 86400s infinite linear

@keyframes rotate
  100%
    transform rotateZ(360deg)
</style>
