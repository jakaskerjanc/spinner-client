<template>
  <MapboxMap
    style="height: calc(100vh - 120px)"
    :access-token="accessToken"
    :map-style="mapStyle"
    :center="[14.8, 46.15]"
    :zoom="8"
    :min-zoom="1"
    :max-zoom="16"
    @mb-click="onMapClick"
  >
    <map-icon
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
    <MapboxMarker
      v-if="mapStore.hasSelectedLocation"
      :lng-lat="mapStore.selectedLocation"
    />
    <MapboxGeolocateControl
      ref="geolocate"
      :show-accuracy-circle="false"
      @mb-geolocate="storeUserLocation"
      @mb-error="locationLoadError"
    />
    <MapboxNavigationControl position="bottom-right" />
  </MapboxMap>
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxMap, MapboxGeolocateControl, MapboxNavigationControl, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'
import { useEventsStore, useMapStore } from '@/store'
import MapIcon from '@/components/map/MapIcon.vue'
const accessToken = import.meta.env.VITE_MAPBOX_KEY

const mapStyleLight = 'mapbox://styles/mapbox/streets-v11'
const mapStyleDark = 'mapbox://styles/mapbox/dark-v11'

const theme = useTheme()
const mapStyle = computed(() => theme.current.value.dark === true ? mapStyleDark : mapStyleLight)

const eventsStore = useEventsStore()
const events = computed(() => eventsStore.events)

const mapStore = useMapStore()
mapStore.getUserLocationCb = triggerLocationFind

const geolocate = ref<any>(null)
function triggerLocationFind () {
    if (geolocate.value && geolocate.value.control) {
        geolocate.value.control.trigger()
    } else {
        console.error('Cannot manually trigger locating!')
    }
}

function storeUserLocation (e: any): void {
    if (e && e.coords && e.coords.latitude && e.coords.longitude) {
        mapStore.userLocation = [e.coords.latitude, e.coords.longitude]
    }
}

function locationLoadError (): void {
    mapStore.userLocation = null
    console.error('Could not load user location!')
}

function onMapClick (e: any) {
    if (mapStore.isInSelectMode) {
        mapStore.selectedLocation = [e.lngLat.lng, e.lngLat.lat]
        mapStore.isInSelectMode = false
    }
}
</script>
