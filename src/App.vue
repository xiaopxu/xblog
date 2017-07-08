<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
html {
    /*max-width: 960px;*/
    margin: 0 auto;
    height: 100%;
}

a {
    text-decoration: none;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    /*max-width: 960px;*/
    margin: 0 auto;
    height: 100%;
    width: 100%;
    min-width: 690px;
}
</style>
