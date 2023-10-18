<template>
  <div>
    <h2>Admin Login</h2>

    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'admin',
      password: 'password',
      isAuthenticated: false,
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'password') {
        localStorage.setItem('adminToken', 'your-auth-token');
        this.$router.push('/admin/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
