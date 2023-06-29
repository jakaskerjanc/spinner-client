import { defineStore } from 'pinia'
import axios from '@/axios'
import { useAppStore } from './app'

type State = {
    municipalities: any[]
    eventTypes: any[]
    events: any[]
}

export const useEventsStore = defineStore('events', {
    state: (): State => ({
        municipalities: [],
        eventTypes: [],
        events: []
    }),
    actions: {
        async fetchMunicipalities () {
            try {
                this.municipalities = (await axios.get('/municipalities')).data
            } catch (error) {
                console.error(error)
            }
        },
        async fetchEventTypes () {
            try {
                this.eventTypes = (await axios.get('/eventTypes')).data
            } catch (error) {
                console.error(error)
            }
        },
        async fetchEvents (query: any = {}) {
            try {
                this.events = (await axios.get('/eventsArchive', { params: query })).data
            } catch (error) {
                console.error(error)
            }
        },
        async fetchAll () {
            const appStore = useAppStore()
            appStore.loading = true
            await Promise.all([
                this.fetchMunicipalities(),
                this.fetchEventTypes(),
                this.fetchEvents()
            ])
            appStore.loading = false
        }
    }
})
