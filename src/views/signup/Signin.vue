<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
      // (user) => {
      //   alert('Success!')
      //   this.$router.push('/')
      // },
      // (err) => {
      //   alert(err.message)
      // },
      )
    },
  },
}
</script>

<style scoped>
 /* 省略 */
</style>
