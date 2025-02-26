import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { ThemeDefinition, createVuetify } from 'vuetify'

const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        red: '#FE5252'
    }
}

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#0E1015',
        surface: '#15191E',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        red: '#FE5252'
    }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: 'darkTheme',
        themes: {
            lightTheme,
            darkTheme
        }
    }
})
