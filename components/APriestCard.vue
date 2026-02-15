<template>
  <div
    class="a-priest-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">Priest Details</h5>

    <div class="mb-3">
      <label class="form-label small mb-1">Priest Full Name</label>
      <input
        type="text"
        v-model="priestName"
        class="form-control"
        placeholder="Enter priest's full name"
      />
    </div>

    <div class="mb-3">
      <label class="form-label small mb-1">Select Date</label>
      <input
        type="date"
        v-model="selectedDate"
        class="form-control date-time-input"
        :min="minDate"
      />
    </div>

    <div class="mb-3">
      <label class="form-label small mb-1">Enter Time</label>
      <input
        type="time"
        v-model="selectedTime"
        class="form-control date-time-input"
        :disabled="!selectedDate"
      />
    </div>

    <div class="mt-auto">
      <button class="btn btn-dark rounded-pill w-100" @click="saveDetails">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "APriestCard",
  data() {
    return {
      priestName: "",
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedTime: "",
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
  },
  methods: {
    saveDetails() {
      if (!this.priestName || !this.selectedDate || !this.selectedTime) {
        alert("Please enter priest's name, date, and time.");
        return;
      }
      const meetingSlot = `${this.selectedDate} ${this.selectedTime}`;
      console.log("Saved:", this.priestName, meetingSlot);
      alert(`Saved: ${this.priestName} for ${meetingSlot}`);
    },
  },
};
</script>

<style scoped>
.a-priest-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.form-label {
  font-size: 0.9rem;
}

.date-time-input {
  background-color: #f4e7cc;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1bfa7;
  font-size: 0.95rem;
  color: #333;
}
</style>
