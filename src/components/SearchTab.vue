<template>
  <div class="wrapper">
    <v-text-field
      v-model="searchStore.title"
      clearable
      label="Naslov"
    />
    <v-text-field
      v-model="searchStore.description"
      clearable
      label="Opis"
    />
    <v-autocomplete
      v-model="searchStore.selectedMunicipalityIds"
      clearable
      label="Občina"
      :items="municipalities"
      multiple
    />
    <v-autocomplete
      v-model="searchStore.selectedEventTypeIds"
      clearable
      label="Tip dogodka"
      :items="eventTypes"
      multiple
    />
    <v-switch
      v-model="searchStore.isOnGoing"
      label="V trajanju"
    />
    <v-radio-group v-model="searchStore.order">
      <v-radio
        label="ASC"
        value="asc"
      />
      <v-radio
        label="DESC"
        value="desc"
      />
    </v-radio-group>
    <v-radio-group v-model="searchStore.orderBy">
      <v-radio
        label="Datum"
        value="date"
      />
      <v-radio
        label="Lokacija"
        value="location"
      />
    </v-radio-group>
    <v-text-field
      v-model="searchStore.startDate"
      type="date"
    />
    <v-text-field
      v-model="searchStore.endDate"
      type="date"
    />
    <v-btn @click="searchStore.search">
      Išči
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useEventsStore, useSearchStore } from '@/store'
import { computed } from 'vue'

const eventsStore = useEventsStore()
const municipalities = computed(() => eventsStore.municipalities.map(m => { return { title: m.name, value: m.id } }))
const eventTypes = computed(() => eventsStore.eventTypes.map(m => { return { title: m.name, value: m.id } }))

const searchStore = useSearchStore()
</script>

<style scoped>
.wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    max-height: calc(100vh - 120px);
}

.v-input {
    max-width: 500px;
    width: 50%;
    min-width: 200px;
}

</style>
