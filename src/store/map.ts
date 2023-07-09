import { defineStore } from 'pinia'

type State = {
    userLocation: null | [number, number]
    getUserLocationCb: null | (() => void)
    isInSelectMode: boolean
    selectedLocation: null | [number, number]
}

export const useMapStore = defineStore('map', {
    state: (): State => ({
        userLocation: null,
        getUserLocationCb: null,
        isInSelectMode: false,
        selectedLocation: null
    }),
    getters: {
        hasUserLocation: (state) => state.userLocation !== null,
        hasSelectedLocation: (state) => state.selectedLocation !== null
    },
    actions: {
        getUserLocation () {
            if (!this.hasUserLocation && this.getUserLocationCb) {
                this.getUserLocationCb()
            }
        }
    }
})
