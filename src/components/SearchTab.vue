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
        :model-value="searchStore.includeOnGoing"
        label="V trajanju"
        hide-details
        @update:model-value="onOnGoingChange"
      />
      <v-switch
        v-model="searchStore.includeWithoutDescription"
        label="Dogodki brez opisa"
        hide-details
      />
      <v-switch
        :model-value="searchStore.isOrderByDistance"
        label="Išči po razdalji"
        hide-details
        @update:model-value="onOrderByDistanceChange"
      />
      <v-btn
        v-if="searchStore.isOrderByDistance"
        prepend-icon="mdi-map-marker"
        @click="enterMapSelectMode"
      >
        Izberi lokacijo
      </v-btn>
    </div>
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
      clearable
    />
    <v-text-field
      v-model="searchStore.endDate"
      type="date"
      clearable
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
import { useAppStore, useEventsStore, useMapStore, useSearchStore } from '@/store'
import { computed } from 'vue'

const eventsStore = useEventsStore()
const searchStore = useSearchStore()
const mapStore = useMapStore()

const municipalities = computed(() => eventsStore.municipalities.map(m => { return { title: m.name, value: m.id } }))
const eventTypes = computed(() => eventsStore.eventTypes.map(m => { return { title: m.name, value: m.id } }))

function onOnGoingChange (newValue: any) {
    if (newValue) {
        searchStore.includeWithoutDescription = true
    }
    searchStore.includeOnGoing = newValue
}

function onOrderByDistanceChange (newValue: any) {
    if (newValue) {
        mapStore.getUserLocation()
    }
    searchStore.isOrderByDistance = newValue
}

function enterMapSelectMode () {
    mapStore.isInSelectMode = true
    useAppStore().tab = 'map'
}
</script>

<style scoped>
.wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
}

.v-input {
    max-width: 500px;
    width: 80%;
    min-width: 200px;
}

.switch-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 500px;
    width: 80%;
    min-width: 200px;
    padding-bottom: 20px;

}

.switch-container .v-input, .switch-container .v-btn {
    width: 50%;
}
</style>
