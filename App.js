import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import getpushtoken from './api/getpushtoken';
const firebaseConfig = {
  type: "service_account",
  project_id: "holyspring-85888",
  private_key_id: "49959f5057a3bbda5e4d561cf124057a87ef4561",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBNpq3dAivZNVQ\nMDilG0MUvdSjpUfipnOivyPeQwmPb+IZKC8SWZtOe+i6KTCJWgzQA7zZ1tJiiu/o\nr6Yj8kKPeAtFq0PPRw/TN4raLvy2ZPbIBlCcxNyclHgGbVhFzzDYlGDGr9tLpggL\nGNpd9qN3l1avO8LzycNq30Glj6onOtFmpRyaBveDbSTPZy0Osf8uJQ3MJyPpWyw4\nPpf1izhESUAURMtjVHHGBDM9/ZuZ7yiFu5uSSFjypLUCa4BIzgiFH/KGn2qRdsur\nhIeCK/WC+OxxmlYMswSLmbUZS8BCYxGDWiWCWTG4E5kFNJnKwgY0rRGjMJtR3RbS\nYVvnSuGpAgMBAAECggEAGxYwSycNj1E1L8sNgJAO2m82dUQBjOka7aZFkq5BPoZH\n4zulRbmhh+I1ITa5uDe982zit9i29oZV1dVyFuNVU3mtKDTiCm1YREXVcHsFMKjS\nM/6L+ekF/emOiLrMP5UpWuOKTFsbr5effwwak5u1FQShbBWWYh5XXWSJISW/4UR4\n9j54hp4O3cj4wYntUnxQVfHPSUWtglHA4k2qjC34hA5XAdoHzPXFTHORWifWLjYJ\ndAx8gObeo4sacW7d95GmKQsNUdWCFrvQ2DN0cyZjgejrgaJDHwimA8NZcuUYQ4xu\ntFdqwlBS6fXx9jovOZXU1Y+23thJwV1jQA8OUtqa5QKBgQDjiusznAgA6VxBV/Wg\nqifcp5ioUzPozFZYxW6xZI00p7hLTLvcZSfC07KuYqJT5rg/+zVbcusnKwYcdxV8\n4Ei1uWPPpRfirQjZABLL4ONlbJQ8ZDGG2r0OOdOmvE/+EfTuWkQCPQs2oVvWKqOn\nFtySueDpqppZENg/OWZ9jV4eawKBgQDZYJXqvr+NGx2IYqXONpf4KnvK6WOvP42L\n1B1PN2pYqyuy28WhPE2qnxzVrYZ1g/h5ynRA/nmLW8bP/wQvkaht+wXE61n3iy0f\nF8Tb+y9IG56mkDm1WSSo8yOnHPKIBS9yZE+87TBWSYHr/nWjeYx2T5DlqxgkNVJS\nkwlYzeddOwKBgQC4FmLU/S4odqORpfTtx9u6E8lYnP/JHs/Yv9ofIEdxSyO5n9n4\no8n4QEc1+Ex17powAS+Yza9bn94w11MGFXods2AB1QIu/GjFDt8mHMo7+w0ukqzS\n+lKrmLMYGQ/qcGKlF1ggK3zP9NmUuihufPt0pXdF9CUtW4hoFitJ9j4oAwKBgHs0\ndCQl0vnOKZH4n5NefAnrQljCqX5VngtnwOj6Nqtk8RKh38TAIiEXp8cwX+pRT07w\nQa3ozcj/zpJrLtsrSnRzd1SiNE7KsltSJICuQKE1DlnHmv2/NbkQfd+k143iqn7C\nfjNNmDz/0sSIZ/Ks3MDd3fleXQOAuVUWA5EyuvSrAoGADPZqHt1vTsRwLTpViTMq\nENu2fvyzPe+lGycVoYaDRcsBODSW9agB2OaBNyJXfRAMIMcB80NUkF+zAk25wxUV\nkqsL+SmulNhXNRZYQ/K/aLvXO7nm+AtJLxpMgqS7s5Md9feGVs+nbGWdaF4o0N5R\nBUBsbgnYyeZwXsCBXfcfgPM=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-n4da0@holyspring-85888.iam.gserviceaccount.com",
  client_id: "114322900662458410230",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n4da0%40holyspring-85888.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

const app = initializeApp(firebaseConfig);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    const send = async () => {
      await getpushtoken(expoPushToken)
    }
    if (expoPushToken) {
      send()
    }
    console.log(expoPushToken)
  }, [expoPushToken])
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    null
  );
}
