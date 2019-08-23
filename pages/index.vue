<template lang="pug">
  .page.index
    h1 Админ панель
    .add-article.flex.j-end
      vButton(text="+" link="/articles/new-article" type="add")
</template>

<script>
import vButton from '~/components/form/button'

export default {
  name: 'index-page',
  components: {
    vButton
  }
}
</script>

<style lang="scss" scoped>
  .index {
    //
  }
  .add-article {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
</style>
