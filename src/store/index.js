import Vue from 'vue'
import Vuex from 'vuex'
import router, {resetRouter}  from "@/router";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPathName: ''
    },
    mutations: {
        
    }
})

export default store