<template>
    <div>
        <h1>Classic Mafia Game Rules</h1>
        <div class="rules">
            <h4>1. Game Setup</h4>
            <p>Classic Mafia Game is a professional version of <a href="https://en.wikipedia.org/wiki/Mafia_(party_game)">Mafia / Werewolf party game</a>.</p>
            <p>To play Classic Mafia, you need 10 players and a Host. Roles are distributed as following: 1 Sheriff, 6 Villagers, 1 Godfather, 2 Mafias.</p>
            <p>Villagers and Sheriff are called <strong>red</strong> players, while Godfather and Mafias are called <strong>black</strong> players.</p>
            <p>Before the game starts, every players must be assigned an order (from 1 to 10) and a card. 
                You can use <a href="https://mafia.brolia.com">our card shuffler</a> to assign both.</p>
            <h4>2. Game Flow</h4>
            <h5>2.a. Zeroeth night</h5>
            <p>In the beginning of the game host tells all players to "sleep" - meaning all players must close their eyes and / or use face mask.<p>
            <p>After that the host wakes up mafia and Godfather. Godfather identifies herself with a gesture (pointing to a shoulder)
                and gives orders how the players will be shot using only gestures. The easiest way to do so is static: meaning that
                the Godfather shows 3 numbers using fingers, i.e. 1 -- 3 -- 8. This means that on the 1st night player one will be shot,
                then player 3 and finally player 8. More elaborate (dynamic) ways to make an agreement are possible but bear additional
                conversation.</p>
            <p>Mafia traditionally has 60 seconds to make an agreement but we usually use 80 seconds for Zoom to account for lags.</p>
            <p>Once Mafia's time is over, the host tells Mafia to go to sleep, then asks Godfather to make a gesture to identify herself
                for the host. And then asks Sheriff to make a gesture to identify herself for the host</p>
            <p>Once host knows Godfather, Mafias and Sheriff, host tells everybody to wake up.</p>
            <h5>2.b. Zeroeth day</h5>
            <p>The host tells the village that there was arrival of Mafia and there is also a Sheriff that would try to find it.</p>
            <p>During Zeroeth day each player has 60 seconds to express her thoughts, in order starting from the player 1.</p>
            <p>The host traditionally warns players when only 10 seconds are left of their speech.</p>
            <p>Player 1 is usually expected to share some of the nightly thoughts she had, prooving that she was actually asleep
                and not awake arranging strategy with Mafias.</p>
            <p>Every other player then traditionally shares thoughts about player 1 and all other players who spoke before. If there is
                time left during 60 seconds, player may also share her nightly thoughts.</p>
            <p>Players may add one other player to the voting list but it is uncommon during the Zeroeth day. If only 1 player is added
                to the list on the Zeroeth day, no voting is held. If there are 2 or more players in the list, this triggers voting.
                A player who gets most votes leaves the game. If the vote is split between 2 players (i.e. 5 for 1 and 5 for 3) - they both 
                get additional 30 seconds to talk. If the vote is split 2nd time, and the vote is split again, the vote is taken to kick
                both players from the table. This vote requires simple majority.
            <p>After every player had their chance to speak, the host announces the beginning of the first night.</p>
            <h5>2.c. First night</h5>
            <p>During the first night the host first asks 3 Mafias (with Godfather) to show the numer of player they want to shoot
                using their fingers (for Zoom version). IMPORTANT: Mafia does this with closed eyes. 
                Then the host names every player from 1 to 10 and the Mafias also need to make
                shooting gesture (closing fingers) on the number they want to shoot - this is just to double check the number. In the 
                Zoom version showing numbers on fingers usually takes precedence.</p>
            <p>If all 3 Mafias picked the same target, that player is shot, otherwise it's a miss.</p>
            <p>Once the count to 10 is complete, the host tells Mafia to put down the rifles and go to sleep.</p>
            <p>The host then wakes up the Godfather and the Godfather may ask the host who is the Sheriff by showing number
                of player she wants to check using finger. If the Godfather guessed right - the host shows Sheriff gesture (that is ok 
                gesture). Otherwise the host crosses hands / shakes head to show that the Godfather's guess was wrong.</p>
            <p>After that the Godfather goes to sleep.</p>
            <p>The host then wakes up the Sheriff and the Sheriff may check whether a player is Mafia by showing player's number.</p>
            <p>If the player selected by the Sheriff is a Mafia or Godfather, the host shows thumbs down gesture. Otherwise,
                the host shows thumbs up gesture.</p>
            <p>Once that's done, the host tells Sheriff to go to sleep and wakes up the village.</p>
            <h5>2d. First day</h5>
            <p>First day is played similarly to the Zeroeth day with the following differences:</p>
            <ul>
                <li>- In the beginning, the host announces if there were victims of Mafia's crimes. If so, a victim would be 
                    given a chance to leave a will and would have 60 seconds for that in the beginning of the round. Note,
                    that such player may not put anyone to vote, just speak her opinion.</li>
                <li>- The First day is started by the player 2 (as opposed to player 1 starting Zeroeth day). Note, that if player 2 was shot
                    at night, then player 3 starts. Accordingly, player 1 is the last one to speak on the First day.</li>
                <li>- Even if there is only one candidacy on the voting list, the voting will take place, - all votes would go to that
                    candidate in such case.</li>
            </ul>
            <h5>2e. Second and subsequent nights</h5>
            <p>Second and subsequent nights are played exactly as the first night. Even if Godfather and / or Sheriff were previously
                eliminated, the host still announces them - so not to reveal the roles of eliminated players.</p>
            <h5>2f. Second and subsequent days</h5>
            <p>Second and subsequent days are played exactly as the first day. However every time the speaking order is shifted by 1 
                (if the previous day was started by player 3 - next would be started by player 4 etc).
            <h4>Victory Conditions</h4>
            <p><strong>Mafia wins</strong> if the number of red and black players at the table is equal (i.e., 3-3, 2-2 or 1-1).</p>
            <p><strong>The Village</strong> wins if all black players were eliminated from the game.</p>
            <h4>Other considerations</h4>
            <p>In offline Classic Mafia eliminated players should physically leave the table.</p>
            <p>In the Zoom / Jitsi version, we ask eliminated players to stop camera and mute themselves.</p>
            <p>We'll try to add more details over time. For now, gather your friends and 
                <a href='https://mafia.brolia.com'>start your game!</a></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rules',
    data () {
        return {
        }
    },
    props: {
    },
    methods: {}
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
p {
    display: block;
}
div.rules {
    text-align: left;
    margin-left: 10%;
}
</style>
