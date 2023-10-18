import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';
import AdminNavigationMenu from '../components/AdminNavigationMenu.vue';
import Appointments from '../views/Appointments.vue';
import Doctors from '../views/Doctors.vue';
import AdminMenu from '../views/AdminMenu.vue';
import AdminLogin from '../views/AdminLogin.vue';
import AppointmentList from '../components/AppointmentList.vue'; // Import AppointmentList
import BookingForm from '../components/BookingForm.vue'; // Import BookingForm
import ErrorMessage from '../components/ErrorMessage.vue'; // Import ErrorMessage

const routes = [
  // ... other routes

  {
    path: '/admin',
    component: AdminNavigationMenu,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
        meta: { title: 'Admin Dashboard' },
      },
      {
        path: 'appointments',
        component: Appointments,
        meta: { title: 'Appointments' },
      },
      {
        path: 'doctors',
        component: Doctors,
        meta: { title: 'Doctors' },
      },
    ],
  },
  {
    path: '/admin/login',
    component: AdminLogin,
  },
  {
    path: '/admin/menu',
    component: AdminMenu,
    meta: { requiresAuth: true }, // Requires authentication
  },
  {
    path: '/appointment-list',
    component: AppointmentList,
  },
  {
    path: '/booking-form',
    component: BookingForm,
  },
  {
    path: '/error-message',
    component: ErrorMessage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Booking Form';
  next();
});

// Navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('adminToken');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/admin/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
