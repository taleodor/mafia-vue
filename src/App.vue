<template>
    <div id="app">
        <github-button href="https://github.com/taleodor/mafia-deployment"
                        class="giveUsAStar"
                        data-icon="octicon-star"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Star taleodor/mafia-deployment on GitHub">
            Star
        </github-button>
        <router-view class="nofloat viewWrapper removeFloat" :key="$route.fullPath" />
    </div>
</template>

<script>
import GithubButton from 'vue-github-button'

export default {
    name: 'App',
    components: {
        GithubButton
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
        window.document.title = 'Mafia Card Shuffle'
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
  margin-top: 30px;
}
.giveUsAStar {
    float: right;
    margin-right: 10px;
}
.removeFloat {
    clear: both;
}
</style>
