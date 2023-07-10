<template>
  <MapboxMarker
    :key="event.id"
    :lng-lat="[event.lon, event.lat]"
  >
    <v-btn
      :size="useMapStore().selectedEventId === event.id ? 'large' : 'default'"
      :icon="getIconName(event.eventType.id)"
      :color="getColor(event)"
      @click="setSelectedEvent(event.id)"
    />
  </MapboxMarker>
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { Event } from '@/types'
import { useMapStore } from '@/store'
import { getIconName } from '@/util'

defineProps<{event: Event}>()

const currentTime = new Date()
function getColor (event: Event) {
    if (event.onGoing) {
        return '#5552FE'
    }

    const createTimeDate = new Date(event.createTime)
    const diff = currentTime.getTime() - createTimeDate.getTime()
    const ratio = diff >= 86400000
        ? 1
        : (diff % 86400000) / 86400000

    return '#' + mixColors(ratio)
}

function mixColors (ratio: number) {
    const hex = (num: number): string => {
        return num.toString(16)
    }

    const colorFrom = { r: 254, g: 82, b: 82 }
    const colorTo = { r: 254, g: 225, b: 82 }

    const r = Math.ceil(colorTo.r * ratio + colorFrom.r * (1 - ratio))
    const g = Math.ceil(colorTo.g * ratio + colorFrom.g * (1 - ratio))
    const b = Math.ceil(colorTo.b * ratio + colorFrom.b * (1 - ratio))

    return hex(r) + hex(g) + hex(b)
}

function setSelectedEvent (id: number) {
    useMapStore().selectedEventId = id
}
</script>
