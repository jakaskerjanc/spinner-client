<template>
  <v-main>
    <v-window :model-value="useAppStore().tab">
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
    v-model:active-tab="useAppStore().tab"
    @update:model-value="onUpdateAciveTab"
  />
</template>

<script setup lang="ts">
import BottomNavigation from '@/components/BottomNavigation.vue'
import SearchTab from '@/components/SearchTab.vue'
import ListTab from '@/components/ListTab.vue'
import MapTab from '@/components/MapTab.vue'
import { useAppStore } from '@/store'

function onUpdateAciveTab (newValue: string) {
    useAppStore().tab = newValue
}
</script>
