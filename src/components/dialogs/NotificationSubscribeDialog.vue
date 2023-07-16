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
          v-model="selectedMunicipalityIds"
          clearable
          label="Občina"
          :items="municipalities"
          :disabled="subToAllEvents"
          multiple
        />
        <v-autocomplete
          v-model="selectedEventTypeIds"
          clearable
          label="Tip dogodka"
          :items="eventTypes"
          :disabled="subToAllEvents"
          multiple
        />
        <v-checkbox
          v-model="subToAllEvents"
          label="Obveščaj me o vseh dogodkih"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="onCloseButtonClick"
        >
          Zapri
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          :loading="isLoading"
          @click="onSaveButtonClick"
        >
          Shrani
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from '@/axios'
import { initMessagingAndRequestNotificationPermission } from '@/firebase'
import { useAppStore, useEventsStore } from '@/store'
import { computed, ref } from 'vue'

const appStore = useAppStore()
const eventsStore = useEventsStore()

const municipalities = computed(() => eventsStore.municipalities.map(m => { return { title: m.name, value: m.id } }))
const eventTypes = computed(() => eventsStore.eventTypes.map(m => { return { title: m.name, value: m.id } }))

const isLoading = ref(false)
const nothingSelected = computed(() => !subToAllEvents.value && selectedMunicipalityIds.value.length === 0 && selectedEventTypeIds.value.length === 0)

const subToAllEvents = ref(false)
const selectedMunicipalityIds = ref([])
const selectedEventTypeIds = ref([])

defineProps({
    isOpen: Boolean
})
defineEmits(['update:isOpen'])

function onCloseButtonClick () {
    appStore.isNotificationDialogOpen = false
}

async function onSaveButtonClick () {
    if (nothingSelected.value) {
        appStore.isNotificationDialogOpen = false
        return
    }
    const fcmToken = await initMessagingAndRequestNotificationPermission()
    if (!fcmToken) {
        appStore.isNotificationDialogOpen = false
        return
    }

    await subscribeToNotifications(fcmToken)
    appStore.isNotificationDialogOpen = false
}

async function subscribeToNotifications (fcmToken: string) {
    try {
        isLoading.value = true
        await axios.post('/subscribeToNotifications', {
            gcmToken: fcmToken,
            eventTypeIds: subToAllEvents.value ? [] : selectedEventTypeIds.value,
            municipalityIds: subToAllEvents.value ? [] : selectedMunicipalityIds.value
        })
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}
</script>
