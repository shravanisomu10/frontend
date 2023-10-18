// admin.js
import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';

// Import the AdminLogin component
import AdminLogin from '../components/Admin/AdminLogin.vue';

const routes = [
  {
    
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true }, // Protect this route
  },
  // Add a route for the Admin Login page
  {
    path: '/admin/login',
    component: AdminLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken');

  if (to.meta.requiresAuth && !token) {
    // Redirect to the login page if not authenticated
    next('/admin/login');
  } else {
    next();
  }
});

export default router;
