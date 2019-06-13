<template>
    <div class="login">
        <img id="IHOTLogo" src="../assets/ihotLogo.png" alt="ihot1414 logo"/>
        <h1>Please sign in to continue</h1>
        <img id="googleSignIn" v-on:click="signIn" src="../assets/googleSignIn.png" alt="google sign in"/>
    </div>
</template>

<script>
import firebase from '../firebaseC/firebase-config.js'
// eslint-disable-next-line
import { gauth } from '../firebaseC/firebase-config.js'
export default {
  name: 'login',
  methods: {
    signIn: function () {
      firebase.auth().signInWithPopup(gauth).then((result) => {
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style>
    img{
        width: 80%;
        height: 1%;
    }
</style>
