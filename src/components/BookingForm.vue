<template>
  <div>
    <h1>Booking Form</h1>
    <form @submit.prevent="submitBooking" class="booking-form">
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <input v-model="formData.first_name" type="text" id="first_name" required />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <input v-model="formData.last_name" type="text" id="lastName" required />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth :</label>
        <input v-model="formData.dob" type="date" id="dob" required />
      </div>
      <div class="form-group">
        <label for="doctors_name">Doctor Name:</label>
        <select v-model="formData.doctors_name" id="doctors_name" required>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="time">Doctor Time :</label>
        <input v-model="formData.time" type="time" id="time" required />
      </div>
      <div class="form-group">
        <label for="appointment_date">Appointment Date :</label>
        <input v-model="formData.date" type="date" id="date" required />
      </div>
      <button type="submit" class="submit-button">Book Appointment</button>
    </form>
  </div>
  <div>
    <br />
    <router-link to="/admin/login">Admin Login</router-link>
    <br />
    <button @click="AdminLogin">Admin Login</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        dob: '',
        doctors_name: '',
        time: '',
        date: '',
      },
      doctors: [],
    };
  },
  async created() {
   
    try {
      const response = await axios.get('http://127.0.0.1:8000/doctor/doctors/');
      this.doctors = response.data;
      //console.error(this.doctors[0]);
    } catch (error) {
      console.error('An error occurred:', error);
      
    }
  },
  methods: {
    async submitBooking() {
      if (
        !this.formData.first_name ||
        !this.formData.last_name ||
        !this.formData.dob ||
        !this.formData.doctors_name ||
        !this.formData.time ||
        !this.formData.date
      ) {
        alert('Please fill in all required fields.');
        return;
      }

      const formattedDate = this.formatDate(this.formData.date);
      const formattedTime = this.formatTime(this.formData.time);

      const booking = {
        first_name: this.formData.first_name,
        last_name: this.formData.last_name,
        dob: formattedDate,
        doctors_name: this.formData.doctors_name,
        time: formattedTime,
        date: formattedDate + ' ' + formattedTime + ':00',
      };

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/appointment/appointments/',
          booking
        );

        if (response.status === 201) {
          alert('Booking successful!');
          this.formData = {
            first_name: '',
            last_name: '',
            dob: '',
            doctors_name: '',
            time: '',
            date: '',
          };
        } else {
          alert('Booking failed. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while booking. Please try again later.');
      }
    },
    formatDate(inputDate) {
  
      return inputDate;
    },
    formatTime(inputTime) {
     
      return inputTime;
    },
    AdminLogin() {
      this.$router.push('/admin/login');
    },
  },
};
</script>

<style scoped>
.booking-form {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 50%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
input[type="date"],
input[type="time"],
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
