<template>
  <header>
    <router-link to="/">
        <h1><span>Vue</span>Moviess</h1>
    </router-link>
    <button class="login-button">Zaloguj</button>
  </header>
  <router-view />
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;

  &::selection{
    background: transparentize($color: #42B883, $amount: 0.5);
  }
  body{
    background-color: #35495E;
  }
  a{
    text-decoration: none;
  }
  header{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    background-color: #2C3D4E;
    box-shadow: 0px 0px 6px rgba( 0, 0,0,0.1);
  }
  h1{
    color: #FFF;
    font-size:20 px;
    span{
      color: #42B883;
    }
  }
  .login-button {
  margin-left: 5px; /* Dodaj margines po lewej stronie przycisku */
  padding: 8px 16px; /* Dostosuj wewnętrzne odstępy przycisku */
  background-color: #42B883;
  color: #FFF;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
}
</style>
