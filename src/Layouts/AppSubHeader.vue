<template>
    <div>
        <div class="px-5 pb-5">
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                    <router-link class="nav-link" :to="tab.url">{{ tab.name }}</router-link>
                    <span class="remove" @click="removeActiveTab(index)" v-if="tabs.length > 1">X</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {}
    },
    computed: {
        tabs: function() {
            return this.$store.getters.getActiveTabs;
        }
    },
    methods: {
        removeActiveTab: function(index) {
            this.$store.commit('removeActiveTab', index);
        }
    }
}
</script>
<style scoped>
    .nav-item {
        position: relative;
    }
    .remove {
        cursor: pointer;
        position: absolute;
        top: 2px;
        right: 6px;
        font-size: 12px;
    }
</style>