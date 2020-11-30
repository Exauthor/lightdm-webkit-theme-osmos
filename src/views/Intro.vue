<template>
  <div id="intro">
    <div id="content">
      <AppIcon name="Arch Linux" />
      <!-- <h1> {{ $t('text.welcome') }} </h1> -->
      <h1> AAA  </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class IntroPage extends Vue {
  mounted() {
    // setTimeout(() => {
    //   this.$router.push({ name: 'index' })
    // }, 2000)
  }
}
</script>
