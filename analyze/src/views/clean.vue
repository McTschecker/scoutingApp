<template>
    <div class="clean">
        <h1>THIS DELETES Entries in the Database. ADMINS ONLY</h1>
        <cleanByElement target="userID" text="User ID"></cleanByElement>
        <cleanByElement target="matchNumber" text="Match Number"></cleanByElement>
    </div >
</template>
<script>
import cleanByElement from '../components/clean/cleanElement.vue'
export default {
  name: 'cleanScreen',
  components: {
    cleanByElement
  }
}
</script>
<style scoped>
h1{
    color: red;
}
</style>
