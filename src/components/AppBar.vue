<template>
  <v-app-bar
    elevation="2"
    title="Spinner"
  >
    <template #append>
      <v-btn icon="mdi-refresh" />
      <v-btn icon>
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
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useMapStore } from '@/store'
import { computed } from 'vue'

const hasUserLocation = computed(() => useMapStore().hasUserLocation)
const locationIcon = computed(() => hasUserLocation.value ? 'mdi-map-marker' : 'mdi-map-marker-alert')
const locationBadgeColor = computed(() => hasUserLocation.value ? 'green' : 'red')

const theme = useTheme()
function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}
</script>
