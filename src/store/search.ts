import { defineStore } from 'pinia'
import { useEventsStore, useMapStore, useAppStore } from '@/store'
import { DateTime } from 'luxon'

type State = {
    description: string
    title: string
    selectedEventTypeIds: number[]
    selectedMunicipalityIds: number[]
    includeOnGoing: boolean
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
        includeOnGoing: false,
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

            // 😅
            const lat = this.isOrderByDistance
                ? mapStore.selectedLocation
                    ? mapStore.selectedLocation[1]
                    : mapStore.userLocation
                        ? mapStore.userLocation[0]
                        : undefined
                : undefined

            const lon = this.isOrderByDistance
                ? mapStore.selectedLocation
                    ? mapStore.selectedLocation[0]
                    : mapStore.userLocation
                        ? mapStore.userLocation[1]
                        : undefined
                : undefined

            const query = {
                description: this.description ? this.description : undefined,
                title: this.title ? this.title : undefined,
                eventTypeId: this.selectedEventTypeIds.length ? this.selectedEventTypeIds : undefined,
                municipalityId: this.selectedMunicipalityIds.length ? this.selectedMunicipalityIds : undefined,
                includeOnGoing: this.includeOnGoing,
                orderBy: this.isOrderByDistance ? 'distance' : 'date',
                distance: this.distance,
                lat,
                lon,
                count: 50,
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
