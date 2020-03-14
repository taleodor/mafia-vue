<template>
  <div class="hello">
    <h1>Card Shuffle, room {{ room }}</h1>
    <h3>Players in this room ({{ playerList.length }}):</h3>
    <div v-if="!playerList.length">No players yet</div>
    <div v-else>
        <ul>
            <li v-for="p in playerList" :key="p">{{ p }}</li>
        </ul>
    </div>
    <b-input-group class="mt-3">
        <b-form @submit="submitName">
            <b-input-group class="mt-3">
                <b-form-input id="enter-name-input" v-model="playerName" placeholder="Enter your name" />
                <b-input-group-append>
                    <b-button variant="info" @click="submitName">Submit</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-form>
    </b-input-group>
    <b-alert
      :show="alertCountDown"
      dismissible
      @dismissed="alertCountDown=0"
      @dismiss-count-down="alertCountDownChanged"
    >{{ alertMsg }}</b-alert>
  </div>
</template>

<script>
export default {
    name: 'CardShuffle',
    data () {
        return {
            room: this.$route.params.room,
            playerName: '',
            alertCountDown: 0,
            alertMsg: '',
            playerList: []
        }
    },
    props: {
        msg: String
    },
    sockets: {
        connect () {
            console.log('socket connected')
            this.requestRoom()
        },
        joinedroom (name) {
            this.alertMsg = name + ' joined this game room!'
            this.alertCountDown = 5
        },
        nametaken () {
            this.alertMsg = 'Sorry, this name is already taken!'
            this.alertCountDown = 5
        },
        playerlist (list) {
            this.playerList = list
        }
    },
    methods: {
        alertCountDownChanged (alertCountDown) {
            this.alertCountDown = alertCountDown
        },
        requestRoom () {
            this.$socket.emit('requestroom', this.room)
        },
        submitName (e) {
            e.preventDefault()
            let joinObject = {
                room: this.room,
                name: this.playerName
            }
            this.$socket.emit('joinroom', joinObject)
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
