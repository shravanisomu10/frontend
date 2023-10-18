<template>
    <div v-if="message" class="error-message">
      <p>{{ message }}</p>
      <button @click="clearMessage">Close</button>
    </div>
  </template>
  
  <script>
 export default {
  props: {
    message: String
  },
  data() {
    return {
      localMessage: this.message
    };
  },
  methods: {
    updateMessage() {
      
      this.localMessage = "New Updated Message";
    }
  }
};
  </script>
  
  <style scoped>
  
  .error-message {
    background-color: #ff6b6b;
    color: white;
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .error-message button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>
  