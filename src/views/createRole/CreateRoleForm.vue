<template>
  <div class="signin">
    
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
