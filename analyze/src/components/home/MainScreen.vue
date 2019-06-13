<template>
  <div class="home">
    <img src="../../assets/ihotLogo.png">
    <h1>Welcome to the IHOT 1414 Analysis Dashboard </h1>
    <h3> Please use the Navigation Bar to Select what to analyze</h3>
  </div>
</template>

<script>
export default {
  name: 'mainScreen',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    color: #3e7bb6;
}
.home {
    width: 90%;
    margin-left: 5%;
}
</style>
