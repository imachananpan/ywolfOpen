<template>
  <div id="app">
  <Screen>
      <router-view/>
  </Screen>
  </div>
</template>
<script>
import firebase from 'firebase'
import Screen from './views/Screen/Screen.vue'

export default {
  name: 'App',
  components: {
    Screen,
  },
  data() {
    return {
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
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
