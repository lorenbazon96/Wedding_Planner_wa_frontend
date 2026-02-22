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
import axios from "axios";

export default {
  name: "DateAndTimeCard",

  data() {
    return {
      selectedDate: "",
      selectedTime: "",
      debounceTimer: null,
    };
  },

  methods: {
    async saveDateTime() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axios.post(
          "http://localhost:5000/api/church-datetime",
          {
            date: this.selectedDate,
            time: this.selectedTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error("SAVE ERROR:", error.response?.data || error.message);
      }
    },

    async fetchDateTime() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/church-datetime",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.data) return;

        this.selectedDate = res.data.date;
        this.selectedTime = res.data.time;
      } catch (error) {
        console.error("FETCH ERROR:", error.response?.data || error.message);
      }
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveDateTime();
      }, 600);
    },
  },

  mounted() {
    this.selectedDate = new Date().toISOString().slice(0, 10);
    this.selectedTime = "12:00";

    this.fetchDateTime();
  },

  watch: {
    selectedDate() {
      this.debouncedSave();
    },
    selectedTime() {
      this.debouncedSave();
    },
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
