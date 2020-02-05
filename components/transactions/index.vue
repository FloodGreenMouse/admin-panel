<template lang="pug">
  .transactions-component(ref="container" v-outside="close")
    .button(@click="toggle" ref="button")
      transition(name="transactions")
        .count.flex.center(v-show="count")
          span {{ count }}
      iconBell
    transition(name="transactions")
      .notifications.flex.column.j-end.a-center(v-show="show" ref="notifications")
        .col-12(v-show="count")
          .head.flex.a-center.j-between
            span.title Уведомления
            .close(@click="close")
              iconCross
          .transactions
            vItem(v-for="(item, i) in transactions" :key="i" :transaction="item")
          nuxt-link.button-open.flex.center(to="/transactions") Открыть
        .no-messages(v-show="!count")
          span Нет новых заказов
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import iconBell from '@/components/icons/bell'
import iconCross from '@/components/icons/cross'
import vItem from './item'

export default {
  name: 'transactions-component',
  components: {
    iconBell,
    iconCross,
    vItem
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      count: 'unreadTransactionsCount'
    }),
    ...mapState({
      transactions: state => state.unreadTransactions
    })
  },
  watch: {
    '$route' () {
      this.show = false
    }
  },
  methods: {
    toggle () {
      !this.show ? this.open() : this.close()
    },
    open () {
      this.show = true
      this.getPosition()
    },
    close () {
      this.show = false
    },
    getPosition () {
      const notifications = this.$refs.notifications
      this.$nextTick(() => {
        const bRect = this.$refs.button.getBoundingClientRect()
        const nRect = notifications.getBoundingClientRect()
        if (window.innerWidth < 400) {
          notifications.style.width = 'calc(100% - 20px)'
          notifications.style.left = '10px'
          notifications.style.maxWidth = '100%'
          notifications.style.minWidth = '100px'
        } else {
          notifications.style.width = null
          notifications.style.maxWidth = null
          notifications.style.left = `${bRect.left - nRect.width + 26}px`
          notifications.style.top = `${bRect.bottom + 10}px`
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch('api/getTransactions', {
      limit: 100,
      read: false
    }).then(res => {
      this.$store.dispatch('setUnreadTransactions', res.val())
    })
    this.getPosition()
    window.addEventListener('resize', this.getPosition)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getPosition)
  }
}
</script>

<style lang="scss">
  .transactions-component {
    width: 20px;
    height: 20px;
    .button {
      @include svg($color-white);
    }
    .notifications {
      .close {
        @include svg(rgba($color-text-dark, 0.8))
      }
    }
  }
</style>

<style lang="scss" scoped>
  .transactions-component {
    width: 20px;
    height: 20px;
    .count {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: lighten($color-error, 10%);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
      z-index: 1;
      span {
        color: $color-white;
        font-weight: bold;
        font-size: 10px;
        user-select: none;
      }
    }
    .button {
      cursor: pointer;
      position: relative;
      z-index: 1;
      svg {
        width: 100%;
        height: 100%;
      }
      &:hover {
        svg {
          animation: bell 0.3s ease 2 forwards;
        }
      }
      &:hover {
        svg {
          animation: bell 0.3s ease 2 forwards;
        }
      }
    }
    .notifications {
      position: fixed;
      top: 0;
      min-width: 300px;
      max-width: 300px;
      width: 100%;
      max-height: 300px;
      min-height: 100px;
      background-color: $color-white;
      border-radius: 5px;
      border: 1px solid rgba($color-primary, 0.5);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.2);
      padding-bottom: 40px;
      z-index: 2;
      &:after {
        content: '';
        position: absolute;
        right: 5px;
        top: -21px;
        border: 10px solid transparent;
        border-top: 0;
        border-bottom-color: lighten($color-primary, 50%);
        width: 20px;
        height: 20px;
        z-index: -2;
      }
      .head {
        width: 100%;
        padding: 10px 15px;
        background-color: rgba($color-primary, 0.1);
        .title {
          font-size: 16px;
          font-weight: 900;
          color: rgba($color-text-dark, 0.8);
          letter-spacing: 0.8px;
          cursor: default;
          user-select: none;
        }
        .close {
          position: relative;
          width: 24px;
          height: 24px;
          cursor: pointer;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
      .transactions {
        width: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 8px;
          background-color: rgba(60, 66, 77, 0.1);
        }
        &::-webkit-scrollbar-thumb {
          background-color: $color-primary
        }
      }
      .button-open {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $color-primary;
        text-align: center;
        height: 40px;
        cursor: pointer;
        transition: $trs3;
        color: $color-white;
        font-size: 16px;
        text-decoration: none;
        &:hover {
          background-color: rgba($color-primary, 0.9);
        }
      }
      .no-messages {
        span {
          font-weight: 900;
          font-size: 22px;
          color: rgba($color-text-dark, 0.5);
          user-select: none;
        }
      }
    }
    @keyframes bell {
      0% {
        transform: rotate(0);
      }
      25% {
        transform: rotate(20deg);
      }
      50% {
        transform: rotate(0);
      }
      75% {
        transform: rotate(-20deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  }
</style>
