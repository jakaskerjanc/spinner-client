<template>
  <v-bottom-sheet
    :id="mobile ? 'event-popup' : 'event-popup-desktop'"
    :model-value="sheet"
    :scrim="false"
    inset
    persistent
    no-click-animation
    position="bottom"
    offset="50px"
  >
    <event-card
      v-if="selectedEvent"
      :event="selectedEvent"
    />
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
import { computed, ref } from 'vue'
import { useEventsStore, useMapStore } from '@/store'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const mapStore = useMapStore()

const sheet = ref(true)
const selectedEventId = computed(() => mapStore.selectedEventId)

const selectedEvent = computed(() => {
    if (!selectedEventId.value) return null
    const events = useEventsStore().events
    return events.find((event) => event.id === selectedEventId.value)
})
</script>

<style>
/* classes don't work for some reason */
#event-popup {
  margin-bottom: 64px;
}
#event-popup-desktop {
  margin-bottom: 32px;
  width: 40% !important;
}
</style>
