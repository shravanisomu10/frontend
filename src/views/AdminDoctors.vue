<template>
  <div>
    <h2 class="page-title">Admin Doctors</h2>

    <!-- Add Doctor Form -->
    <form @submit.prevent="addDoctor">
      <label for="doctorName">Doctor's Name:</label>
      <input v-model="newDoctorName" type="text" id="doctorName" required />

      <label for="doctorSpecialty">Doctor's Specialty:</label>
      <input v-model="newDoctorSpecialty" type="text" id="doctorSpecialty" required />

      <button type="submit">Add Doctor</button>
    </form>

    <!-- Doctor Table -->
    <table class="doctor-table">
      <thead>
        <tr>
          <th>Doctor's Name</th>
          <th>Doctor's Specialty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doctor in doctors" :key="doctor.id">
          <td>{{ doctor.name }}</td>
          <td>{{ doctor.specialty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctors: [],
      newDoctorName: '',
      newDoctorSpecialty: '',
    };
  },
  created() {
    this.getDoctors(); // Automatically load doctors when the component is created.
  },
  methods: {
    async addDoctor() {
      if (this.newDoctorName && this.newDoctorSpecialty) {
        try {
          const response = await fetch('http://127.0.0.1:8000/doctor/doctors/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.newDoctorName,
              specialty: this.newDoctorSpecialty,
            }),
          });

          if (response.status === 201) {
            this.newDoctorName = '';
            this.newDoctorSpecialty = '';
            this.getDoctors(); // Refresh the doctor list.
          } else {
            console.error('Failed to add doctor');
          }
        } catch (error) {
          console.error('Error adding doctor:', error);
        }
      }
    },
    async getDoctors() {
      try {
        const response = await fetch('http://127.0.0.1:8000/doctor/doctors/');
        if (response.status === 200) {
          this.doctors = await response.json();
        } else {
          console.error('Failed to retrieve doctors');
        }
      } catch (error) {
        console.error('Error retrieving doctors:', error);
      }
    },
  },
};
</script>
<style scoped>
.page-title {
  font-size: 24px;
  margin: 20px 0;
}

.doctor-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.doctor-table th,
.doctor-table td {
  border: 1px solid #ccc;
  padding: 12px; 
  text-align: left;
}

.doctor-table th {
  background-color: #007bff;
  color: #fff;
  padding: 12px; /* Increased padding for better readability */
}

.doctor-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>

