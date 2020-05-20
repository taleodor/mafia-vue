import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import CardShuffle from './components/CardShuffle.vue'
import Rules from './components/Rules.vue'
import Clubs from './components/Clubs.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'Mafia Card Shuffle',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Simple card shuffle app for Classic Mafia / Werewolf games'
                    }
                ]
            }
        },
        {
            path: '/cards/:room',
            name: 'RoomShuffle',
            component: CardShuffle,
            meta: {
                title: 'Mafia Card Shuffle'
            }
        },
        {
            path: '/rules',
            name: 'Rules',
            component: Rules,
            meta: {
                title: 'Mafia Card Shuffle - Game Rules'
            }
        },
        {
            path: '/clubs',
            name: 'Clubs',
            component: Clubs,
            meta: {
                title: 'Mafia Card Shuffle - Clubs'
            }
        }
    ]
})