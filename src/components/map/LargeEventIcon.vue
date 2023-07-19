<template>
  <MapboxSource
    :id="sourceId"
    :options="municipalityBorder"
  />
  <MapboxLayer
    :id="layerId"
    :options="municipalityBorderStyle"
    @mb-click="onClick"
  />
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxLayer, MapboxSource } from '@studiometa/vue-mapbox-gl'
import { computed, toRefs, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import { useMapStore } from '@/store'
import { LargeEvent } from '@/types'
import axios from '@/axios'

const props = defineProps({
    largeEvent: { type: Object as PropType<LargeEvent>, required: true }
})

const { largeEvent } = toRefs(props)

const mapStore = useMapStore()

const sourceId = computed(() => `municipalityBorder-${largeEvent.value.id}`)
const layerId = computed(() => `municipalityBorderLayer-${largeEvent.value.id}`)

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

const municipalityBorderStyle = computed(() => ({
    id: 'layerId',
    source: sourceId.value,
    type: 'fill',
    paint: {
        'fill-color': '#00ff62',
        'fill-opacity': 0.25,
        'fill-outline-color': 'blue'
    }
})
)

function onClick () {
    mapStore.selectedLargeEventId = largeEvent.value.id
}
</script>
