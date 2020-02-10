<template lang="pug">
  .page.transactions
    h1.title Заказы в лавке
    .info-bar.flex.a-center.j-between(v-if="hasItems")
      span.status 1
      .col-2
        span Имя
      .col-2
        span Почта
      .col-2
        span Телефон
      .col-2
        span Статус
      .col-2
        span Сумма
    hr
    .items(v-if="hasItems")
      transactionItem(
        v-for="(item, i) in transactions"
        :key="i"
        :transaction="item"
        @delete="deleteTransaction")
    .no-transactons.flex.center(v-else)
      h2.title Нет заказов
</template>

<script>
import transactionItem from '@/components/transaction-item'

export default {
  name: 'transactions-page',
  components: {
    transactionItem
  },
  data () {
    return {
      transactions: {}
    }
  },
  computed: {
    hasItems () {
      if (!this.transactions) {
        return false
      }
      const count = Object.keys(this.transactions)
      return !!count.length
    }
  },
  asyncData ({ store }) {
    return store.dispatch('api/getTransactions').then(res => {
      return {
        transactions: res.val()
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
  },
  methods: {
    deleteTransaction (id) {
      this.$store.dispatch('deleteUnreadTransaction', id)
      this.$delete(this.transactions, id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page.transactions {
    .info-bar {
      text-align: center;
      padding-right: 100px;
      padding-top: 40px;
      span {
        user-select: none;
        font-weight: $font-weight-medium;
      }
      .status {
        display: inline-block;
        width: 20px;
      }
    }
    .items {
      padding-top: 20px;
      padding-bottom: 40px;
    }
  }
</style>
