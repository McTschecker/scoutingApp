<template>
    <div class="clean">
        <form>
            <h2>{{text}}</h2>
            <input type="text" id="target" v-model="targeted">
            <input type="submit" v-on:click="deleteBySearch" class="submit">
        </form>
    </div>
</template>

<script>
import { db } from '@/firebaseC/firebase-config.js'
import Vue from 'vue'
export default {
  name: 'cleanBy',
  data: function () {
    return {
      targeted: ''
    }
  },
  props: {
    target: { type: String, required: true },
    text: { type: String, required: true }
  },
  methods: {
    deleteBySearch: function () {
      var userEntered
      if (this.target == 'matchNumber') {
        userEntered = Number(this.targeted)
      } else {
        userEntered = this.targeted
      }
      // console.log("triggered for", this.target, "where", userEntered, "as", typeof(userEntered))
      var matchQuery = db.collection('matches').where('event', '==', Vue.prototype.$eventKey).where(this.target, '==', userEntered)
      matchQuery.get().then((querySnapshot) => {
        console.log('Snapshot status', querySnapshot.empty)
        var counter = 0
        querySnapshot.forEach(doc => {
          console.log('deleted', doc.ref)
          doc.ref.delete()
          counter += 1
          console.log(counter)
        })
        alert('deleted: ' + counter + ' submissions')
      }).catch((err) => {
        console.log('Error getting docs', err)
        alert('Error getting documents')
      })
    }
  }

}
</script>

<style>
.submit{
    margin-left: 5px;
}
</style>
