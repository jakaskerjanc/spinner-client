/// <reference types="vite/client" />

import { Settings } from 'luxon'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

Settings.throwOnInvalid = true

declare module 'luxon' {
  interface TSSettings {
    throwOnInvalid: true;
  }
}
