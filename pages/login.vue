<template lang="pug">
.login-page
  .container.flex.center
    .form
      .form-head.flex.center
        span.title Вход в админ панель
      .form-body
        vInput(placeholder="Логин" v-model="name")
        vInput(placeholder="Пароль" type="password" v-model="password")
      .form-footer.flex.j-end
        vButton(@click="login")
        vButton(text="Notify" @click="test")
  vNotification
</template>

<script>
import vInput from '~/components/form/input'
import vButton from '~/components/form/button'
import vNotification from '~/components/notification'

export default {
  name: 'login-page',
  layout: 'auth',
  components: {
    vInput,
    vButton,
    vNotification
  },
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.name.indexOf('123') !== -1 && this.password.indexOf('000') !== -1) {
        window.localStorage.setItem('token', 'test')
        this.$router.push('/')
      } else {
        console.warn('error')
      }
    },
    test () {
      this.$store.dispatch('addNotification')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
  }
  .form {
    border: 0;
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  .form-head {
    background-color: $color-primary;
    height: 50px;
  }
  .title {
    font-size: 20px;
    line-height: 20px;
    color: $color-white;
    font-weight: $font-weight-light;
  }
  .form-body {
    margin-top: 0;
    padding: 15px 10px;
  }
  .form-footer {
    margin-top: 10px;
    padding: 15px 10px;
  }
</style>
