import { defineStore } from 'pinia'
import { useEventsStore, useMapStore, useAppStore } from '@/store'
import { DateTime } from 'luxon'

type State = {
    description: string
    title: string
    selectedEventTypeIds: number[]
    selectedMunicipalityIds: number[]
    isOnGoing: boolean
    // order: 'asc' | 'desc'
    // orderBy: 'date' | 'distance'
    distance: number
    startDate: string
    endDate: string
    isOrderByDistance: boolean
    includeWithoutDescription: boolean
}

export const useSearchStore = defineStore('search', {
    state: (): State => ({
        description: '',
        title: '',
        selectedEventTypeIds: [],
        selectedMunicipalityIds: [],
        isOnGoing: false,
        // order: 'desc',
        // orderBy: 'date',
        distance: 1,
        startDate: DateTime.now().minus({ day: 1 }).toISODate(),
        endDate: DateTime.now().toISODate(),
        isOrderByDistance: false,
        includeWithoutDescription: false
    }),
    actions: {
        async search () {
            const eventsStore = useEventsStore()
            const mapStore = useMapStore()

            const query = {
                description: this.description ? this.description : undefined,
                title: this.title ? this.title : undefined,
                eventTypeId: this.selectedEventTypeIds.length ? this.selectedEventTypeIds : undefined,
                municipalityId: this.selectedMunicipalityIds.length ? this.selectedMunicipalityIds : undefined,
                onGoing: this.isOnGoing,
                // order: this.order,
                orderBy: this.isOrderByDistance ? 'distance' : 'date',
                distance: this.distance,
                lat: this.isOrderByDistance && mapStore.userLocation ? mapStore.userLocation[0] : undefined,
                lon: this.isOrderByDistance && mapStore.userLocation ? mapStore.userLocation[1] : undefined,
                count: 150,
                createTimeFrom: this.startDate ? this.startDate : undefined,
                createTimeTo: this.endDate ? this.endDate : undefined,
                includeWithoutDescription: this.includeWithoutDescription
            }
            useAppStore().loading = true
            await eventsStore.fetchEvents(query)
            useAppStore().loading = false
        }
    }
})
