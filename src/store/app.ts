import { defineStore } from 'pinia'

type State = {
    loading: boolean
    tab: string
}

export const useAppStore = defineStore('app', {
    state: (): State => ({
        loading: false,
        tab: 'map'
    })
})
