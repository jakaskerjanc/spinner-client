<template>
  <MapboxMarker
    :key="event.id"
    :lng-lat="[event.lon, event.lat]"
  >
    <v-btn
      :icon="getIconName(event.eventType.id)"
      :color="getColor(event)"
    />
  </MapboxMarker>
</template>

<script setup lang="ts">
// @ts-ignore-next-line
import { MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { Event } from '@/types'

defineProps<{event: Event}>()

function getIconName (eventTypeId: Event['eventType']['id']) {
    switch (eventTypeId) {
    case 1:
        return 'mdi-fire'
    case 2:
        return 'mdi-car'
    case 3:
        return 'mdi-wrench'
    case 4:
        return 'mdi-home-lightning-bolt'
    case 5:
        return 'mdi-wrench'
    case 6:
        return 'mdi-wrench'
    case 7:
        return 'mdi-bomb'
    case 8:
        return 'mdi-wrench'
    case 9:
        return 'mdi-virus'
    case 10:
        return 'mdi-radioactive'
    }
}

const currentTime = new Date()
function getColor (event: Event) {
    if (event.onGoing) {
        return '#5552FE'
    }

    const createTimeDate = new Date(event.createTime)
    const diff = currentTime.getTime() - createTimeDate.getTime()
    const ratio = (diff % 86400000) / 86400000

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
</script>
