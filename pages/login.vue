<template lang="pug">
.login-page
  .container.flex.center
    .form
      form(action="" method="post" @submit.prevent autocomplete="on")
        .form-head.flex.center
          span.title Вход в админ панель
        .form-body
          vInput(
            placeholder="E-mail"
            v-model="email"
            :invalid="invalidEmail"
            @input="invalidEmail = false"
            required)
          vInput(
            placeholder="Пароль"
            type="password"
            v-model="password"
            :invalid="invalidPassword"
            @input="invalidPassword = false"
            required)
          .form-footer.flex.j-end
            vButton(
              @click="login"
              text="Вход"
              :loading="buttonLoading"
              role="submit")
  vNotification
</template>

<script>
import vInput from '~/components/form/input'
import vButton from '~/components/form/button'
import vNotification from '~/components/notification'
import firebase from '~/plugins/firebase'

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
      email: '',
      password: '',
      invalidEmail: false,
      invalidPassword: false,
      buttonLoading: false,
      fireLogin: null
    }
  },
  methods: {
    login () {
      this.buttonLoading = true
      this.invalidEmail = !this.email.length
      this.invalidPassword = !this.password.length
      if (!this.invalidEmail && !this.invalidPassword) {
        firebase.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(res => {
            window.localStorage.setItem('token', res.user.uid)
            this.$store.dispatch('addUserUid', res.user.uid)
            this.$store.dispatch('addNotification', {
              title: 'Успешно',
              message: 'Вход в админ-панель',
              type: 'info' })
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          })
          .catch(err => {
            console.log('error', err)
            this.buttonLoading = false
            this.$store.dispatch('addNotification', {
              title: 'Ошибка!',
              message: 'Неправильный логин или пароль',
              type: 'error' })
          })
      } else {
        this.buttonLoading = false
      }
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
