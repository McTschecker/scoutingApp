<template>
    <div class="table matchList">
        <table class="mainTable">
            <thead>
                <tr>
                    <th v-for="col in byTeamsInMatch">
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
import { byTeamsInMatch, keysbyTeamInMatch } from './headers.js'
import { db } from '@/firebaseC/firebase-config.js'
import Vue from 'vue'

export default {
  name: 'matchTable',
  props: {
    match: { type: Number, required: true, default: 1 }
  },
  data: function () {
    console.log(byTeamsInMatch)
    return {

      byTeamsInMatch: byTeamsInMatch,
      keys: keysbyTeamInMatch
    }
  },
  watch: {
    // watches match
    match: function (val, oldVal) {
      console.log('registerd match change')
      getMatch(val)
    }
  },
  asyncComputed: {
    getMatch: function () {
      const matchRef = db.collection('matches')
      console.log(this.match)
      var matches = matchRef.where('matchNumber', '==', Number(this.match)).where('event', '==', Vue.prototype.$eventKey)
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
  render: function () { getMatch(this.match) }
}
</script>

<style scoped>
table, tr {
    border: 1px solid black;
}
td {
    border-left: 1px solid black;
    border-top: 1px solid black
}
.mainTable{
    width: 100%;
    overflow: auto;
    margin-top: 3%;
}
</style>
