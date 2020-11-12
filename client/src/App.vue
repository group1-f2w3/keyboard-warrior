<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
<<<<<<< HEAD
      <router-link to="/typing">Typing</router-link>
      <router-link to="/about">About</router-link> |
      <router-link to="/fight">Fight</router-link>
=======
      <router-link to="/about">About</router-link> |
      <router-link to="/welcome">Welcome</router-link> |
      <router-link to="/arena">Arena</router-link> |
      <router-link to="/result">Result</router-link> 
>>>>>>> b6c2ea1ef444fba4829c7e45342afe6066220de9
    </div>
    <router-view />
  </div>
</template>

<style>
<<<<<<< HEAD
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
=======
@import './assets/css/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
>>>>>>> b6c2ea1ef444fba4829c7e45342afe6066220de9

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

<<<<<<< HEAD
  #nav a.router-link-exact-active {
    color: #42b983;
  }
=======
#nav a.router-link-exact-active {
  color: #42b983;
}
@import './assets/css/style.css';
>>>>>>> b6c2ea1ef444fba4829c7e45342afe6066220de9
</style>
