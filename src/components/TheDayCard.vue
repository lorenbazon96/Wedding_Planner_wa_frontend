<template>
  <div
    class="menu-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">THE Day</h5>
    <div class="flex-grow-1 overflow-auto">
      <table class="table table-sm align-middle text-center mb-0">
        <thead class="table-light sticky-top">
          <tr>
            <th style="width: 200px">Location name</th>
            <th style="width: 120px">Time</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(location, index) in locations" :key="index">
            <td>
              <input
                type="text"
                v-model="location.name"
                class="form-control form-control-sm beige-input"
                placeholder="Enter location name"
              />
            </td>
            <td>
              <input
                type="time"
                v-model="location.time"
                class="form-control form-control-sm beige-input"
              />
            </td>
            <td>
              <textarea
                v-model="location.address"
                class="form-control form-control-sm"
                placeholder="Enter address"
                rows="1"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-dark rounded-pill mt-2" @click="addLocation">
        Add Location
      </button>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "TheDayCard",
  data() {
    return {
      locations: [{ name: "", time: "", address: "" }],
      debounceTimer: null,
    };
  },
  methods: {
    addLocation() {
      this.locations.push({ name: "", time: "", address: "" });
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveTheDay();
      }, 600);
    },

    async saveTheDay() {
      try {
        await api.post("/the-day", {
          locations: this.locations,
        });
      } catch (err) {
        console.error("SAVE THE DAY ERROR:", err.response?.data || err.message);
      }
    },

    async fetchTheDay() {
      try {
        const res = await api.get("/the-day");
        if (res.data?.locations?.length) {
          this.locations = res.data.locations;
        }
      } catch (err) {
        console.error(
          "FETCH THE DAY ERROR:",
          err.response?.data || err.message,
        );
      }
    },
  },

  watch: {
    locations: {
      deep: true,
      handler() {
        this.debouncedSave();
      },
    },
  },

  mounted() {
    this.fetchTheDay();
  },
};
</script>

<style scoped>
.menu-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.beige-input {
  background-color: #f4e7cc;
  border: 1px solid #d1bfa7;
  border-radius: 1.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
  color: #333;
}
</style>
