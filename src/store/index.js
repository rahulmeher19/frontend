import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeTabs: [
            {
                name: 'Dashboard',
                url: '/dashboard',
            }
        ],
    },
    getters: {
        getActiveTabs: (state) => {
            return state.activeTabs;
        }
    },
    mutations: {
        setActiveTabs: (state, payload) => {
            let allowNewItem = true;
            state.activeTabs.forEach(function (activeTab){
                if(activeTab.name == payload.name) {
                    allowNewItem = false;
                }
            });

            if(allowNewItem) {
                state.activeTabs.push(payload);
            }
        },
        removeActiveTab(state, index) {
            let activeTabs = state.activeTabs;
            activeTabs.splice(index, 1);
            state.activeTabs = activeTabs;
        }
    },
});
