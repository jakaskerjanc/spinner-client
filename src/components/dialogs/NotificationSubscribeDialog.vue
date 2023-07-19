<template>
  <v-dialog
    id="loading-dialog"
    v-model="appStore.isNotificationDialogOpen"
    :scrim="false"
    persistent
    max-width="500px"
    width="80%"
    min-width="200px"
  >
    <v-card class="pa-3">
      <v-card-title>
        <span class="text-h5">Naročilo na obvestila</span>
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="notificationStore.selectedMunicipalityIds"
          clearable
          label="Občina"
          :items="municipalities"
          :disabled="notificationStore.subscribeToAll"
          multiple
        />
        <v-autocomplete
          v-model="notificationStore.selectedEventTypeIds"
          clearable
          label="Tip dogodka"
          :items="eventTypes"
          :disabled="notificationStore.subscribeToAll"
          multiple
        />
        <v-checkbox
          v-model="notificationStore.subscribeToAll"
          label="Obveščaj me o vseh dogodkih"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue-darken-1"
          variant="text"
          :loading="notificationStore.loading"
          @click="onSaveButtonClick"
        >
          Shrani
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { initMessagingAndRequestNotificationPermission } from '@/firebase'
import { useAppStore, useEventsStore, useNotificationsStore } from '@/store'
import { computed, onMounted } from 'vue'

const appStore = useAppStore()
const eventsStore = useEventsStore()
const notificationStore = useNotificationsStore()

const municipalities = computed(() => eventsStore.municipalitiesByTitleAndValue)
const eventTypes = computed(() => eventsStore.eventTypesByTitleAndValue)

defineProps({
    isOpen: Boolean
})
defineEmits(['update:isOpen'])

onMounted(async () => {
    await initMessagingAndRequestNotificationPermission()
    await notificationStore.loadSubscriptions()
})

async function onSaveButtonClick () {
    await notificationStore.subscribeToNotifications()
    appStore.isNotificationDialogOpen = false
}
</script>
