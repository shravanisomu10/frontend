<template>
    <h2>Admin Dashboard</h2>
    <div class="admin-dashboard">
      
      <div class="admin-content">
        
        <router-link to="/appointment-list">Appointment List</router-link>
        <div class="admin-menu">
        <AdminNavigationMenu />
      </div>
        <button @click="logout">Logout</button>
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import AdminNavigationMenu from '../AdminNavigationMenu.vue';
  
  export default {
    components: {
      AdminNavigationMenu,
    },
    methods: {
      logout() {
        localStorage.removeItem('adminToken');
        this.$router.push('/admin/login');
      },
    },
  };
  </script>
  
  