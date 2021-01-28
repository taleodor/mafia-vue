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
                versionUri = 'https://app.relizahub.com/api/public/v1/instance/bundleVersion/5a0e6cbdeb5caaf0dc28de67ddcdd796de807ae43b3b538f2893907696ec6edba9dd9405f30805e6377c621a498d57e60524eb9a4accf779c7d72bb395a30c515e3ba8c58ff00768d2d61cafcdf178a78602005ef8a91cd276202f96c69d4ba774d4e2a2673b7d15cb8c4648d4c02714'
            } else if (window.location.host === 'mafia-test.rhythm.relizahub.com') {
                versionUri = 'https://rhythm.relizahub.com/api/public/v1/instance/bundleVersion/6356d4959840216d6ef9309731289ab5862b77be68deebb9876858ea2e7b95be7e2a8eaa667ede98b55b9c91ec00429b13bcff165d9c7407b1390954328586df5277a3a7c4bf73b93333ec92e5e9cf850e5402988305b9c94c7e89fcdcd63608050d2275ccc9fe9a0b7a53868afcf3c9'
            } else if (window.location.host === 'mafia-staging.rhythm.relizahub.com') {
                versionUri = 'https://rhythm.relizahub.com/api/public/v1/instance/bundleVersion/f3d8b43512626765f1936ddb4e2697369c2bccd9e9f74edd68590b41f93149515d8f115304bfeb2c519c63b8c670eac30ae0f97c1b1c7dcb5fa92afa75b4e3dbb53e7c517604c01ac8c57cad94c1676eacc1b7f013ea564a2301ffce638a6f9f2ed49acd923a582da2c7dfda4e758f8a'
            } else if (window.location.host === 'mafia.rhythm.relizahub.com') {
                versionUri = 'https://rhythm.relizahub.com/api/public/v1/instance/bundleVersion/fdbeec9b7f13b813ba151a9880789e8f205e6375ecd49652193fd8ebf5f673adfa7d79c8ff7b78ba7d7335955434d3a2a4269b5657e488c76fe0c412b4f51445bd8bd66ec6fecf313952960a03c452bcfc0ff4e2904fb7b7c80c128f635d35d2ebdb98c61feb6536dd8022d88a6d4369'
            } else if (window.location.host === 'testmafia.brolia.com') {
                versionUri = 'https://app.relizahub.com/api/public/v1/instance/bundleVersion/24cd343be124dd25c829fabf6e70d9cf6b2e1995ee04e7e00332a79e4d2c5f745ac16cc3518a8aea05630d7c9d630d7acdb81caa8a4428a932a5c878e83680fb97a1461c923b31d2f2a5ed2280a11172eb7a498f85b2bf49da74c75b097dee6add44b2e85014b40e89b3740c9d135b50'
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
