<template>
  <v-app>
    <v-dialog
      id="loading-dialog"
      v-model="isLoading"
      :scrim="false"
      persistent
      width="auto"
    >
      <v-card color="red">
        <v-card-text>
          Nalagam...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-layout class="rounded rounded-md">
      <app-bar />
      <v-main class="main">
        <v-window :model-value="appStore.tab">
          <v-window-item value="map">
            <map-tab />
          </v-window-item>
          <v-window-item value="list">
            <list-tab />
          </v-window-item>
          <v-window-item value="search">
            <search-tab />
          </v-window-item>
        </v-window>
      </v-main>
      <bottom-navigation
        v-model:active-tab="appStore.tab"
        @update:model-value="onUpdateAciveTab"
      />
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import BottomNavigation from './components/BottomNavigation.vue'
import SearchTab from './components/SearchTab.vue'
import ListTab from './components/ListTab.vue'
import MapTab from './components/MapTab.vue'
import AppBar from './components/AppBar.vue'
import { computed, onBeforeMount } from 'vue'
import { useEventsStore, useAppStore } from './store'

const eventsStore = useEventsStore()
const appStore = useAppStore()

const isLoading = computed(() => appStore.loading)

onBeforeMount(() => {
    eventsStore.fetchAll()
})

function onUpdateAciveTab (newValue: string) {
    appStore.tab = newValue
}
</script>

<style>
#loading-dialog .v-overlay__content {
    position: absolute;
    top: 50px;
}
</style>
