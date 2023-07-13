<template>
  <v-resize-drawer
    v-model="leftDrawerOpen"
    location="left"
    :floating="drawerOptions.floating"
    :theme="drawerOptions.theme"
    :width="drawerOptions.width"
    :save-width="drawerOptions.saveWidth"
    :min-width="drawerOptions.minWidth"
    @handle:dblclick="handleLeftDrawerEvent"
    @handle:drag="handleLeftDrawerEvent"
  >
    <search-tab />
  </v-resize-drawer>
  <v-resize-drawer
    v-model="rightDrawerOpen"
    location="right"
    :floating="drawerOptions.floating"
    :theme="drawerOptions.theme"
    :width="drawerOptions.width"
    :save-width="drawerOptions.saveWidth"
    :min-width="drawerOptions.minWidth"
    @handle:dblclick="handleRightDrawerEvent"
    @handle:drag="handleRightDrawerEvent"
  >
    <list-tab />
  </v-resize-drawer>
  <v-main
    class="d-flex align-center justify-center"
    :style="mainStyles"
  >
    <map-tab />
  </v-main>
</template>

<script setup lang="ts">
import VResizeDrawer from 'vuetify3-resize-drawer'
import SearchTab from '@/components/SearchTab.vue'
import ListTab from '@/components/ListTab.vue'
import MapTab from '@/components/map/MapTab.vue'
import { ref, computed } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const currentTheme = computed(() => useTheme().current.value.dark === true ? 'darkTheme' : 'lightTheme')

const leftDrawerOpen = computed(() => appStore.leftDrawerOpen)
const rightDrawerOpen = computed(() => appStore.rightDrawerOpen)
const leftDrawerOffset = ref('300px')
const rightDrawerOffset = ref('300px')
const drawerOptions = ref({
    floating: true,
    theme: currentTheme,
    width: '300px',
    saveWidth: false,
    minWidth: '250px'
})
const mainStyles = computed(() => {
    const { mobile } = useDisplay()
    let leftPaddingValue = leftDrawerOffset.value
    let rightPaddingValue = rightDrawerOffset.value

    if (mobile.value) {
        return ''
    }
    if (!leftDrawerOpen.value) {
        leftPaddingValue = '0px'
    }
    if (!rightDrawerOpen.value) {
        rightPaddingValue = '0px'
    }

    return `
      padding-left: ${leftPaddingValue} !important;
      padding-right: ${rightPaddingValue} !important;
    `
})

function handleLeftDrawerEvent (val: any) {
    leftDrawerOffset.value = val.offsetWidth
}

function handleRightDrawerEvent (val: any) {
    rightDrawerOffset.value = val.offsetWidth
}
</script>
