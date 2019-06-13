<template>
    <div >
        <div class="teams">
            <form>
                <label>Team:</label>
                <input id="teamNumber" type="number" v-model="teamNumber" placeholder="1414"/>
            </form>
            <div class="tableContainer">
                <div class="matches">
                    <matches :team="teamNumber"></matches>
                </div>
                <div class="averages">
                    <averages :team="teamNumber"></averages>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import matches from '@/components/team/matches.vue'
import averages from '@/components/team/averages.vue'
export default {
  name: 'teamLookup',
  components: {
    matches,
    averages
  },
  data: function () {
    return {
      teamNumber: 1414
    }
  },
  watch: {
    'teamNumber': function (val, preval) {
      console.log(val)
      this.teamNumber = Number(val)
    }
  }
}
</script>
<style>
form {
    display: flex;
}
.matches{
    float:left;
    width: 80%;
    overflow: auto;
    height: 80%;
}
.averages{
    width: 20%;
    float: right;
}
</style>
