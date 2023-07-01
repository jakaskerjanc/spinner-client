<template>
  <v-bottom-navigation
    :value="activeTab"
    bg-color="red"
    @update:model-value="$emit('update:activeTab', $event)"
  >
    <v-btn value="map">
      <v-icon>mdi-map</v-icon>
      <span>Map</span>
    </v-btn>
    <v-btn value="list">
      <v-icon>mdi-list-box</v-icon>
      <span>List</span>
    </v-btn>
    <v-btn value="search">
      <v-icon>mdi-magnify</v-icon>
      <span>Search</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
defineProps<{
    activeTab: string
}>()
defineEmits(['update:activeTab'])
</script>
