<template>
  <v-app-bar
    elevation="2"
    rounded
  >
    <div class="d-flex align-center justify-space-between w-100 px-2">
      <div style="padding-right: 144px;">
        <v-btn
          v-show="showDrawerToggle"
          icon="mdi-menu"
          @click="appStore.toggleLeftDrawer"
        />
      </div>
      <div class="text-h5">
        Spinner
      </div>
      <div>
        <v-btn icon="mdi-refresh" />
        <v-btn
          icon
          @click="onLocationBtnClick"
        >
          <v-badge
            :color="locationBadgeColor"
            dot
            location="top end"
          >
            <v-icon :icon="locationIcon" />
          </v-badge>
        </v-btn>
        <v-btn
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
        />
        <v-btn
          v-if="showDrawerToggle"
          icon="mdi-menu"
          @click="appStore.toggleRightDrawer"
        />
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify'
import { useMapStore, useAppStore } from '@/store'
import { computed } from 'vue'

const mapStore = useMapStore()
const appStore = useAppStore()

const showDrawerToggle = computed(() => !useDisplay().mobile.value)

const hasUserLocation = computed(() => mapStore.hasUserLocation)
const locationIcon = computed(() => hasUserLocation.value ? 'mdi-map-marker' : 'mdi-map-marker-alert')
const locationBadgeColor = computed(() => hasUserLocation.value ? 'green' : 'red')

const theme = useTheme()
function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}

function onLocationBtnClick () {
    mapStore.getUserLocation()
}
</script>
