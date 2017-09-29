import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isSingin: false,
        userId: '',
        userName: '',
    },
    mutations: {
        setSigninStatus(state, payload){
            state.isSingin = payload.isSingin
        },
        setUserId(state, payload){
            state.userId = payload.userId
        }
    }
})

export default store
