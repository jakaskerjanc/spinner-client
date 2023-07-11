<template>
  <div
    v-if="events.length"
    class="h-100 pa-4"
  >
    <event-card
      v-for="event in events"
      :key="event.id"
      :event="event"
      @click="useMapStore().setSelectedEventId(event.id)"
    />
  </div>
  <div
    v-else
    class="h-100 pa-4 d-flex justify-center align-center"
  >
    Ni rezultatov
  </div>
</template>

<script setup lang="ts">
import { useEventsStore, useMapStore } from '@/store'
import { computed } from 'vue'
import EventCard from '@/components/EventCard.vue'

const events = computed(() => useEventsStore().events)
</script>
