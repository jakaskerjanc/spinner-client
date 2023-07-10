<template>
  <v-dialog
    id="loading-dialog"
    v-model="appStore.loading"
    :scrim="false"
    persistent
    width="auto"
  >
    <v-card color="red">
      <v-card-text>
        Nalagam...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>
