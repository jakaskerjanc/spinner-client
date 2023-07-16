<template>
  <v-app>
    <notification-subscribe-dialog :is-open="false" />
    <loading-dialog />
    <app-bar />
    <mobile-layout v-if="mobile" />
    <desktop-layout v-else />
  </v-app>
</template>

<script setup lang="ts">
import MobileLayout from '@/layouts/MobileLayout.vue'
import DesktopLayout from '@/layouts/DesktopLayout.vue'
import AppBar from '@/components/navigation/AppBar.vue'
import LoadingDialog from '@/components/dialogs/LoadingDialog.vue'
import NotificationSubscribeDialog from '@/components/dialogs/NotificationSubscribeDialog.vue'
import { useEventsStore } from '@/store'
import { onBeforeMount } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const eventsStore = useEventsStore()

onBeforeMount(() => {
    eventsStore.fetchAll()
})
</script>

<style>
#loading-dialog .v-overlay__content {
    position: absolute;
    top: 50px;
}
</style>
