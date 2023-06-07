<template>
    <div class="register-container">
      <h2>Rejestracja</h2>
   
        <p><input type="email"  placeholder="Email" v-model="email"/></p>
      <p> <input type="password"  placeholder="Hasło" v-model="password"/></p> 
        
       <p> <button @click="register">Zarejestruj</button></p>
      
   
      <p v-if="error" class="error-message">{{ error }}</p>
      <div class="login-link">
        <router-link to="/login">Logowanie</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";

  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  
  const router = useRouter();
  const error = ref("");
  
  const register = () => {
    const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Rejestracja zakończona pomyślnie");
      console.log(auth.currentUser);
      router.push("/authorized");
    })
    .catch((error) => {
      console.error(error.code);
      
    });
  };
  

  </script>
  
  <style scoped>
  .register-container {
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
  
  .login-link {
    margin-top: 10px;
    text-align: center;
  }
  
  .login-link a {
    color: #42b883;
    text-decoration: none;
  }
  </style>