<template>
    <div class="login-container">
      <h2>Logowanie</h2>
   
        <p><input type="email" id="email" placeholder="Email" v-model="email" /></p>
      <p><input type="password" id="password" placeholder="Hasło" v-model="password" /></p>
        <p><button @click="login">Zaloguj</button></p>
     
      <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      <div class="register-link">
        <router-link to="/register">Rejestracja</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref('');
  const password = ref('');
  
  const router = useRouter();
  const errorMsg = ref();
  
  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Zalogowano pomyślnie");
        console.log(auth.currentUser);
        router.push("/authorized");
      })
      .catch((error) => {
        console.error(error.code);
       
        switch(error.code){
            case "auth/invalid-email":
            errorMsg.value="Niepoprawny email";
            break;
            case "auth/user-not-found":
            errorMsg.value="Konto o podanym mailu nie istnieje";
            break;
            case "auth/wrong-password":
            errorMsg.value="Email lub hasło jest niepoprawne";
            break;
        }
      });
  };
  

  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 200px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 8px;
    background-color: #42b883;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  .register-link {
    margin-top: 10px;
    text-align: center;
  }
  
  .register-link a {
    color: #42b883;
    text-decoration: none;
  }
  </style>