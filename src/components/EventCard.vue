<template>
  <v-card
    ripple
    class="event-card rounded-xl mb-2"
    @click="emit('click')"
  >
    <v-card-item>
      <template #title>
        {{ title }}
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
          :icon="iconName"
        />
      </template>
    </v-card-item>
    <v-card-text>
      {{ event.description }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Event, LargeEvent } from '@/types'
import { getIconName, getFormatedDateTime } from '@/util'
import { PropType, toRefs, computed } from 'vue'

type EventProp = Event | LargeEvent & { lat?: never }

const props = defineProps({
    event: {
        type: Object as PropType<EventProp>,
        required: true
    }
})
const emit = defineEmits(['click'])

const { event } = toRefs(props)

const title = computed(() => typeof event.value.lat !== 'number' ? 'Večji dogodek' : event.value.title ?? event.value.eventType.name)
const iconName = computed(() => typeof event.value.lat !== 'number' ? 'mdi-map-marker-multiple' : getIconName(event.value.eventType.id))
</script>
