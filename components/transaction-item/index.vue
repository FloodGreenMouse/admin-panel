<template lang="pug">
  .transaction-item-component
    .flex.a-center.j-between
      .read-status.col-2(:class="asReadClassList")
        iconNote
      .col-2
        span.name {{ transaction.name }}
      .col-2
        span.email {{ transaction.email }}
      .col-2
        span.phone {{ transaction.phone }}
      .col-2
        span.pay-status Статус:
          span(:class="statusClassList") {{ getStatus }}
      .col-2
        span.pay-status Сумма: {{ transaction.amount }}
      .flex.j-end
        .delete-button
          vButton(
            @click="deleteTransaction(transaction.id)"
            type="error"
            text=" "
            :loading="showLoading"
            title="Удалить")
            iconTrash
    nuxt-link.link(:to="`/transactions/${transaction.id}`")
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
    deleteTransaction (id) {
      this.showLoading = true
      this.$store.dispatch('api/deleteTransaction', id)
        .then(() => {
          this.showLoading = false
          this.$emit('delete', id)
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Транзакция удалена' })
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
    .read-status {
      &.read {
        @include svg(rgba($color-text-dark, 0.3));
      }
      &.unread {
        @include svg(rgba($color-text-dark, 0.9));
      }
    }
  }
</style>

<style lang="scss" scoped>
  .transaction-item-component {
    position: relative;
    border-top: 1px solid rgba($color-text-dark, 0.1);
    transition: $trs3;
    text-align: center;
    z-index: 1;
    &:last-child {
      border-bottom: 1px solid rgba($color-text-dark, 0.1);
    }
    &:hover {
      background-color: rgba($color-text-dark, 0.05);
      .name, .status, .paid, .unpaid {
        text-decoration: underline;
      }
    }
    .read-status {
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: left;
      svg {
        width: 100%;
      }
    }
    .pay-status {
      width: 300px;
      text-align: left;
      span {
        display: inline-block;
        margin-left: 20px;
      }
      .paid {
        color: $color-success;
      }
      .unpaid {
        color: $color-error;
      }
    }
    .delete-button {
      position: relative;
      z-index: 2;
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
