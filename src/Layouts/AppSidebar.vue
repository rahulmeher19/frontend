<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
          <div class="sidebar-brand-icon rotate-n-15"></div>
          <div class="sidebar-brand-text mx-3">NiTOROM</div>
        </router-link>

        <hr class="sidebar-divider my-0" />

        <li class="nav-item" @click="addNewTab('Dashboard', '/dashboard')">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <hr class="sidebar-divider" />

        <li class="nav-item" @click="addNewTab('Users', '/users')">
          <router-link class="nav-link" to="/users">
            <i class="fas fa-fw fa-users"></i>
            <span>Users</span>
          </router-link>
        </li>

        <hr class="sidebar-divider" />

        <li class="nav-item" @click="addNewTab('Roles', '/roles')">
          <router-link class="nav-link" to="/roles">
            <i class="fas fa-fw fa-users"></i>
            <span>Roles</span>
          </router-link>
        </li>        

        <hr class="sidebar-divider d-none d-md-block" />

        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

      </ul>
</template>
<script>
export default {
    methods: {
      addNewTab: function (name, url) {
        this.$store.commit('setActiveTabs', {
          name: name,
          url: url
        });
      },
    }
}
</script>
<style scoped>
    .bg-gradient-primary {
        background-image: linear-gradient(180deg,#da218f 10%,#da218f 100%);
    }

    .container {
        padding-top: 25vh;
    }

    .btn-primary {
        background-color: #da218f;
        border-color: #da218f;
    }
   
</style>