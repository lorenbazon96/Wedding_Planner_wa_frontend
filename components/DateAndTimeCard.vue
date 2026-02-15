<template>
  <div
    class="date-time-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">Church Date & Time</h5>

    <div class="d-flex flex-column flex-md-row gap-3">
      <div class="flex-grow-1">
        <label class="form-label small mb-1">Select Date</label>
        <input
          type="date"
          v-model="selectedDate"
          class="form-control date-time-input"
        />
      </div>

      <div class="flex-grow-1">
        <label class="form-label small mb-1">Select Time</label>
        <input
          type="time"
          v-model="selectedTime"
          class="form-control date-time-input"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateAndTimeCard",
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedTime: "12:00",
    };
  },
};
</script>

<style scoped>
.date-time-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
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
