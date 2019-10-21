import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        nav:[],
        cart:[]
    },
    mutations: {
        data(state,data){
            state.nav = data
        },
        addNum(state,obj){
            var index = state.cart.findIndex((v,i)=>{
                return v.name == state.nav[obj.index].name
            })
            console.log(index)
            if( index == -1){
                state.cart.push(obj)
            }
            else{
                state.cart[index].num++
            }
        }
    }
})

export default store