<template>
    <div id="app">
        <div><router-link to="/"><img id="relizaLogo" src="/logo_svg_no_tag_3.svg" /></router-link></div>
        <span class="giveUsAStar">
            <span class="mb-2"><router-link to="/">Home</router-link></span>
            <span class="ml-3 pb-2"><router-link to="/rules">Rules</router-link></span>
            <github-button href="https://github.com/taleodor/mafia-deployment"
                            class="ml-3"
                            data-icon="octicon-star"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star taleodor/mafia-deployment on GitHub">
                Star
            </github-button>
        </span>
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
#relizaLogo {
    float: left;
    width: 85px;
    margin-left: -20px;
    margin-top: -10px;
}
</style>
