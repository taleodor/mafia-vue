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
                                          placeholder="Enter room name to join or create" />
                            <b-input-group-append>
                                <b-button variant="info" @click="submitRoom">Submit</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            room: ''
        }
    },
    props: {
        msg: String
    },
    methods: {
        submitRoom () {
            this.$router.push({ name: 'RoomShuffle', params: { room: this.room } })
        }
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
