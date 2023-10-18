<template>
  <div class="home-page">
    <h2>Home Page</h2>
    <p>Welcome to the home page of our booking system!</p>
    <router-link to="/admin">Go to Admin Panel</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home_page {
  text-align: center;
  padding: 20px;
}

/* Use the element selector a.router-link */
a.router-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

a.router-link:hover {
  text-decoration: underline;
}
</style>
