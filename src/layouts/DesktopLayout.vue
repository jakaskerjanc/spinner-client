<template>
  <v-resize-drawer
    v-model="leftDrawer"
    location="left"
    :floating="drawerOptions.floating"
    :theme="drawerOptions.theme"
    :width="drawerOptions.width"
    :save-width="drawerOptions.saveWidth"
    @handle:dblclick="handleLeftDrawerEvent"
    @handle:drag="handleLeftDrawerEvent"
  >
    <search-tab />
  </v-resize-drawer>
  <v-resize-drawer
    v-model="rightDrawer"
    location="right"
    :floating="drawerOptions.floating"
    :theme="drawerOptions.theme"
    :width="drawerOptions.width"
    :save-width="drawerOptions.saveWidth"
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
import MapTab from '@/components/MapTab.vue'
import { ref, computed } from 'vue'
import { useDisplay, useTheme } from 'vuetify'

const currentTheme = computed(() => useTheme().current.value.dark === true ? 'darkTheme' : 'lightTheme')

const leftDrawer = ref(true)
const rightDrawer = ref(true)
const leftDrawerOffset = ref('300px')
const rightDrawerOffset = ref('300px')
const drawerOptions = ref({
    floating: true,
    theme: currentTheme,
    width: '300px',
    saveWidth: false
})
const mainStyles = computed(() => {
    const { mobile } = useDisplay()
    let leftPaddingValue = leftDrawerOffset.value
    let rightPaddingValue = rightDrawerOffset.value

    if (mobile.value) {
        return ''
    }
    if (!leftDrawer.value) {
        leftPaddingValue = '0px'
    }
    if (!rightDrawer.value) {
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
