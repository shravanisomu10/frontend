import { createRouter, createWebHistory } from 'vue-router';

import AdminDashboard from './admin/AdminDashboard.vue'; 
import AdminLogin from './components/AdminLogin.vue';
import AppointmentList from './components/AppointmentList.vue';
import BookingForm from './components/BookingForm.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import AdminNavigationMenu from './components/AdminNavigationMenu.vue';

const routes = [
  { path: '/', redirect: '/user/appointments' },
  { path: '/user/appointments', component: () => import('./views/UserAppointments.vue') },
  { path: '/admin/appointments', component: () => import('./views/AdminAppointments.vue') },
  { path: '/admin/doctors', component: () => import('./views/AdminDoctors.vue') },
  { path: '/admin/dashboard', component: AdminDashboard }, 
  { path: '/admin/login', component: AdminLogin },
  { path: '/appointment-list', component: AppointmentList },
  { path: '/booking-form', component: BookingForm },
  { path: '/error-message', component: ErrorMessage },
  { path: '/admin-navigation-menu', component: AdminNavigationMenu },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
