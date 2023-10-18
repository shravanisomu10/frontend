<!-- src/components/MyComponent.vue -->
<template>
    <div ref="myRef"></div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      // Create a ref for the element
      const myRef = ref(null);
  
      // Use the onMounted hook to access the element when it's ready
      onMounted(() => {
        // Check if the element exists
        if (myRef.value) {
          // Access the element here
          console.log(myRef.value);
        }
      });
  
      // Return the ref so it can be used in the template
      return { myRef };
    },
  };
  </script>
  