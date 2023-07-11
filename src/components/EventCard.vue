<template>
  <v-card
    ripple
    class="event-card rounded-xl mb-2"
    @click="emit('click')"
  >
    <v-card-item>
      <template #title>
        {{ event.title ?? event.eventType.name }}
      </template>
      <template #subtitle>
        {{ getFormatedDateTime(event.createTime) }}

        <br>
        {{ event.municipality.name }}
      </template>
      <template #append>
        <v-icon
          color="red"
          size="x-large"
          :icon="getIconName(event.eventType.id)"
        />
      </template>
    </v-card-item>
    <v-card-text>
      {{ event.description }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Event } from '@/types'
import { getIconName, getFormatedDateTime } from '@/util'
import { PropType } from 'vue'

defineProps({
    event: {
        type: Object as PropType<Event>,
        required: true
    }
})
const emit = defineEmits(['click'])
</script>
