<template>
    <div class="table matchList">
        <table class="mainTable">
            <thead>
                <tr>
                    <th v-for="col in byMatches">
                        {{col}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="match in getMatch">
                    <td v-for="key in keys"> {{match[0][key]}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { byMatches, keysByMatches } from './headers.js'
import { db } from '@/firebaseC/firebase-config.js'
import Vue from 'vue'
export default {
  name: 'teamMatches',
  props: {
    team: { type: Number, required: true, default: 1414 }
  },
  data: function () {
    return {
      byMatches: byMatches,
      keys: keysByMatches
    }
  },
  watch: {
    // watches Team
    team: function (val, oldVal) {
      console.log('registerd team change')
      getMatch(val)
    }
  },
  asyncComputed: {
    getMatch: function () {
      const matchRef = db.collection('matches')
      console.log(this.team)
      var matches = matchRef.where('team', '==', Number(this.team)).where('event', '==', Vue.prototype.$eventKey).orderBy('matchNumber')
      return matches.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.')
          }
          var matches = []
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            matches.push([doc.data()])
          })
          console.log(matches)
          return matches
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    }
  },
  render: function () { getMatch(this.team) }
}
</script>

<style>
table, tr {
    border: 1px solid black;
}
table{
    overflow: auto;
}
td {
    border-left: 1px solid black;
    border-top: 1px solid black
}
.mainTable{
    width: 100%;
}
</style>
