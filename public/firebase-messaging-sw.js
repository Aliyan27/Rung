importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// const firebaseConfig = {
//   apiKey: "AIzaSyBsWGrB8d5clK0OSgu3OVqUAd2wxNdofcs",
//   authDomain: "jazz-parho.firebaseapp.com",
//   databaseURL: "https://jazz-parho.firebaseio.com",
//   projectId: "jazz-parho",
//   storageBucket: "jazz-parho.appspot.com",
//   messagingSenderId: "362922500937",
//   appId: "1:362922500937:web:4edaaf3734a6f2490af098",
//   measurementId: "G-ZXLDF48SZ2",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyBliYNSsHpHsc6lLnRxjti4HIg2LkEvdOc",
//   authDomain: "sitaron-ka-haal-jazz.firebaseapp.com",
//   databaseURL: "https://sitaron-ka-haal-jazz.firebaseio.com",
//   projectId: "sitaron-ka-haal-jazz",
//   storageBucket: "sitaron-ka-haal-jazz.appspot.com",
//   messagingSenderId: "459835941414",
//   appId: "1:459835941414:web:641b764aa99b4afcbc3ce7",
//   measurementId: "G-KL4NZCLG3W"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDGUr_zV3_l_BuyvMnUlRXxT738oAlhzQ4",
  authDomain: "fir-project-e3321.firebaseapp.com",
  projectId: "fir-project-e3321",
  storageBucket: "fir-project-e3321.appspot.com",
  messagingSenderId: "570452691290",
  appId: "1:570452691290:web:2cca975898333bd457cb63",
  measurementId: "G-C0X5QDW5H8",
};

firebase.initializeApp(firebaseConfig);
const initMessaging = firebase.messaging();
initMessaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
