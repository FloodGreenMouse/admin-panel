<template lang="pug">
  .page.index
    h1 Админ панель
    .flex
      infoWindow.col-6(title="Хранилище файлов")
        a(href="https://console.firebase.google.com/u/0/project/admin-test-7f71a/storage/admin-test-7f71a.appspot.com/files" target="_blank") Открыть хранилище
    .flex
      infoWindow.col-6(title="Консоль Firebase")
        a(href="https://console.firebase.google.com/u/0/project/admin-test-7f71a/database/admin-test-7f71a/data" target="_blank") Открыть консоль
</template>

<script>
import infoWindow from '@/components/info-window'

export default {
  name: 'index-page',
  components: {
    infoWindow
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
