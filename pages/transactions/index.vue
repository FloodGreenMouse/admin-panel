<template lang="pug">
  .page.transactions
    h1.title Заказы в лавке
    .items
      transactionItem(v-for="(item, i) in transactions" :key="i" :transaction="item")
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
  asyncData ({ store }) {
    return store.dispatch('api/getTransactions').then(res => {
      return {
        transactions: res.val()
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
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
