<template>
  <v-bottom-sheet
    :id="mobile ? 'event-popup' : 'event-popup-desktop'"
    v-model="sheet"
    :scrim="false"
    inset
    persistent
    no-click-animation
    position="bottom"
    offset="50px"
  >
    <v-card
      v-if="selectedEvent"
      class="rounded-xl"
    >
      <v-card-item>
        <div class="d-flex align-center justify-space-between">
          <div>
            <v-card-title style="text-wrap: wrap;">
              {{ selectedEvent.title ?? selectedEvent.eventType.name }}
            </v-card-title>
            <v-card-subtitle> {{ getFormatedDateTime(selectedEvent.createTime) }}</v-card-subtitle>
          </div>
          <v-icon
            size="x-large"
            color="red"
            :icon="getIconName(selectedEvent.eventType.id)"
          />
        </div>
      </v-card-item>

      <v-card-text>
        {{ selectedEvent.description }}
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
import { computed, ref } from 'vue'
import { useEventsStore, useMapStore } from '@/store'
import { getIconName, getFormatedDateTime } from '@/util'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const sheet = ref(true)
const selectedEvent = computed(() => {
    if (!useMapStore().selectedEventId) return null
    const events = useEventsStore().events
    return events.find((event) => event.id === useMapStore().selectedEventId)
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
