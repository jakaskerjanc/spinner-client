<template>
    <div class="wrapper">
        <v-text-field clearable label="Naslov" v-model="searchStore.title" />
        <v-text-field clearable label="Opis" v-model="searchStore.description" />
        <v-autocomplete
            clearable
            label="Občina"
            v-model="searchStore.selectedMunicipalityIds"
            :items="municipalities"
            multiple
        />
        <v-autocomplete
            clearable
            label="Tip dogodka"
            v-model="searchStore.selectedEventTypeIds"
            :items="eventTypes"
            multiple
        />
        <v-switch label="V trajanju" v-model="searchStore.isOnGoing"></v-switch>
        <v-radio-group v-model="searchStore.order">
            <v-radio label="ASC" value="asc"/>
            <v-radio label="DESC" value="desc"/>
        </v-radio-group>
        <v-radio-group v-model="searchStore.orderBy">
            <v-radio label="Datum" value="date"/>
            <v-radio label="Lokacija" value="location"/>
        </v-radio-group>
        <v-text-field type="date" v-model="searchStore.startDate" />
        <v-text-field type="date" v-model="searchStore.endDate" />
        <v-btn @click="searchStore.search">Išči</v-btn>
    </div>
</template>

<script setup lang="ts">
import { useEventsStore, useSearchStore } from '@/store'
import { computed } from 'vue'

const eventsStore = useEventsStore()
const municipalities = computed(() => eventsStore.municipalities.map(m => { return { title: m.name, value: m.id } }))
const eventTypes = computed(() => eventsStore.eventTypes.map(m => { return { title: m.name, value: m.id } }))

const searchStore = useSearchStore()
</script>

<style scoped>
.wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    max-height: calc(100vh - 120px);
}

.v-input {
    max-width: 500px;
    width: 50%;
    min-width: 200px;
}

</style>
