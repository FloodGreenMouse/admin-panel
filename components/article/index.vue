<template lang="pug">
  .article-component.col-5.col-md-12
    span.title {{ title }}
    nuxt-link.link(:to="link")
</template>

<script>
export default {
  name: 'article-component',
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-component {
    position: relative;
    display: flex;
    min-height: 50px;
    padding: 20px 25px;
    margin: 0 20px 20px 0;
    height: 100%;
    margin-bottom: 10px;
    border: 0;
    border-radius: 3px;
    background-color: $color-white;
    transition: $trs3;
    box-shadow: 0 0 5px rgba($color-text-dark, 0.4);
    z-index: 0;
    &:hover {
      box-shadow: 2px 2px 10px rgba($color-text-dark, 0.4);
    }
    .title {
      font-weight: $font-weight-medium;
      font-size: 16px;
      color: rgba($color-text-dark, 0.9);
    }
    .link {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  @include md {
    .article-component {
      margin: 0 0 20px 0;
    }
  }
</style>
