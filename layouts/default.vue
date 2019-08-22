<template lang="pug">
#app
  div
    transition(name="fade")
      vLoader(v-if="showLoader")
    vHeader
    vMenu
    nuxt
    vNotification
</template>

<script>
import vLoader from '~/components/loader'
import vHeader from '~/components/header'
import vMenu from '~/components/menu'
import vNotification from '~/components/notification'

export default {
  data () {
    return {
      showLoader: true
    }
  },
  components: {
    vLoader,
    vHeader,
    vMenu,
    vNotification
  },
  mounted () {
    setTimeout(() => {
      this.showLoader = false
    }, 1000)
  }
}
</script>
