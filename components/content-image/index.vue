<template lang="pug">
  .content-image-component
    img(v-if="src.length" :src="src" :alt="src")
    iconImage(v-else)
</template>

<script>
import iconImage from '@/components/icons/image'

export default {
  name: 'content-image-component',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  components: {
    iconImage
  }
}
</script>

<style lang="scss" scoped>
  .content-image-component {
    width: 200px;
    margin: 20px 0;
    svg {
      width: 100%
    }
    img {
      width: 100%;
    }
  }
</style>
