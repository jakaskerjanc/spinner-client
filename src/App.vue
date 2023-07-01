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
      <v-app-bar
        elevation="2"
        title="Spinner"
      >
        <template #append>
          <v-btn icon="mdi-refresh" />
          <v-btn icon="mdi-cog" />
          <v-btn
            icon="mdi-theme-light-dark"
            @click="toggleTheme"
          />
        </template>
      </v-app-bar>
      <v-main class="main">
        <v-window v-model="activeTab">
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
        v-model:active-tab="activeTab"
      />
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import BottomNavigation from './components/BottomNavigation.vue'
import SearchTab from './components/SearchTab.vue'
import ListTab from './components/ListTab.vue'
import MapTab from './components/MapTab.vue'
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'
import { useEventsStore, useAppStore } from './store'

const activeTab = ref('map')

const eventsStore = useEventsStore()
eventsStore.fetchAll()

const isLoading = computed(() => useAppStore().loading)

const theme = useTheme()
function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}
</script>

<style>
#loading-dialog .v-overlay__content {
    position: absolute;
    top: 50px;
}
</style>
