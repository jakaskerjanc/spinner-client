<template>
  <MapboxMap
    id="map"
    style="height: 100%; width: 100%;"
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
      v-if="mapStore.selectedLocation && mapStore.effectiveLocationAsArray"
      :lng-lat="mapStore.effectiveLocationAsArray"
    />
    <MapboxGeolocateControl
      ref="geolocate"
      :show-accuracy-circle="false"
      @mb-geolocate="storeUserLocation"
      @mb-error="locationLoadError"
    />
    <MapboxNavigationControl position="bottom-right" />
    <template v-if="searchStore.isOrderByDistance">
      <MapboxSource
        id="locationSearchRadius"
        :options="sourceObj"
      />
      <MapboxSource
        id="locationSearchRadiusLine"
        :options="sourceObj2"
      />
      <MapboxLayer
        id="layer"
        :options="layerObj"
      />
      <MapboxLayer
        id="layer2"
        :options="layerObj2"
      />
    </template>
  </MapboxMap>
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxMap, MapboxGeolocateControl, MapboxNavigationControl, MapboxMarker, MapboxLayer, MapboxSource } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'
import { useEventsStore, useMapStore, useSearchStore } from '@/store'
import MapIcon from '@/components/map/MapIcon.vue'
import turfCircle from '@turf/circle'
import { lineString as turfLineString } from '@turf/helpers'

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
        mapStore.userLocation = { lat: e.coords.latitude, lng: e.coords.longitude }
    }
}

function locationLoadError (): void {
    mapStore.userLocation = null
    console.error('Could not load user location!')
}

function onMapClick (e: any) {
    if (mapStore.isInSelectMode) {
        mapStore.selectedLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng }
        mapStore.isInSelectMode = false
    }
}

const searchStore = useSearchStore()
const circle = computed(() => {
    if (mapStore.effectiveLocationAsArray) {
        const center = mapStore.effectiveLocationAsArray
        const radius = searchStore.distance
        return turfCircle(center, radius, { steps: 50, units: 'kilometers' })
    }
    return null
})
const lineString = computed(() => {
    if (circle.value !== null) {
        // @ts-ignore-next-line
        return turfLineString(...circle.value.geometry.coordinates)
    }
    return null
})

const sourceObj = computed(() => {
    if (circle.value) {
        return {
            type: 'geojson',
            data: {
                ...circle.value
            }
        }
    }
    return null
})
const sourceObj2 = computed(() => {
    if (circle.value) {
        return {
            type: 'geojson',
            data: {
                ...lineString.value
            }
        }
    }
    return null
})

const layerObj = {
    id: 'layerId',
    source: 'locationSearchRadius',
    type: 'fill',
    paint: {
        'fill-color': '#0062ff',
        'fill-opacity': 0.25,
        'fill-outline-color': 'blue'
    }
}
const layerObj2 = {
    id: 'layerId',
    source: 'locationSearchRadiusLine',
    type: 'line',
    paint: {
        'line-color': 'blue',
        'line-width': 1
    }
}
</script>
