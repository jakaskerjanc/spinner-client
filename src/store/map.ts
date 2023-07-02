import { defineStore } from 'pinia'

type State = {
    userLocation: null | [number, number]
}

export const useMapStore = defineStore('map', {
    state: (): State => ({
        userLocation: null
    }),
    getters: {
        hasUserLocation: (state) => state.userLocation !== null
    }
})
