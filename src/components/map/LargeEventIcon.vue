<template>
  <MapboxSource
    :id="sourceId"
    :options="municipalityBorder"
  />
  <MapboxLayer
    :id="fillLayerId"
    :options="municipalityFillStyle"
    @mb-click="onClick"
  />
  <MapboxLayer
    v-if="isSelected"
    :id="borderLayerId"
    :options="municipalityBorderStyleSelected"
    @mb-click="onClick"
  />
  <MapboxLayer
    v-else
    :id="borderLayerId"
    :options="municipalityBorderStyle"
    @mb-click="onClick"
  />
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxLayer, MapboxSource } from '@studiometa/vue-mapbox-gl'
import { computed, toRefs, onMounted, ref, getCurrentInstance, watch } from 'vue'
import type { PropType } from 'vue'
import { useMapStore } from '@/store'
import { LargeEvent } from '@/types'
import axios from '@/axios'

const props = defineProps({
    largeEvent: { type: Object as PropType<LargeEvent>, required: true },
    isSelected: { type: Boolean, default: false }
})

const { largeEvent, isSelected } = toRefs(props)

const mapStore = useMapStore()

const sourceId = computed(() => `municipalityBorder-${largeEvent.value.id}`)
const fillLayerId = computed(() => `municipality-fill-layer-${largeEvent.value.id}`)
const borderLayerId = computed(() => `municipality-border-layer-${largeEvent.value.id}`)

const geoJson = ref(null)
onMounted(async () => {
    const response = (await axios.get('/municipalityBorders', {
        params: {
            municipalityId: [largeEvent.value.municipality.id]
        }
    })).data
    geoJson.value = response[0].outlinePolygon
})

const municipalityBorder = computed(() => {
    return {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: geoJson.value
        }
    }
})

const municipalityFillStyle = computed(() => ({
    id: 'layerId',
    source: sourceId.value,
    type: 'fill',
    paint: {
        'fill-color': '#00ff62',
        'fill-opacity': 0.25
    }
}))

const municipalityBorderStyle = computed(() => ({
    id: 'layerId',
    source: sourceId.value,
    type: 'line',
    paint: {
        'line-color': '#00FF62',
        'line-opacity': 0.5,
        'line-width': 1
    }
}))

const municipalityBorderStyleSelected = computed(() => ({
    id: 'layerId',
    source: sourceId.value,
    type: 'line',
    paint: {
        'line-color': '#00FF62',
        'line-opacity': 0.5,
        'line-width': 3.5
    }
}))

function onClick () {
    mapStore.setSelectedLargeEventId(largeEvent.value.id)
}
</script>
