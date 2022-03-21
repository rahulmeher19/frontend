export default {
    namespaced: true, 
    state: {
        activeTabs: [],
    },
    getters: {
        getActiveTabs: state => {
            return state.activeTabs;
        }
    },
    mutations: {
        setActiveTabs: (state, name, url) => {

        },
    },
    actions: {
        activeTabs: function (name, url) {
            commit('setActiveTabs', name, url);
        }
    }

}