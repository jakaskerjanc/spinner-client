<template>
  <v-app-bar
    elevation="2"
    rounded
  >
    <div class="d-flex align-center justify-space-between w-100 px-2">
      <div style="padding-right: 144px;">
        <v-btn
          v-show="showDrawerToggle"
          icon="mdi-menu"
          @click="appStore.toggleLeftDrawer"
        />
      </div>
      <div class="text-h5">
        Spinner
      </div>
      <div>
        <v-btn
          icon
          @click="subscribeToNotifications"
        >
          <v-badge
            :model-value="!hasNotificationPermission"
            color="red"
            dot
            location="top end"
          >
            <v-icon icon="mdi-bell" />
          </v-badge>
        </v-btn>
        <v-btn
          icon
          @click="mapStore.getUserLocation()"
        >
          <v-badge
            :color="locationBadgeColor"
            dot
            location="top end"
          >
            <v-icon :icon="locationIcon" />
          </v-badge>
        </v-btn>
        <v-btn
          icon="mdi-theme-light-dark"
          @click="appStore.toggleTheme"
        />
        <v-btn
          v-if="showDrawerToggle"
          icon="mdi-menu"
          @click="appStore.toggleRightDrawer"
        />
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useMapStore, useAppStore } from '@/store'
import { computed } from 'vue'
import { usePermission } from '@vueuse/core'

const mapStore = useMapStore()
const appStore = useAppStore()

const showDrawerToggle = computed(() => !useDisplay().mobile.value)

const hasUserLocation = computed(() => mapStore.hasUserLocation)
const locationIcon = computed(() => hasUserLocation.value ? 'mdi-map-marker' : 'mdi-map-marker-alert')
const locationBadgeColor = computed(() => hasUserLocation.value ? 'green' : 'red')

const notificationPermission = usePermission('notifications')
const hasNotificationPermission = computed(() => notificationPermission.value === 'granted')

function subscribeToNotifications () {
    appStore.isNotificationDialogOpen = true
}
</script>
