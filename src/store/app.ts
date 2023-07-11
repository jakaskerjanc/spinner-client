import { defineStore } from 'pinia'

type State = {
    loading: boolean
    tab: string
    leftDrawerOpen: boolean
    rightDrawerOpen: boolean
}

export const useAppStore = defineStore('app', {
    state: (): State => ({
        loading: false,
        tab: 'map',
        leftDrawerOpen: true,
        rightDrawerOpen: true
    }),
    actions: {
        toggleLeftDrawer () {
            this.leftDrawerOpen = !this.leftDrawerOpen
        },
        toggleRightDrawer () {
            this.rightDrawerOpen = !this.rightDrawerOpen
        }
    }
})
