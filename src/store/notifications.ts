import axios from '@/axios'
import { defineStore } from 'pinia'

type State = {
    subscribeToAll: boolean,
    selectedMunicipalityIds: number[],
    selectedEventTypeIds: number[],
    loading: boolean
    fcmToken: string | null
}

export const useNotificationsStore = defineStore('notifications', {
    state: (): State => ({
        subscribeToAll: false,
        selectedMunicipalityIds: [],
        selectedEventTypeIds: [],
        loading: false,
        fcmToken: null
    }),
    getters: {
        effectiveSelectedMunicipalityIds (state) {
            return state.subscribeToAll ? [] : state.selectedMunicipalityIds
        },
        effectiveSelectedEventTypeIds (state) {
            return state.subscribeToAll ? [] : state.selectedEventTypeIds
        }
    },
    actions: {
        async subscribeToNotifications () {
            try {
                this.loading = true
                await axios.post('/notifications', {
                    gcmToken: this.fcmToken,
                    eventTypeIds: this.effectiveSelectedEventTypeIds,
                    municipalityIds: this.effectiveSelectedMunicipalityIds,
                    subscribeToAll: this.subscribeToAll
                })
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },
        async loadSubscriptions () {
            try {
                this.loading = true
                if (!this.fcmToken) {
                    throw new Error('No fcmToken')
                }
                // TODO: Type this response
                const response = (await axios.get('/notifications', { params: { gcmToken: this.fcmToken } })).data

                if (response[this.fcmToken] === 'notSubscribed') {
                    this.subscribeToAll = false
                    this.selectedMunicipalityIds = []
                    this.selectedEventTypeIds = []
                } else if (response[this.fcmToken] === 'subscribedToAll') {
                    this.subscribeToAll = true
                    this.selectedMunicipalityIds = []
                    this.selectedEventTypeIds = []
                } else {
                    this.subscribeToAll = false
                    this.selectedMunicipalityIds = response[this.fcmToken].municipality.map((m: any) => m.id)
                    this.selectedEventTypeIds = response[this.fcmToken].eventType.map((m: any) => m.id)
                }
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        }
    }
})
