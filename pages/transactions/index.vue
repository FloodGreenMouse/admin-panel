<template lang="pug">
  .page.transactions
    h1.title Заказы в лавке
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
      this.$delete(this.transactions, id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page.transactions {
    .items {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
</style>
