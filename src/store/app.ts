import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Ref } from 'vue'

const STORE_NAME = 'app'

type State = {
    persistentSettings: Ref<{
        tab: string
        leftDrawerOpen: boolean
        rightDrawerOpen: boolean
        theme: string
    }>
    isNotificationDialogOpen: boolean
    loading: boolean
}

export const useAppStore = defineStore(STORE_NAME, {
    state: (): State => ({
        persistentSettings: useStorage(STORE_NAME, {
            tab: 'map',
            leftDrawerOpen: true,
            rightDrawerOpen: true,
            theme: 'darkTheme'
        }),
        loading: false,
        isNotificationDialogOpen: false
    }),
    actions: {
        toggleLeftDrawer () {
            this.persistentSettings.leftDrawerOpen = !this.persistentSettings.leftDrawerOpen
        },
        toggleRightDrawer () {
            this.persistentSettings.rightDrawerOpen = !this.persistentSettings.rightDrawerOpen
        },
        toggleTheme () {
            this.persistentSettings.theme = this.persistentSettings.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
        }
    }
})
