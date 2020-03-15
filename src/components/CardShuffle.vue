<template>
  <div class="hello">
    <h1>Card Shuffle, room {{ room }}</h1>
    <h3>Players in this room ({{ playerList.length }}):</h3>
    <div v-if="!playerList.length">No players yet</div>
    <div v-else>
        <ul>
            <li v-for="p in playerList" :key="p.name">{{ p.name }} <span v-if="!admin">#{{ p.order }}</span>
                <b-dropdown v-if="admin" :text="String(p.order)">
                    <b-dropdown-item v-for="i in [1,2,3,4,5,6,7,8,9,10]" :key="i" @click="updatePlayerOrder(i, p.name)">{{ i }}</b-dropdown-item>
                </b-dropdown>
            </li>
        </ul>
    </div>
    <b-button v-if="admin" @click="shuffleOrder">Shuffle Player Order!</b-button>
    <div v-if="admin" class="adminBlock">
        <h5>Cards distribution (only game master sees this):</h5>
        Scheriff: <b-input v-model="cards.scheriff" />
        Villager: <b-input v-model="cards.villager" />
        Mafia: <b-input v-model="cards.mafia" />
        Godfather: <b-input v-model="cards.godfather" />
        <b-button @click="shuffleCards">Shuffle Cards!</b-button>
    </div>
    <div class="cardBlock" v-if="mycard">
        <h2>YOUR CARD: {{ mycard }}</h2>
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
            admin: false,
            room: this.$route.params.room,
            playerName: '',
            alertCountDown: 0,
            alertMsg: '',
            playerList: [],
            cards: {
                scheriff: 0,
                godfather: 0,
                mafia: 0,
                villager: 0
            },
            mycard: ''
        }
    },
    props: {
        msg: String
    },
    sockets: {
        cardassigned (card) {
            this.alertMsg = 'You have been assigned a card: ' + card + '!'
            this.alertCountDown = 5
            this.mycard = card
        },
        connect () {
            console.log('socket connected')
            this.requestRoom()
        },
        joinedroom (name) {
            this.alertMsg = name + ' joined this game room!'
            this.alertCountDown = 5
        },
        nametaken () {
            this.alertMsg = 'Sorry, this name has already been taken!'
            this.alertCountDown = 5
        },
        playerlist (list) {
            this.playerList = list
        },
        orderchanged (player) {
            this.alertMsg = 'Game master changed order number of player ' + player.name + ' to ' + player.order
            this.alertCountDown = 5
        },
        ordershuffled () {
            this.alertMsg = 'Game master shuffled player order!'
            this.alertCountDown = 5
        },
        youareadmin () {
            this.alertMsg = 'You are game master of this room!'
            this.alertCountDown = 5
            this.admin = true
        }
    },
    methods: {
        alertCountDownChanged (alertCountDown) {
            this.alertCountDown = alertCountDown
        },
        requestRoom () {
            let requestObj = {
                room: this.room,
                uuid: window.localStorage.getItem('mafiaUuid')
            }
            this.$socket.emit('requestroom', requestObj)
        },
        shuffleCards () {
            // count and validate
            let cardNum = Number(this.cards.scheriff) + Number(this.cards.mafia) + Number(this.cards.godfather) + Number(this.cards.villager)
            if (cardNum !== this.playerList.length) {
                this.alertMsg = 'You allocated ' + cardNum + ' cards for ' + this.playerList.length + ' players! These numbers must be equal!'
                this.alertCountDown = 5
            } else {
                // proceed with shuffle
                let shuffleObj = {
                    room: this.room,
                    cards: this.cards
                }
                this.$socket.emit('shufflecards', shuffleObj)
            }
        },
        shuffleOrder () {
            this.$socket.emit('shuffleorder', this.room)
        },
        submitName (e) {
            e.preventDefault()
            let joinObject = {
                room: this.room,
                name: this.playerName,
                uuid: window.localStorage.getItem('mafiaUuid')
            }
            console.log(joinObject)
            this.$socket.emit('joinroom', joinObject)
        },
        updatePlayerOrder (order, player) {
            let updOrderObj = {
                room: this.room,
                player: player,
                order: order
            }
            this.$socket.emit('updateorder', updOrderObj)
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
