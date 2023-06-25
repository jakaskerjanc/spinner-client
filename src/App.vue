<template>
    <v-app>
        <v-layout class="rounded rounded-md">
            <v-app-bar elevation="2" title="Spinner" />
            <v-main>
                <v-window v-model="activeTab">
                    <v-window-item value="map">
                        Map
                    </v-window-item>
                    <v-window-item value="list">
                        List
                    </v-window-item>
                    <v-window-item value="search">
                        Search
                    </v-window-item>
                </v-window>
            </v-main>
            <bottom-navigation v-model:active-tab="activeTab" />
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
import BottomNavigation from './components/BottomNavigation.vue'
import { ref } from 'vue'

const activeTab = ref('search')
</script>
