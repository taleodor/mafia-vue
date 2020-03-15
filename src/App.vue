<template>
    <div id="app">
        <router-view class="nofloat viewWrapper" :key="$route.fullPath" />
    </div>
</template>

<script>

export default {
      name: 'App',
      components: {
    
    },
    methods: {
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
                return v.toString(16)
            })
        }
    },
    created () {
        let existingUuid = window.localStorage.getItem('mafiaUuid')
        if (!existingUuid) {
            let uuid = this.uuidv4()
            window.localStorage.setItem('mafiaUuid', uuid)
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
