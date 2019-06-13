<template>
  <div class="average" id="averageDiv">
    <table class="averageTable">
      <thead>
        <tr>
          <th>Type</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="average in getAverages">
            <td v-for="index in keys"> {{average[index]}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { db } from '@/firebaseC/firebase-config.js'
import Vue from 'vue'

export default {
  name: 'average',
  props: { team: { type: Number, required: true, default: 1414 } },
  data: function () {
    return { keys: [0, 1] }
  },
  asyncComputed: {
    getAverages: function () {
      console.log('start for team', this.team)
      const dbref = db.collection('events').doc(Vue.prototype.$eventKey).collection('averages').doc(String(this.team))
      return dbref.get().then((doc) => {
        const data = doc.data()
        console.log(data)
        // Do this better
        const result = [['matches', data.matches], ['Cargo', data.cargo], ['Hatches', data.HP],
          ['cargoship', data.cargoship], ['rocket', data.rocket],
          ['climb', data.climb]]
        console.log('averages:', result)
        return result
      })
    }
  }
}
</script>
<style>
table {
  display: block;
}
</style>
