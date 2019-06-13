<template>
    <div >
        <div class="matchs">
            <form>
                <label>match:</label>
                <input id="matchNumber" type="number" v-model="matchNumber" placeholder="1414"/>
            </form>
            <div class="tableContainer">
                <matches :match="matchNumber"></matches>
            </div>
        </div>
    </div>
</template>

<script>
import matches from '@/components/match/matchTable.vue'
export default {
  name: 'matchLookup',
  components: {
    matches
  },
  data: function () {
    return {
      matchNumber: 1
    }
  },
  watch: {
    'matchNumber': function (val, preval) {
      console.log(val)
      this.matchNumber = Number(val)
    }
  }
}
</script>
<style>
form {
    display: flex;
}
</style>
