<template lang="pug">
  .page.transactions
    h1.title Заказы в лавке
    .info-bar(v-if="hasItems")
      .flex.a-center.j-between
        span.status
          iconEye
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
import iconEye from '@/components/icons/eye'

const getOrderedTransactions = transactions => {
  const ordered = []
  for (const item in transactions) {
    ordered.push(transactions[item])
  }
  ordered.sort((a, b) => {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
      return 1
    }
    if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
      return -1
    }
    return 0
  })
  return ordered
}

export default {
  name: 'transactions-page',
  components: {
    transactionItem,
    iconEye
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
      const transactions = res.val()
      return {
        transactions: getOrderedTransactions(transactions)
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
  },
  methods: {
    deleteTransaction (id) {
      this.$store.dispatch('deleteUnreadTransaction', id)
      this.transactions.forEach((item, i) => {
        if (item.id === id) {
          this.transactions.splice(i, 1)
        }
      })
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
        margin-left: 10px;
      }
    }
    .items {
      padding-top: 20px;
      padding-bottom: 40px;
    }
  }
</style>
