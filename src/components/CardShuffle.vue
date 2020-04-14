<template>
  <div class="hello">
    <h1>Welcome to the room "{{ room }}"</h1>
    <h3>Players in this room ({{ playerList.length }}):</h3>
    <div v-if="!playerList.length">No players yet</div>
    <div v-else>
        <ul>
            <li v-for="p in playerList" :key="p.name"><span v-if="!admin">{{ p.order }}.</span> {{ p.name }}
                <b-dropdown v-if="admin" :text="String(p.order)">
                    <b-dropdown-item v-for="i in computedOrderArray" :key="i" @click="updatePlayerOrder(i, p.name)">{{ i }}</b-dropdown-item>
                </b-dropdown>
                <span v-if="p.admin" title="Game Master"><b-icon-shield-shaded /></span>
                <a href="#" v-if="admin" @click="kickPlayer(p.name)"> x</a>
            </li>
        </ul>
    </div>
    <b-button v-if="admin" @click="shuffleOrder">Shuffle Player Order!</b-button>
    <div v-if="admin" class="adminBlock">
        <h5 class="cardDistroStatus">Card distribution (only game master sees this):</h5>
        <span class="cardType">Sheriff: <b-input class="cardDistroInput" v-model="cards.sheriff" /></span>
        <span class="cardType">Villager: <b-input class="cardDistroInput" v-model="cards.villager" /></span>
        <span class="cardType">Mafia: <b-input class="cardDistroInput" v-model="cards.mafia" /></span>
        <span class="cardType">Godfather: <b-input class="cardDistroInput" v-model="cards.godfather" /></span>
        <b-button @click="shuffleCards">Shuffle Cards!</b-button>
        <div class="cardDistroStatus">Distributed {{ distributedCards }} cards for {{ playerList.length }} players.</div>
    </div>
    <div class="playerInfoBlock" v-if="iPlayer">
        <h4 v-if="Object.keys(iPlayer).length && !iPlayer.card">You have joined this room as <strong>{{iPlayer.name}}</strong></h4>
        <div class="cardBlock" v-if="iPlayer.card">
            <h4>You have joined this room as <strong>{{iPlayer.name}}</strong>, game <strong>#{{iPlayer.game}}</strong>, your card:</h4>
            <img class="cardImage" :src="cardImage" :title="iPlayer.card" :alt="'Your card: ' + iPlayer.card"/>
            <h4>{{ iPlayer.card }}</h4>
        </div>
    </div>
    <div class="joinRenameGroup">
        <div v-if="!iPlayer || !Object.keys(iPlayer).length">Enter your name and hit "Submit" to join this room</div>
        <b-container>
            <b-row class="justify-content-md-center">
                    <b-col>
                        <b-form @submit="submitName">
                            <b-input-group class="mt-3">
                                <b-form-input id="enter-name-input"
                                            v-model="playerName"
                                            :placeholder="(iPlayer && iPlayer.name) ? 'You may update your name here' : 'Enter your name to join this room'" />
                                <b-input-group-append>
                                    <b-button variant="info" @click="submitName">Submit</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form>
                    </b-col>
            </b-row>
        </b-container>
    </div>
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
            iPlayer: {},
            room: this.$route.params.room,
            playerName: '',
            alertCountDown: 0,
            alertMsg: '',
            playerList: [],
            cards: {
                sheriff: 0,
                godfather: 0,
                mafia: 0,
                villager: 0
            },
            imagePrefix: 'https://d7ge14utcyki8.cloudfront.net/mafia/'
        }
    },
    props: {
        msg: String
    },
    sockets: {
        adminmsg (msg) {
            this.alertMsg = msg
            this.alertCountDown = 5
        },
        cardassigned (card) {
            this.alertMsg = 'You have been assigned a card: ' + card + '!'
            this.alertCountDown = 5
            this.requestMyPlayer()
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
            this.requestMyPlayer()
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
        },
        yourplayer (resp) {
            this.iPlayer = resp
        }
    },
    methods: {
        alertCountDownChanged (alertCountDown) {
            this.alertCountDown = alertCountDown
        },
        kickPlayer (name) {
            let kickobj = {
                room: this.room,
                name: name
            }
            this.$socket.emit('kickplayer', kickobj)
        },
        requestMyPlayer () {
            let requestObj = {
                uuid: window.localStorage.getItem('mafiaUuid'),
                room: this.room
            }
            this.$socket.emit('requestmyplayer', requestObj)
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
            if (this.distributedCards !== this.playerList.length) {
                this.alertMsg = 'You allocated ' + this.distributedCards + ' cards for ' + this.playerList.length + ' players! Numbers of cards and players must be equal!'
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
    },
    created () {
        this.requestRoom()
    },
    computed: {
        cardImage () {
            let cardImage = ''
            if (this.iPlayer && this.iPlayer.card) {
                let maxNumImage = {
                    godfather: 1,
                    sheriff: 1,
                    mafia: 3,
                    villager: 29
                }
                // random image postfix
                let imagePostfix = 1 + Math.floor(Math.random() * maxNumImage[this.iPlayer.card])
                let imageCardName = this.iPlayer.card === 'mafia' ? 'mafianew' : this.iPlayer.card
                cardImage = this.imagePrefix + imageCardName + String(imagePostfix) + '.jpg'
            }
            return cardImage
        },
        computedOrderArray () {
            let orderList = [...Array(this.playerList.length).keys()]
            orderList.shift()
            orderList.push(this.playerList.length)
            orderList.push('Host')
            orderList.push('Guest')
            return orderList
        },
        distributedCards () {
            return Number(this.cards.sheriff) + Number(this.cards.mafia) + Number(this.cards.godfather) + Number(this.cards.villager)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 30px 0 0;
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
.joinRenameGroup {
    margin-top: 50px;
}
.cardImage {
    max-height: 300px;
}
.cardDistroInput {
    display: inline-block;
    width: 70px
}
.cardDistroStatus {
    margin-top: 10px;
    margin-bottom: 10px;
}
.cardType {
    margin-right: 20px;
}
</style>
