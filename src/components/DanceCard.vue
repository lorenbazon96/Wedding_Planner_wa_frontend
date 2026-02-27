<template>
  <div
    class="dance-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">First dance course</h5>

    <div class="mb-3">
      <label class="form-label small mb-1">Song</label>
      <input
        type="text"
        v-model="song"
        class="form-control date-time-input"
        placeholder="Enter song for first dance..."
      />
    </div>

    <div class="flex-grow-1 overflow-auto">
      <table class="table table-sm align-middle text-center mb-0">
        <thead class="table-light sticky-top">
          <tr>
            <th style="width: 150px">Date</th>
            <th style="width: 120px">Time</th>
            <th>Place</th>
            <th style="width: 80px">Confirmed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in schedule" :key="index">
            <td>
              <input
                type="date"
                v-model="entry.date"
                class="form-control form-control-sm date-time-input"
              />
            </td>
            <td>
              <input
                type="time"
                v-model="entry.time"
                class="form-control form-control-sm date-time-input"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="entry.place"
                class="form-control form-control-sm"
              />
            </td>
            <td>
              <input
                type="checkbox"
                v-model="entry.confirmed"
                class="form-check-input"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-outline-dark rounded-pill mt-2" @click="addRow">
        Add Row
      </button>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "DanceCard",
  data() {
    return {
      song: "",
      schedule: [{ date: "", time: "", place: "", confirmed: false }],
      debounceTimer: null,
    };
  },
  methods: {
    addRow() {
      this.schedule.push({ date: "", time: "", place: "", confirmed: false });
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveDance();
      }, 600);
    },

    async saveDance() {
      try {
        await api.post("/dance", {
          song: this.song,
          schedule: this.schedule,
        });
      } catch (err) {
        console.error("SAVE DANCE ERROR:", err.response?.data || err.message);
      }
    },

    async fetchDance() {
      try {
        const res = await api.get("/dance");

        if (res.data) {
          this.song = res.data.song || "";
          this.schedule = res.data.schedule?.length
            ? res.data.schedule
            : [{ date: "", time: "", place: "", confirmed: false }];
        }
      } catch (err) {
        console.error("FETCH DANCE ERROR:", err.response?.data || err.message);
      }
    },
  },

  watch: {
    song() {
      this.debouncedSave();
    },
    schedule: {
      deep: true,
      handler() {
        this.debouncedSave();
      },
    },
  },

  mounted() {
    this.fetchDance();
  },
};
</script>

<style scoped>
.dance-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.date-time-input {
  background-color: #f4e7cc;
  padding: 0.5rem 1rem;
  border: 1px solid #d1bfa7;
  font-size: 0.95rem;
  color: #333;
}
</style>
