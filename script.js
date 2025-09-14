// 🔥 Firebase Config (Replace with your own)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🔹 Render Recaptcha
window.onload = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: () => console.log('Recaptcha resolved'),
  });
};

// 🔹 Send OTP
function sendOTP() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP Sent!");
    })
    .catch((error) => alert(error.message));
}

// 🔹 Verify OTP
function verifyOTP() {
  const code = document.getElementById("otp").value;
  window.confirmationResult.confirm(code)
    .then((result) => {
      document.getElementById("result").innerText = `🎉 Hello, ${result.user.phoneNumber}`;
    })
    .catch((error) => alert(error.message));
}
