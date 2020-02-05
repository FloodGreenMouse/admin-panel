<template lang="pug">
  .page.transaction
    h1.title Заказ в лавке
    .flex.center
    .item.flex.column.col-md-8.col-6
      span.name Имя: {{ transaction.name || "Не указано" }}
      span.status Статус:
        =" "
        span(:class="getPaidClassList") {{ getPaid }}
      span.amount Сумма: {{ transaction.amount }} руб.
      span.read Прочитано: {{ getReadStatus }}
    .buttons.flex.j-end
      transition(name="fade")
        vButton(
          v-if="showMarkAsRead"
          text="Отметить как прочитанное"
          @click="markAsRead"
          :loading="showLoading")
      vButton(
        text="Назад"
        @click="$router.push('/transactions')"
        type="secondary")
</template>

<script>
import vButton from '@/components/form/button'

export default {
  name: 'transaction-page',
  components: {
    vButton
  },
  data () {
    return {
      showLoading: false,
      showMarkAsRead: true,
      transaction: {}
    }
  },
  computed: {
    getPaid () {
      return this.transaction.paid ? 'оплачено' : 'не оплачено'
    },
    getPaidClassList () {
      return this.transaction.paid ? 'paid' : 'unpaid'
    },
    getReadStatus () {
      return !this.showMarkAsRead ? 'да' : 'нет'
    }
  },
  asyncData ({ store, params }) {
    return store.dispatch('api/getTransaction', params.transaction).then(res => {
      return {
        transaction: res.val()
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
  },
  methods: {
    markAsRead () {
      this.transaction.read = true
      this.$store.dispatch('api/updateTransaction', this.transaction)
        .then(() => {
          this.showLoading = false
          this.showMarkAsRead = false
          this.$store.dispatch('deleteUnreadTransaction', this.transaction.id)
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Заказ помечен как прочитанный' })
        }).catch(err => {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'error',
            title: 'Ошибка!',
            message: '' })
          console.log('Error', err)
        })
    }
  },
  mounted () {
    this.showMarkAsRead = !this.transaction.read
  }
}
</script>

<style lang="scss" scoped>
  .page.transaction {
    .paid {
      color: $color-success;
    }
    .unpaid {
      color: $color-error;
    }
  }
</style>
