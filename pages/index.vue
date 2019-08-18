<template lang="pug">
  .page.index
    div Index page!
    vButton(text="Получить данные" @click="getData")
</template>

<script>
import vButton from '~/components/form/button'
import firebase from '~/plugins/firebase'

export default {
  name: 'index-page',
  components: {
    vButton
  },
  methods: {
    getData () {
      firebase.firebase.database().ref('/content').set({
        data: 'test'
      })
      firebase.firebase.database().ref('/content').once('value').then(snapshot => {
        console.log(snapshot.val())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    //
  }
</style>
