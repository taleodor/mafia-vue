<template>
    <div>
        <h1>Welcome to Mafia Card Shuffle!</h1>
        <b-container>
            <b-row class="justify-content-md-center">
                <b-col>
                    <b-form @submit="submitRoom">
                        <b-input-group class="mt-3">
                            <b-form-input id="enter-room"
                                          v-model="room"
                                          required
                                          placeholder="Enter room name to join or create" />
                            <b-input-group-append>
                                <b-button variant="info" type="submit">Submit</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </b-col>
            </b-row>
            <b-row class="mt-3 mb-3 justify-content-md-center">
                <b-col>
                    OR
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col>
                    <b-button size="sm" variant="success" @click="generateRoom">Generate new room for me</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-5 mb-3 justify-content-md-center">
                <b-col>
                    Powered by <a href="https://relizahub.com">Reliza Hub</a>
                </b-col>
            </b-row>
            <b-row v-if="version" class="mt-5 mb-3 justify-content-md-center">
                <b-col>
                    Version: <a href="https://relizahub.com">{{version}}</a>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data () {
        return {
            room: '',
            version: null
        }
    },
    created () {
        this.getVersion()
    },
    props: {
        msg: String
    },
    methods: {
        generateRoom () {
            this.room = 'xxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
                return v.toString(16)
            })
            this.submitRoom()
        },
        submitRoom () {
            this.$router.push({ name: 'RoomShuffle', params: { room: this.room } })
        },
        getVersion () {
            var versionUri
            if (window.location.host === 'mafia.brolia.com') {
                versionUri = 'https://app.relizahub.com/api/public/v1/instance/bundleVersion/94a8e3c3753ff9a4e8f77204bef8e1d3b388a90e749830921944804aa50ec94506081fe9c4547d8137316064b148c80fc250f4d9dfa38e47bfa756cf053f626274daab021464ee555629909f9c852a078fbcd5d1a4df863d5435c4a6eef4deff8b8b332a3547a865a84d14603f79f40c'
            } else if (window.location.host === 'mafia-test.rhythm.relizahub.com') {
                versionUri = 'https://rhythm.relizahub.com/api/public/v1/instance/bundleVersion/6356d4959840216d6ef9309731289ab5862b77be68deebb9876858ea2e7b95be7e2a8eaa667ede98b55b9c91ec00429b13bcff165d9c7407b1390954328586df5277a3a7c4bf73b93333ec92e5e9cf850e5402988305b9c94c7e89fcdcd63608050d2275ccc9fe9a0b7a53868afcf3c9'
            } else if (window.location.host === 'mafia.rhythm.relizahub.com') {
                versionUri = 'https://rhythm.relizahub.com/api/public/v1/instance/bundleVersion/dfbe20ca60b9a2e48d2f4cdfb757a7c4b4d9a0410724fbe3110e5c9f301cf7cbfa01ded6d2f9fa87d110de035a19aa0135c88982b2ff6825c35add653c2281c8a5b1a380560603f385e516873cc9caa1d4c45573430dd61f6ca9c3d3e0c3af033e2a6edd3873a7498a0411d48b1f2532'
            }
            if (versionUri) {
                axios.get(versionUri).then(response => {
                    this.version = response.data
                })
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
