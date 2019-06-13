<template>
    <div class="eventSelector">
        <v-menu>
          <template #activator="{ on: menu }">
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-btn id="dropdownButton"
                  color="black"
                  v-on="{ ...tooltip, ...menu }"
                >Select Event</v-btn>
              </template>
              <span>Slect The Event</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in dropdownItems"
              :key="index"
              @click="updateGlobalEventKey(item.key)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
    </div>
</template>
<script>
import Dropdown from 'bp-vuejs-dropdown';
import Vue from "vue"
export default {
  name: 'eventSelect',
  data: function () {
    return{
      dropdownItems: [
        {title: 'Post Season Testing', key:"postSeasonTesting"},
        {title: 'Galileo', key:"Galileo"},
        {title: 'States', key:"Emerson"},
      ],
      event: Vue.prototype.$eventKey
    }
  },
  methods: {
    updateGlobalEventKey: function (key) {
      Vue.prototype.$eventKey = key
      console.log("set Vue prototype to:", Vue.prototype.$eventKey)
      document.getElementById("dropdownButton").innerText = "Event: " + Vue.prototype.$eventKey
    }
  },
}
</script>

