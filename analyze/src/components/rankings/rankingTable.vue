<template>
    <div class="rankingTable">
        <table>
          <thead>
            <th>Team</th>
            <th>Average</th>
          </thead>
          <tbody>
          </tbody>
            <tr v-for="team in getRanking">
              <td>{{team["teamNumber"]}}</td>
              <td>{{team[type]}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import { db } from '@/firebaseC/firebase-config.js'
import Vue from 'vue'
export default {
  name: 'rankingTable',
  props: {
    type: { type: String, required: true }
  },
  asyncComputed: {
    getRanking: function () {
      const matchRef = db.collection('events').doc(Vue.prototype.$eventKey).collection('averages')
      console.log(this.type)
      var matches = matchRef.orderBy(this.type, 'desc').limit(20)
      return matches.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.')
          }
          var matches = []
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            matches.push(doc.data())
          })
          matches = matches
          console.log(matches)
          console.log(matches[0][this.type])
          return matches
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    }
  }
}
</script>
<style scoped>
table, tr {
    border: 1px solid black;
}
table{
  widows: 100%;
  margin-left: 25%;
  width: 50%;
}
td {
    border-left: 1px solid black;
    border-top: 1px solid black
}
</style>
