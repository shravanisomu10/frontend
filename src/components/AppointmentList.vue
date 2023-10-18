<template>
    <div>
      <h2>Admin Panel</h2>
      <div>
        <button @click="viewAppointments">View Appointments</button>
      </div>
      <div v-if="appointments.length > 0">
        <h3>Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Doctor Name</th>
              <th>Appointment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>
                <span v-if="!appointment.isEditing">{{ appointment.first_name }}</span>
                <input v-else v-model="appointment.editableFirstName" />
              </td>
              <td>
                <span v-if="!appointment.isEditing">{{ appointment.last_name }}</span>
                <input v-else v-model="appointment.editableLastName" />
              </td>
              <td>
             <span v-if="!appointment.isEditing">{{ appointment.doctors_name }}</span>
            <select v-else>
            <option
             v-for="doctor in doctors"
             :key="doctor.name"
             :value="doctor.name"
             :selected="doctor.name === appointment.editableDoctorName"
    >        {{ doctor.name }}
              </option>
            </select>
            </td>
             <td>
                <span v-if="!appointment.isEditing">{{ appointment.date }}</span>
                <input v-else v-model="appointment.editableAppointmentDate" type="text" />
              </td>
              <td>
                <button @click="cancelAppointment(appointment.id)">Cancel</button>
                <button @click="toggleEdit(appointment)">Edit</button>
                <button @click="rescheduleAppointment(appointment.id)">Reschedule</button>
                <button @click="updateAppointment(appointment)">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
    methods: {
    async viewAppointments() {
      try {
       
        const appointmentsResponse = await axios.get('http://127.0.0.1:8000/appointment/api/appointments/');
        this.appointments = appointmentsResponse.data.map(appointment => ({
          ...appointment,
          isEditing: false,
          editableFirstName: appointment.first_name,
          editableLastName: appointment.last_name,
          editableDoctorName: appointment.doctors_name,
          editableAppointmentDate: appointment.date,
        }));

        
        const doctorsResponse = await axios.get('http://127.0.0.1:8000/doctor/doctors/');
        this.doctors = doctorsResponse.data;
      } catch (error) {
        console.error('Error fetching appointments or doctors:', error);
        alert('An error occurred while fetching data.');
      }
    },
    toggleEdit(appointment) {
      appointment.isEditing = !appointment.isEditing;
    },

  

    async updateAppointment(appointment) {
    try {
        const updatedData = {
            first_name: appointment.editableFirstName,
            last_name: appointment.editableLastName,
            doctors_name: appointment.editableDoctorName, 
            appointment_date: appointment.editableAppointmentDate,
        };

        const response = await axios.put(
            `http://127.0.0.1:8000/appointment/api/appointments/update/${appointment.id}/`,
            updatedData
        );

        if (response.status === 200) {
            alert('Appointment updated successfully');
            appointment.isEditing = false;

            const index = this.appointments.findIndex(item => item.id === appointment.id);
            if (index !== -1) {
                this.appointments[index] = { ...this.appointments[index], ...updatedData };
            }
        } else {
            alert('Failed to update the appointment');
        }
    } catch (error) {
        console.error('Error editing appointment:', error);
        alert('An error occurred while editing the appointment.');
    }
},

  
      async cancelAppointment(appointmentId) {
        try {
          const response = await axios.post(`http://127.0.0.1:8000/appointment/api/appointments/cancel/${appointmentId}/`);
  
          if (response.status === 200) {
            this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
            alert('Appointment canceled successfully');
          } else {
            alert('Failed to cancel appointment');
          }
        } catch (error) {
          console.error('Error canceling appointment:', error);
          alert('An error occurred while canceling the appointment.');
        }
      },
  
      async rescheduleAppointment(appointmentId) {
        try {
          const newDateTime = prompt('Enter the new date and time (YYYY-MM-DD HH:MM):');
          if (!newDateTime) {
            return;
          }
  
          const requestData = {
            new_datetime: newDateTime,
          };
  
          const response = await axios.post(
            `http://127.0.0.1:8000/appointment/api/appointments/reschedule/${appointmentId}/`,
            requestData
          );
  
          if (response.status === 200) {
            alert('Appointment rescheduled successfully');
            const updatedAppointment = response.data;
  
            const index = this.appointments.findIndex(item => item.id === appointmentId);
            if (index !== -1) {
              this.appointments[index] = updatedAppointment;
            }
          } else {
            alert('Failed to reschedule the appointment');
          }
        } catch (error) {
          console.error('Error rescheduling appointment:', error);
          alert('An error occurred while rescheduling the appointment.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #007bff;
    color: #fff;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  