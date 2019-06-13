<template>
  <div id="app">
    <div id="top" v-if="isSignedIn()">
      <div id="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/teams">Team</router-link>
        |
        <router-link to="/matches">Matches</router-link>
        |
        <router-link to="/rankings">Rankings</router-link>
        |
        <router-link to="/clean">Clean</router-link>
      </div>
      <div class="signOut">
        <span v-on:click="signOut()">Sign out</span>
      </div>
      <event-select></event-select>
    </div>
    <router-view/>
  </div>
</template>
<script>
import firebase from './firebaseC/firebase-config.js'
import eventSelect from "./components/util/eventSelect.vue"
export default {
  name: 'app',
  components:{
    eventSelect
  },
  methods: {
    isSignedIn: function () {
      var user = firebase.auth().currentUser
      if (user) {
        // User is signed in.
        console.log('logged in')
        return true
      } else {
        console.log('not logged in')
        // No user is signed in.
        return false
      }
    },
    signOut: function () {
      console.log('signing out')
      firebase.auth().signOut().then(() => {
        console.log('signed out')
        this.$router.replace('/login')
      })
    }
  }
}
</script>

<style>
.signOut{
  float: right;
  margin-right: 5%;
  color: #0000EE;
}
#nav{
  float: left;
  width: 50%;
  padding-left: 25%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #3e75b7;
}
.top{
  display: none;
}
</style>
