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
      v-if="effectivelySelectedEvent"
      :event="effectivelySelectedEvent"
      @click="closeEventPopup"
    />
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
import { computed, ref, watch, nextTick } from 'vue'
import { useMapStore } from '@/store'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const mapStore = useMapStore()

const sheet = ref(true)
const effectivelySelectedEvent = computed(() => mapStore.effectivelySelectedEvent)

watch(effectivelySelectedEvent, async (id) => {
    await nextTick()
    if (id) {
        sheet.value = true
    }
})

function closeEventPopup () {
    sheet.value = false
    mapStore.setSelectedEventId(null)
    mapStore.setSelectedLargeEventId(null)
}
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
