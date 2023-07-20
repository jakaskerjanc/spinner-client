<template>
  <v-main>
    <v-window
      :model-value="useAppStore().persistentSettings.tab"
      height="100%"
    >
      <v-window-item
        value="map"
        height="100%"
      >
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
    v-model:active-tab="useAppStore().persistentSettings.tab"
    @update:model-value="onUpdateAciveTab"
  />
</template>

<script setup lang="ts">
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import SearchTab from '@/components/SearchTab.vue'
import ListTab from '@/components/ListTab.vue'
import MapTab from '@/components/map/MapTab.vue'
import { useAppStore } from '@/store'

function onUpdateAciveTab (newValue: string) {
    useAppStore().persistentSettings.tab = newValue
}
</script>

<style scoped>
.v-window, .v-window-item {
  height: 100%;
}
</style>
