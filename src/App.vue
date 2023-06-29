<template>
    <v-app>
        <v-snackbar v-model="isLoading" location="top" attach=".v-window" >
            Loading...
        </v-snackbar>
        <v-layout class="rounded rounded-md">
            <v-app-bar elevation="2" title="Spinner" />
            <v-main class="main">
                <v-window v-model="activeTab">
                    <v-window-item value="map">
                        <map-tab />
                    </v-window-item>
                    <v-window-item value="list">
                        <list-tab />
                    </v-window-item>
                    <v-window-item value="search">
                        <search-tab />
                    </v-window-item>
                </v-window>
            </v-main>
            <bottom-navigation v-model:active-tab="activeTab" />
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
import BottomNavigation from './components/BottomNavigation.vue'
import SearchTab from './components/SearchTab.vue'
import ListTab from './components/ListTab.vue'
import MapTab from './components/MapTab.vue'
import { computed, ref } from 'vue'
import { useEventsStore, useAppStore } from './store'

const activeTab = ref('list')

const eventsStore = useEventsStore()
eventsStore.fetchAll()

const isLoading = computed(() => useAppStore().loading)
</script>
