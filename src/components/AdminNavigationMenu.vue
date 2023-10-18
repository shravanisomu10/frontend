<template>
  <div>
    <h2>Admin Menu</h2>
    <router-link to="/admin/appointments">Admin Appointments</router-link><br>
    <router-link to="/admin/doctors">Admin Doctors</router-link><br>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('adminToken'); 
      this.$router.push('/admin/login'); 
    },
  },
};
</script>

<style scoped>
/* Your component's styles here */
</style>
