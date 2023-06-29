<template>
    <div class="wrapper">
        <v-expansion-panels>
            <v-expansion-panel
                v-for="event in events"
                :key="event.id"
                :title="getEventTitle(event)"
                :text="event.description"
            />
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { useEventsStore } from '@/store'
import { computed } from 'vue'

const events = computed(() => useEventsStore().events)

const getEventTitle = (event: any) => (new Date(Date.parse(event.createTime))).toLocaleString() + ' ' + (event.title ?? event.eventType.name)
</script>

<style scoped>
.wrapper {
    padding: 16px;
    overflow-y: scroll;
    max-height: calc(100vh - 120px);
}
</style>
