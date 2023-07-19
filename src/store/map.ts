import { defineStore } from 'pinia'

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
        }
    },
    actions: {
        getUserLocation () {
            if (!this.hasUserLocation && this.getUserLocationCb) {
                this.getUserLocationCb()
            }
        },
        setSelectedEventId (eventId: number | null) {
            this.selectedEventId = eventId
        }
    }
})
