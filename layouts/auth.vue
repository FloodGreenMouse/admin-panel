<template lang="pug">
#app
  transition(name="fade")
    vLoader(v-if="showLoader")
  nuxt
</template>

<script>
import vLoader from '~/components/loader'

export default {
  data () {
    return {
      showLoader: true
    }
  },
  components: {
    vLoader
  },
  mounted () {
    setTimeout(() => {
      this.showLoader = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>

</style>
