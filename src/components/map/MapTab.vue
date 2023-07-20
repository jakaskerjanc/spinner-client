<template>
  <MapboxMap
    id="map"
    style="height: 100%; width: 100%;"
    :access-token="accessToken"
    :map-style="mapStyle"
    :center="mapCenter"
    :bounds="[[16.57636, 46.87560], [13.38844, 45.42962]]"
    :zoom="8"
    :min-zoom="1"
    :max-zoom="16"
    @mb-click="onMapClick"
    @mb-created="(mapInstance: Map) => map = mapInstance"
  >
    <map-icon
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
    <MapboxGeolocateControl
      ref="geolocate"
      :show-accuracy-circle="false"
      @mb-geolocate="storeUserLocation"
      @mb-error="locationLoadError"
    />
    <MapboxNavigationControl position="bottom-right" />
    <template v-if="searchStore.isOrderByDistance && mapStore.effectiveLocationAsArray">
      <MapboxMarker
        v-if="mapStore.selectedLocation"
        :lng-lat="mapStore.effectiveLocationAsArray"
      />
      <MapboxSource
        id="locationSearchRadius"
        :options="circleGeojson"
      />
      <MapboxSource
        id="locationSearchRadiusLine"
        :options="lineGeojson"
      />
      <MapboxLayer
        id="circleLayer"
        :options="circleStyle"
      />
      <MapboxLayer
        id="lineLayer"
        :options="lineStyle"
      />
    </template>
    <LargeEventIcon
      v-for="largeEvent in largeEvents"
      :key="largeEvent.id"
      :large-event="largeEvent"
      :is-selected="largeEvent.id === mapStore.selectedLargeEventId"
    />
  </MapboxMap>
  <event-popup v-if="renderEventPopup" />
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxMap, MapboxGeolocateControl, MapboxNavigationControl, MapboxMarker, MapboxLayer, MapboxSource } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useDisplay } from 'vuetify'
import { computed, ref, watch } from 'vue'
import { useAppStore, useEventsStore, useMapStore, useSearchStore } from '@/store'
import MapIcon from '@/components/map/MapIcon.vue'
import EventPopup from '@/components/map/EventPopup.vue'
import LargeEventIcon from '@/components/map/LargeEventIcon.vue'
import turfCircle from '@turf/circle'
import { lineString as turfLineString } from '@turf/helpers'
import { Map } from 'mapbox-gl'

const accessToken = import.meta.env.VITE_MAPBOX_KEY

const { mobile } = useDisplay()

const mapStyleLight = 'mapbox://styles/mapbox/streets-v11'
const mapStyleDark = 'mapbox://styles/mapbox/dark-v11'
const mapStyle = computed(() => appStore.persistentSettings.theme === 'darkTheme' ? mapStyleDark : mapStyleLight)

const searchStore = useSearchStore()
const eventsStore = useEventsStore()
const mapStore = useMapStore()
const appStore = useAppStore()

const events = computed(() => eventsStore.events)
const largeEvents = computed(() => eventsStore.largeEvents)

const renderEventPopup = computed(() => !mobile.value || appStore.persistentSettings.tab === 'map')

const mapCenter = ref([14.8, 46.15])

const map = ref<Map | null>(null)
watch(() => mapStore.selectedEventId, (id) => {
    const event = events.value.find((event) => event.id === id)
    if (event && map.value !== null) {
        map.value.flyTo({
            center: [event.lon, event.lat]
        })
    }
})

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

const circleGeojson = computed(() => {
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

const lineGeojson = computed(() => {
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

const circleStyle = {
    id: 'layerId',
    source: 'locationSearchRadius',
    type: 'fill',
    paint: {
        'fill-color': '#0062ff',
        'fill-opacity': 0.25,
        'fill-outline-color': 'blue'
    }
}

const lineStyle = {
    id: 'layerId',
    source: 'locationSearchRadiusLine',
    type: 'line',
    paint: {
        'line-color': 'blue',
        'line-width': 1
    }
}
</script>
