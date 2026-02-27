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

    <div class="mt-auto"></div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "APriestCard",

  data() {
    return {
      priestName: "",
      selectedDate: "",
      selectedTime: "",
      debounceTimer: null,
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
    async savePriest() {
      try {
        if (!this.priestName || !this.selectedDate || !this.selectedTime)
          return;

        const token = localStorage.getItem("token");
        if (!token) return;

        await api.post("/priest-meeting", {
          priestName: this.priestName,
          date: this.selectedDate,
          time: this.selectedTime,
        });
      } catch (error) {
        console.error("SAVE ERROR:", error.response?.data || error.message);
      }
    },

    async fetchPriest() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/priest-meeting");

        if (!res.data) return;

        this.priestName = res.data.priestName;
        this.selectedDate = res.data.date;
        this.selectedTime = res.data.time;
      } catch (error) {
        console.error("FETCH ERROR:", error.response?.data || error.message);
      }
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.savePriest();
      }, 600);
    },
  },

  mounted() {
    const today = new Date().toISOString().slice(0, 10);
    this.selectedDate = today;

    this.fetchPriest();
  },

  watch: {
    priestName() {
      this.debouncedSave();
    },
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
