<template>
    <div id="wrapper">
        <app-sidebar></app-sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <app-topbar></app-topbar>
                <app-sub-header></app-sub-header>
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
    </div>
</template>
<script>
import AppSidebar from './../Layouts/AppSidebar.vue';
import AppTopbar from './../Layouts/AppTopbar.vue';
import AppFooter from './../Layouts/AppFooter.vue';
import AppSubHeader from './../Layouts/AppSubHeader.vue';

export default {
    name: 'Dashboard',
    components: {
        AppSidebar,
        AppTopbar,
        AppFooter,
        AppSubHeader
    },
}
</script>
<style scoped>
    .btn-primary {
    color: #fff;
    background-color: #da218f;
    border-color: #da218f;
}
</style>