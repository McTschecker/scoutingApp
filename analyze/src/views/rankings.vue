<template>
    <div class="ranking">
        <div class="column">
            <h1>HP</h1>
            <rankingTable type='HP'></rankingTable>
        </div>
        <div class="column">
            <h1>Cargo</h1>
            <rankingTable type='cargo'></rankingTable>
        </div>
        <div class="column">
            <h1>CargoShip</h1>
            <rankingTable type='cargoship'></rankingTable>
        </div>
        <div class="column">
            <h1>Rocket</h1>
            <rankingTable type='rocket'></rankingTable>
        </div>
    </div>
</template>

<script>
import rankingTable from '@/components/rankings/rankingTable.vue'
export default {
  name: 'rankings',
  components: {
    rankingTable
  }
}
</script>

<style>
.column {
  float: left;
  width: 25%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.ranking{
    margin-top: 4%
}
</style>
