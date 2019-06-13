<template>
  <div class="home">
    <MainScreen/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainScreen from '@/components/home/MainScreen'
export default {
  name: 'home',
  components: {
    MainScreen
  }
}
</script>
