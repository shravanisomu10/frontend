<template>
  <div>
    <h2>Admin Appointments</h2>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        {{ appointment.first_name }} {{ appointment.last_name }} - {{ appointment.doctors_name }} - {{ appointment.appointment_date }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      appointments: [],
    };
  },
  created() {
    this.getAppointments();
  },
  mounted() {
    this.getAppointments();
  },
  methods: {
    getAppointments() {
      axios.get('http://127.0.0.1:8000/appointment/api/appointments/')
        .then((response) => {
          this.appointments = response.data;
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    },
  },
};
</script>

<style scoped>
/* Your component's styles here */
</style>
