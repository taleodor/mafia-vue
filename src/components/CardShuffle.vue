<template>
  <div class="hello">
    <h1 class="welcomeRoom">Welcome To The Room "{{ room }}"</h1>
    <h3>Players in this room ({{ playerList.length }}):</h3>
    <div v-if="!playerList.length">No players yet</div>
    <div v-else>
        <ul>
            <li v-for="p in playerList" :key="p.name">
                <span :class="(p.order !== 'Host' && p.order !== 'Guest' && p.order !== iPlayer.order) ? 'clickable' : ''" @click="listenTo(p.order)"><span v-if="!admin">{{ p.order }}.</span>{{ p.name }} </span>
                <b-dropdown v-if="admin" :text="String(p.order)">
                    <b-dropdown-item v-for="i in computedOrderArray" :key="i" @click="updatePlayerOrder(i, p.name)">{{ i }}</b-dropdown-item>
                </b-dropdown>
                <span v-if="p.admin" title="Game Master"><b-icon-shield-shaded /></span>
                <span class="text-success" v-if="winkLink.includes(p.order)" title="Player Saw You Winking"><b-icon-bullseye /></span>
                <span class="text-danger" v-if="listenLink.includes(p.order)" title="Player Winked To You"><b-icon-eye /></span>
                <a href="#" v-if="admin" @click="kickPlayer(p.name)"> x</a>
            </li>
        </ul>
    </div>
    <b-alert
      :show="alertCountDown"
      dismissible
      @dismissed="alertCountDown=0"
      @dismiss-count-down="alertCountDownChanged"
    >{{ alertMsg }}</b-alert>
    <b-button v-if="admin" variant="success" @click="shuffleOrder">Shuffle Player Order!</b-button>
    <div v-if="admin" class="transferAdmin mt-3 ml-3">
        <span>Transfer Game Master To: </span>
        <b-dropdown text="Select Player">
            <b-dropdown-item v-for="p in playerList" :key="p.name" @click="transferAdmin(p.name)">{{ p.name }}</b-dropdown-item>
        </b-dropdown>
    </div>
    <div v-if="admin" class="adminBlock">
        <h5 class="cardDistroStatus">Card distribution (only game master sees this):</h5>
        <span v-for="gamecard in Object.keys(cards)" :key="gamecard" class="cardType">{{ gamecard }}: <b-input class="cardDistroInput" v-model='cards[gamecard].num' /></span>
        <span class="h1 mr-3 clickable" v-b-modal.modal-add-custom-role title="Add Custom Role"><b-icon-plus-circle /></span>
        <b-button variant="success" @click="shuffleCards">Shuffle Cards!</b-button>
        <div class="cardDistroStatus">Distributed {{ distributedCards }} cards for {{ playersInGame.length }} players.</div>
        <b-modal
            ref="modal-add-custom-role"
            id="modal-add-custom-role"
            title="Add Custom Role"
            :hide-footer="true"
            >
            <b-form @submit="addRoleSubmit">
                <b-form-group   id="add_custom_role_input_group"
                                label="Role"
                                label-for="add_custom_role_input"
                                description="Name your custom role">
                    <b-form-input
                                id ="add_custom_role_input"
                                v-model="customRole"
                                required
                                placeholder="Enter Custom Role" />
                </b-form-group>
                <b-form-group   id="add_custom_role_picture_group"
                                label="Picture Type"
                                label-for="add_custom_role_picture"
                                description="Choose picture type">
                    <b-form-select
                                id ="add_custom_role_picture"
                                v-model="customRolePicture"
                                placeholder="Choose Picture Type"
                                :options="cardsWithImages" />
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-modal>
    </div>
    <div class="playerInfoBlock" v-if="iPlayer && Object.keys(iPlayer).length && game > 0 && game === iPlayer.game">
        <div class="winkTo" v-if="iPlayer.order !== 'Host' && iPlayer.order !== 'Guest'">
            <p>To listen to winks from a player, click or tap on player's name!</p>
            <span>Game {{ game }} - Wink To: </span>
            <b-dropdown text="Select Player To Wink">
                <b-dropdown-item v-for="p in playersInGame" :key="p.name" @click="winkTo(p.order)">{{ p.order }}</b-dropdown-item>
            </b-dropdown>
        </div>
        <h4 v-if="!iPlayer.card && iPlayer.order !== 'Guest' && iPlayer.order !== 'Host'">You have joined this room as <strong>{{iPlayer.name}}</strong></h4>
        <div class="cardBlock" v-if="iPlayer.card && iPlayer.order !== 'Guest' && iPlayer.order !== 'Host'">
            <h4>You have joined this room as <strong>{{iPlayer.name}}</strong>, game <strong>#{{iPlayer.game}}</strong>, your card:</h4>
            <img class="cardImage" :src="cardImage" :title="iPlayer.card" :alt="'Your card: ' + iPlayer.card"/>
            <h4>{{ iPlayer.card }}</h4>
        </div>
    </div>
    <div class="hostGuestBlock" v-if="iPlayer && Object.keys(iPlayer).length">
        <h4 v-if="iPlayer.order === 'Guest'">You have joined this room as <strong>{{iPlayer.name}}</strong>. You are a Guest.</h4>
        <div class="hostBlock" v-if="iPlayer.order === 'Host'">
            <h4>You have joined this room as <strong>{{iPlayer.name}}</strong>. You are a Host.</h4>
            <p>Game <strong>#{{ game }}</strong></p>
            <ol>
                <li class="hostInfo" v-for="p in hostGameArr" :key="p.order">{{p.order}}. {{p.card}}</li>
            </ol>
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
                                            required
                                            v-model="playerName"
                                            :placeholder="(iPlayer && iPlayer.name) ? 'You may update your name here' : 'Enter your name to join this room'" />
                                <b-input-group-append>
                                    <b-button variant="info" type="submit">Submit</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form>
                    </b-col>
            </b-row>
        </b-container>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CardShuffle',
    data () {
        return {
            admin: false,
            customRole: '',
            customRolePicture: '',
            winkLink: [],
            hostGameArr: [],
            game: 0,
            iPlayer: {},
            listenLink: [],
            room: this.$route.params.room,
            playerName: '',
            alertCountDown: 0,
            alertMsg: '',
            playerList: [],
            cards: {
                sheriff: {
                    num: 1,
                    image: 'sheriff'
                },
                godfather: {
                    num: 1,
                    image: 'godfather'
                },
                mafia: {
                    num: 2,
                    image: 'mafia'
                },
                villager: {
                    num: 6,
                    image: 'villager'
                }
            },
            cardsWithImages: ['sheriff', 'godfather', 'mafia', 'villager'],
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
        winksuccess (order) {
            if (!this.winkLink.includes(order)) {
                this.winkLink.push(order)
            }
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
        gamenumber (game) {
            this.game = game
        },
        gameset (hostGameObj) {
            // call for host to retrieve card assignments for all players
            let localGameArr = []
            if (hostGameObj) {
                Object.keys(hostGameObj).forEach(key => {
                    let playerObj = {
                        order: key,
                        card: hostGameObj[key]
                    }
                    localGameArr.push(playerObj)
                })
                // order by number
            }
            this.hostGameArr = localGameArr
            this.hostGameArr = this.hostGameArr.sort((a,b) => {
                return a.order - b.order
            })
        },
        joinedroom (name) {
            this.alertMsg = name + ' joined this game room!'
            this.alertCountDown = 5
        },
        listensuccess (order) {
            if (!this.listenLink.includes(order)) {
                this.listenLink.push(order)
            }
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
            if (resp) {
                this.admin = resp.admin
                this.game = resp.game
            }
        }
    },
    methods: {
        addRoleSubmit (e) {
            e.preventDefault()
            this.cards[this.customRole] = {
                num: 0,
                image: this.customRolePicture
            }
            this.cards = Object.assign({}, this.cards) // needed for computed property to refresh
            this.$refs['modal-add-custom-role'].hide()
            this.customRole = ''
        },
        alertCountDownChanged (alertCountDown) {
            this.alertCountDown = alertCountDown
        },
        listenTo (order) {
            if (order !== 'Host' && order !== 'Guest' && order !== this.iPlayer.order) {
                let listObj = {
                    room: this.room,
                    listenTarget: order
                }
                this.$socket.emit('listenTo', listObj)
            }
        },
        winkTo (order) {
            if (order === this.iPlayer.order) {
                this.alertMsg = "You cannot wink to yourself!"
                this.alertCountDown = 5
            } else {
                let winkObj = {
                    room: this.room,
                    winkTarget: order
                }
                this.$socket.emit('winkTo', winkObj)
            }
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
            if (this.distributedCards !== this.playersInGame.length) {
                this.alertMsg = 'You allocated ' + this.distributedCards + ' cards for ' + this.playersInGame.length + ' players! Numbers of cards and players must be equal!'
                this.alertCountDown = 5
            } else {
                // proceed with shuffle
                let cardsForShuffle = {}
                Object.keys(this.cards).forEach(ck => {
                    cardsForShuffle[ck] = this.cards[ck].num
                })
                let shuffleObj = {
                    room: this.room,
                    cards: cardsForShuffle
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
        transferAdmin (name) {
            let requestObj = {
                room: this.room,
                name: name
            }
            this.$socket.emit('transferGameMaster', requestObj)
            setTimeout(() => {
                console.log('timeout')
                this.requestMyPlayer()
            }, 1000)
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
    watch: {
        game () {
            this.winkLink = []
            this.listenLink = []
        }
    },
    computed: {
        cardImage () {
            let cardImage = ''
            if (this.iPlayer && this.iPlayer.card && this.cardsWithImages.includes(this.cards[this.iPlayer.card].image)) {
                let maxNumImage = {
                    godfather: 15,
                    sheriff: 14,
                    mafia: 30,
                    villager: 58
                }
                // random image postfix
                let imagePostfix = 1 + Math.floor(Math.random() * maxNumImage[this.cards[this.iPlayer.card].image])
                cardImage = this.imagePrefix + this.cards[this.iPlayer.card].image + String(imagePostfix) + '.jpg'
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
        playersInGame () {
            let playersInGame = []
            this.playerList.forEach(p => {
                if (p.order !== 'Host' && p.order !== 'Guest') {
                    playersInGame.push(p)
                }
            })
            return playersInGame
        },
        distributedCards () {
            let numCards = 0
            Object.values(this.cards).forEach(val => {
                numCards += Number(val.num)
            })
            return numCards
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
.clickable {
    cursor: pointer;
}
li.hostInfo {
    display: block;
    text-align: left;
    margin-left: 40%;
}
.welcomeRoom {
    color: #9b7a71;
}
</style>
