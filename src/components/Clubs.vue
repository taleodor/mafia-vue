<template>
    <div>
        <h1>Classic Mafia Clubs</h1>
        <div class="clubs">
            <p>This page contains information about Classic Mafia clubs.</p>
            <p>If you would like to see your club added here, contact <a href="https://twitter.com/taleodor">@taleodor</a>.
            Or if you are tech-savvy, submit a pull request <a href="https://github.com/taleodor/mafia-vue/blob/master/src/components/Clubs.vue">here</a>.</p>
            <h4>English Speaking Clubs:</h4>
            <ul>
                <li>Vancouver Mafia Club - <a href="https://www.facebook.com/groups/226449514517735/">https://www.facebook.com/groups/226449514517735/</a></li>
                <li>Kiev English Mafia Club - <a href="https://englishmafiaclub.com/">https://englishmafiaclub.com/</a></li>
            </ul>
            <h4>Russian Speaking Clubs:</h4>
            <ul>
                <li>Freud Mafia - <a href="https://www.facebook.com/FreudMafia/">https://www.facebook.com/FreudMafia/</a></li>
                <li>Mafia Club in Ottawa - <a href="https://www.facebook.com/groups/mafiagameottawa/">https://www.facebook.com/groups/mafiagameottawa/</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Clubs',
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
a {
    color: #42b983;
}
p {
    display: block;
}
div.clubs {
    text-align: left;
    margin-left: 10%;
}
</style>
