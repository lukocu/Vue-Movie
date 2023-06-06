<template>
  <header>
    <div class="header-left">
      <div class="logo-container">
        <router-link to="/" class="vue-movies-link">
          <h1 class="vue-movies">
            <span>Vue</span>Movies
          </h1>
        </router-link>
      </div>
      <router-link to="/authorized" class="auth-service-link">
        <button class="auth-service-button">Ulubione filmy</button>
      </router-link>
    </div>

    <div class="header-right">
      <router-link to="/login" class="login-link" v-if="!isLoggedIn">
        <button class="login-button">Zaloguj</button>
      </router-link>

      <span v-if="isLoggedIn">
        <button @click="handleSignOut" class="logout-button">Wyloguj: {{ user.email }}</button>
      </span>
    </div>
  </header>
  <router-view />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const isLoggedIn = ref(false)
const user = reactive({
  email: ''
})


onAuthStateChanged(getAuth(), function(currentUser) {
  if (currentUser) {
    isLoggedIn.value = true;
    user.email = currentUser.email || '';
  } else {
    isLoggedIn.value = false;
    user.email = '';
  }
})

const router = useRouter()

const handleSignOut = () => {
  signOut(getAuth())
  router.push('/')
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

.auth-service-button {
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #42B883;
  color: #FFF;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.auth-service-button:hover {
  background-color: #3FA975;
}

.auth-service-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.4);
}

::selection {
  background: transparentize($color: #42B883, $amount: 0.5);
}

body {
  background-color: #35495E;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #2C3D4E;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

h1 {
  color: #FFF;
  font-size: 20px;
  cursor: pointer;
}

.vue-movies {
  margin-right: 8px;
}

.vue-movies span {
  color: #42B883;
}

.auth-service-button {
  margin-left: 8px;
}

.login-button {
  margin-left: 40px;
  padding: 8px 16px;
  background-color: #42B883;
  color: #FFF;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.logout-button {
  margin-left: 40px;
  padding: 8px 16px;
  background-color: #42B883;
  color: #FFF;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #3FA975;
}

.logout-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.4);
}
</style>