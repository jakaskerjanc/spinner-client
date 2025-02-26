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
    count: number | null
    includeLargeEvents: boolean
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
        includeWithoutDescription: false,
        count: null,
        includeLargeEvents: false
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
                includeOnGoing: this.includeOnGoing,
                orderBy: this.isOrderByDistance ? 'distance' : 'date',
                distance: this.distance,
                lat: this.isOrderByDistance && mapStore.effectiveLocation ? mapStore.effectiveLocation.lat : undefined,
                lon: this.isOrderByDistance && mapStore.effectiveLocation ? mapStore.effectiveLocation.lng : undefined,
                count: this.count,
                createTimeFrom: this.startDate ? this.startDate : undefined,
                createTimeTo: this.endDate ? this.endDate : undefined,
                includeWithoutDescription: this.includeWithoutDescription
            }

            useAppStore().loading = true
            if (this.includeLargeEvents) {
                await Promise.all([
                    eventsStore.fetchEvents(query),
                    eventsStore.fetchLargeEvents(query)
                ])
            } else {
                await eventsStore.fetchEvents(query)
                eventsStore.largeEvents = []
            }
            useAppStore().loading = false
        }
    }
})
