import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyDGUr_zV3_l_BuyvMnUlRXxT738oAlhzQ4",
  authDomain: "fir-project-e3321.firebaseapp.com",
  projectId: "fir-project-e3321",
  storageBucket: "fir-project-e3321.appspot.com",
  messagingSenderId: "570452691290",
  appId: "1:570452691290:web:2cca975898333bd457cb63",
  measurementId: "G-C0X5QDW5H8",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
