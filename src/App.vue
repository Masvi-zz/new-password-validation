<template>
    <div id="app">
        <PassValidation msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
import PassValidation from "./components/PassValidation.vue"

export default {
    name: "App",
    components: {
        PassValidation
    }
}
</script>   

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
