<template lang="pug">
  .transaction-item-component.flex.a-center.j-between
    .transaction.flex.j-between
      .flex.a-center
        .read-status(:class="asReadClassList")
          iconNote
        span.name {{ transaction.name }}
      .information.flex.a-center
        span.status Статус:
          span(:class="statusClassList") {{ getStatus }}
        span.amount {{ transaction.amount }} руб.
      nuxt-link.link(:to="`/transactions/${transaction.id}`")
    .delete-button
      vButton(
        @click="deleteTransaction"
        type="error"
        text=" "
        :loading="showLoading"
        title="Удалить")
        iconTrash
</template>

<script>
import iconNote from '@/components/icons/note'
import iconTrash from '@/components/icons/trash'
import vButton from '@/components/form/button'

export default {
  name: 'transaction-item-component',
  components: {
    iconNote,
    iconTrash,
    vButton
  },
  props: {
    transaction: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showLoading: false
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
  },
  methods: {
    deleteTransaction () {
      this.showLoading = true
      this.$store.dispatch('api/deleteTransaction', this.transaction.id)
        .then(() => {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Транзакция удалена' })
          this.$emit('delete', this.transaction.id)
        }).catch(() => {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'error',
            title: 'Ошибка',
            message: 'Возникла какая-то ошибка' })
          console.log('Error')
        })
    }
  }
}
</script>

<style lang="scss">
  .transaction-item-component {
    .delete-button {
      @include svg($color-white);
      .button-component button {
        padding: 10px 15px;
      }
    }
    .transaction {
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
      flex: 1;
      position: relative;
      z-index: 1;
      padding: 20px 25px;
      .read-status {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 20px;
        svg {
          width: 100%;
        }
      }
    }
    .information {
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
