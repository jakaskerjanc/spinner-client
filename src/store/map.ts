import { defineStore } from 'pinia'

type State = {
    userLocation: null | [number, number]
    getUserLocationCb: null | (() => void)
}

export const useMapStore = defineStore('map', {
    state: (): State => ({
        userLocation: null,
        getUserLocationCb: null
    }),
    getters: {
        hasUserLocation: (state) => state.userLocation !== null
    },
    actions: {
        getUserLocation () {
            if (!this.hasUserLocation && this.getUserLocationCb) {
                this.getUserLocationCb()
            }
        }
    }
})
