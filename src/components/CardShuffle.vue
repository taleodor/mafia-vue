<template>
  <div class="hello">
    <h1>Card Shuffle, room {{ room }}</h1>
  </div>
</template>

<script>
export default {
  name: 'CardShuffle',
  data () {
      return {
          room: this.$route.params.room
      }
  },
  props: {
    msg: String
  },
  sockets: {
    connect () {
      console.log('socket connected')
      this.$socket.emit('joinroom', this.room)
    },
    joinedroom () {
        console.log('somebody joined my room')
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
