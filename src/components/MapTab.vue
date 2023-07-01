<template>
  <MapboxMap
    style="height: calc(100vh - 120px)"
    :access-token="accessToken"
    :map-style="mapStyle"
    :center="[14.8, 46.15]"
    :zoom="8"
    :min-zoom="7"
    :max-zoom="14"
  >
    <map-icon
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
    <MapboxGeolocateControl :show-accuracy-circle="false" />
    <MapboxNavigationControl position="bottom-right" />
  </MapboxMap>
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxMap, MapboxGeolocateControl, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl'
import { useTheme } from 'vuetify'
import 'mapbox-gl/dist/mapbox-gl.css'
import { computed } from 'vue'
import { useEventsStore } from '@/store'
import MapIcon from '@/components/map/MapIcon.vue'
const accessToken = import.meta.env.VITE_MAPBOX_KEY

const mapStyleLight = 'mapbox://styles/mapbox/streets-v11'
const mapStyleDark = 'mapbox://styles/mapbox/dark-v11'

const theme = useTheme()
const mapStyle = computed(() => theme.current.value.dark === true ? mapStyleDark : mapStyleLight)

const eventsStore = useEventsStore()
const events = computed(() => eventsStore.events)
</script>
