<template lang="pug">
  .transaction-item-component
    .transaction.flex.j-between
      span.name {{ transaction.name }}
      .information.flex.a-center
        span.status Статус:
          span(:class="statusClassList") {{ getStatus }}
        span.amount {{ transaction.amount }} руб.
        .read-status(:class="asReadClassList")
          iconNote
    nuxt-link.link(:to="`/transactions/${transaction.id}`")
</template>

<script>
import iconNote from '@/components/icons/note'

export default {
  name: 'transaction-item-component',
  components: {
    iconNote
  },
  props: {
    transaction: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getStatus () {
      return this.transaction.paid ? 'Оплачено' : 'Не оплачено'
    },
    statusClassList () {
      return this.transaction.paid ? 'paid' : 'unpaid'
    },
    asReadClassList () {
      return this.transaction.read ? 'read' : 'unread'
    }
  }
}
</script>

<style lang="scss">
  .transaction-item-component {
    .information {
      .read {
        @include svg(rgba($color-text-dark, 0.3));
      }
      .unread {
        @include svg(rgba($color-text-dark, 0.9));
      }
    }
  }
</style>

<style lang="scss" scoped>
  .transaction-item-component {
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba($color-text-dark, 0.1);
    transition: $trs3;
    &:last-child {
      border-bottom: 1px solid rgba($color-text-dark, 0.1);
    }
    &:hover {
      background-color: rgba($color-text-dark, 0.05);
      .name, .status, .paid, .unpaid {
        text-decoration: underline;
      }
    }
    .transaction {
      padding: 20px 25px;
    }
    .information {
      .read-status {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 20px;
        svg {
          width: 100%;
        }
      }
      span {
        display: inline-block;
        margin-left: 20px;
        .paid {
          color: $color-success;
        }
        .unpaid {
          color: $color-error;
        }
      }
      .status {
        width: 300px;
        text-align: left;
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
