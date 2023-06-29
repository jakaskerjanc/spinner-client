import { defineStore } from 'pinia'
import { useEventsStore } from './events'
import { useAppStore } from './app'

export const useSearchStore = defineStore('search', {
    state: () => ({
        description: '',
        title: '',
        selectedEventTypeIds: [],
        selectedMunicipalityIds: [],
        isOnGoing: false,
        order: 'desc',
        orderBy: 'date',
        startDate: null,
        endDate: null
    }),
    actions: {
        async search () {
            const eventsStore = useEventsStore()
            const query = {
                description: this.description ? this.description : undefined,
                title: this.title ? this.title : undefined,
                eventTypeId: this.selectedEventTypeIds.length ? this.selectedEventTypeIds : undefined,
                municipalityId: this.selectedMunicipalityIds.length ? this.selectedMunicipalityIds : undefined,
                onGoing: this.isOnGoing,
                order: this.order,
                orderBy: this.orderBy
                // createTimeFrom: this.startDate ? this.startDate : undefined,
                // createTimeTo: this.endDate ? this.endDate : undefined
            }
            useAppStore().loading = true
            await eventsStore.fetchEvents(query)
            useAppStore().loading = false
        }
    }
})
