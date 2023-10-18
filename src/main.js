import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import your components and views
import AdminLogin from './components/AdminLogin.vue'
import AdminAppointments from './views/AdminAppointments.vue'
import AdminDoctors from './views/AdminDoctors.vue'
import AdminDashboard from './components/Admin/AdminDashboard.vue';
import BookingForm from './components/BookingForm.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import AppointmentList from './components/AppointmentList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/admin/login', component: AdminLogin },
    { path: '/admin/appointments', component: AdminAppointments },
    { path: '/admin/doctors', component: AdminDoctors },
    { path: '/admin/dashboard', component: AdminDashboard },
    { path: '/booking-form', component: BookingForm },
    { path: '/error-message', component: ErrorMessage },
    { path: '/appointment-list', component: AppointmentList },
  ],
})

createApp(App)
  .use(router) // Add Vue Router to your app
  .mount('#app')
