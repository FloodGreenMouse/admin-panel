<template lang="pug">
  .transaction-item-component
    .content.flex.j-between
      span.name {{ transaction.name }}
      span.amount {{ transaction.amount }} руб.
    nuxt-link.link(:to="`/transactions/${transaction.id}`")
</template>

<script>
export default {
  name: 'transaction-item-component',
  props: {
    transaction: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .transaction-item-component {
    position: relative;
    width: 100%;
    z-index: 1;
    padding: 20px 25px 20px 25px;
    border-top: 1px solid rgba($color-text-dark, 0.2);
    transition: $trs3;
    &:hover {
      background-color: rgba($color-text-dark, 0.1);
    }
    .content {
      span {
        user-select: none;
      }
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
</style>
