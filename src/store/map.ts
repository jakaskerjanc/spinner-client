import { defineStore } from 'pinia'
import { useEventsStore } from './events'
import { Event, LargeEvent } from '@/types'

type State = {
    userLocation: null | { lat: number, lng: number }
    getUserLocationCb: null | (() => void)
    isInSelectMode: boolean
    selectedLocation: null | { lat: number, lng: number }
    selectedEventId: null | number
    selectedLargeEventId: null | number
}

export const useMapStore = defineStore('map', {
    state: (): State => ({
        userLocation: null,
        getUserLocationCb: null,
        isInSelectMode: false,
        selectedLocation: null,
        selectedEventId: null,
        selectedLargeEventId: null
    }),
    getters: {
        hasUserLocation: (state) => state.userLocation !== null,
        hasSelectedLocation: (state) => state.selectedLocation !== null,
        effectiveLocation: (state) => state.selectedLocation || state.userLocation,
        effectiveLocationAsArray (): [number, number] | null {
            const location = this.effectiveLocation
            return location ? [location.lng, location.lat] : null
        },
        selectedEvent (state) {
            const eventsStore = useEventsStore()
            return eventsStore.events.find((event) => event.id === state.selectedEventId)
        },
        selectedLargeEvent (state) {
            const eventsStore = useEventsStore()
            return eventsStore.largeEvents.find((event) => event.id === state.selectedLargeEventId)
        },
        effectivelySelectedEvent (): Event | LargeEvent | undefined {
            return this.selectedLargeEventId ? this.selectedLargeEvent : this.selectedEvent
        }
    },
    actions: {
        getUserLocation () {
            if (!this.hasUserLocation && this.getUserLocationCb) {
                this.getUserLocationCb()
            }
        },
        setSelectedEventId (eventId: number | null) {
            this.selectedLargeEventId = null
            this.selectedEventId = eventId
        },
        setSelectedLargeEventId (eventId: number | null) {
            this.selectedEventId = null
            this.selectedLargeEventId = eventId
        }
    }
})
