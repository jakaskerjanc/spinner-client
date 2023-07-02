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
    <div class="switch-container">
      <v-switch
        :model-value="searchStore.isOnGoing"
        label="V trajanju"
        @update:model-value="onOnGoingChange"
      />
      <v-switch
        v-model="searchStore.includeWithoutDescription"
        label="Dogodki brez opisa"
      />
    </div>
    <v-switch
      :model-value="searchStore.isOrderByDistance"
      label="Išči po razdalji"
      @update:model-value="onOrderByDistanceChange"
    />
    <v-slider
      v-if="searchStore.isOrderByDistance"
      v-model="searchStore.distance"
      :max="100"
      :min="1"
      step="1"
      thumb-label="always"
      prepend-icon="mdi-map-marker"
    />
    <v-text-field
      v-model="searchStore.startDate"
      type="date"
    />
    <v-text-field
      v-model="searchStore.endDate"
      type="date"
    />
    <v-btn
      color="red"
      @click="searchStore.search"
    >
      Išči
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useEventsStore, useMapStore, useSearchStore } from '@/store'
import { computed } from 'vue'

const eventsStore = useEventsStore()
const searchStore = useSearchStore()
const mapStore = useMapStore()

const municipalities = computed(() => eventsStore.municipalities.map(m => { return { title: m.name, value: m.id } }))
const eventTypes = computed(() => eventsStore.eventTypes.map(m => { return { title: m.name, value: m.id } }))

function onOnGoingChange (newValue: boolean) {
    if (newValue) {
        searchStore.includeWithoutDescription = true
    }
    searchStore.isOnGoing = newValue
}

function onOrderByDistanceChange (newValue: boolean) {
    if (newValue) {
        mapStore.getUserLocation()
    }
    searchStore.isOrderByDistance = newValue
}
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
    width: 80%;
    min-width: 200px;
}

.switch-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
    width: 80%;
    min-width: 200px;

}

.switch-container .v-input {
    width: 50%;
}
</style>
