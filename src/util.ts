import { Event } from './types'
import { DateTime } from 'luxon'

export function getIconName (eventTypeId: Event['eventType']['id']) {
    switch (eventTypeId) {
    case 1:
        return 'mdi-fire'
    case 2:
        return 'mdi-car'
    case 3:
        return 'mdi-wrench'
    case 4:
        return 'mdi-home-lightning-bolt'
    case 5:
        return 'mdi-wrench'
    case 6:
        return 'mdi-wrench'
    case 7:
        return 'mdi-bomb'
    case 8:
        return 'mdi-wrench'
    case 9:
        return 'mdi-virus'
    case 10:
        return 'mdi-radioactive'
    }
}

export function getFormatedDateTime (dateTime: string) {
    const date = DateTime.fromISO(dateTime)
    return date.toFormat('fff')
}
