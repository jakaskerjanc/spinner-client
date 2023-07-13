/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: 'AIzaSyBjClZq6F9DeJ6ZARJTb7JiAeZz5t_dZTY',
    authDomain: 'spinner-client.firebaseapp.com',
    projectId: 'spinner-client',
    storageBucket: 'spinner-client.appspot.com',
    messagingSenderId: '20902092543',
    appId: '1:20902092543:web:b2690aa4937f44aac476ca'
})

const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)

    const notificationTitle = payload?.notification?.title
    const notificationOptions = {
        body: payload?.notification?.body
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
})
