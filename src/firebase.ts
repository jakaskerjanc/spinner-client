
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

let firebaseApp: FirebaseApp

export function initFirebase () {
    firebaseApp = initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: 'spinner-client.firebaseapp.com',
        projectId: 'spinner-client',
        storageBucket: 'spinner-client.appspot.com',
        messagingSenderId: '20902092543',
        appId: '1:20902092543:web:b2690aa4937f44aac476ca'
    })
}

export async function initMessagingAndRequestNotificationPermission () {
    const serviceWorkerRegistration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}firebase-messaging-sw.js`)

    const messaging = getMessaging(firebaseApp)
    try {
        const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY, serviceWorkerRegistration })
        console.log(token)
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload)
        })
        return token
    } catch (e) {
        console.error(e)
    }
}
