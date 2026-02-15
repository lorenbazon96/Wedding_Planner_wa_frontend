<template>
  <div
    class="engagement-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">Engagement Course Schedule</h5>

    <div class="d-flex flex-column flex-md-row gap-3 mb-3">
      <div class="flex-grow-1">
        <label class="form-label small mb-1">Start Date</label>
        <input
          type="date"
          v-model="startDate"
          class="form-control date-time-input"
        />
      </div>
      <div class="flex-grow-1">
        <label class="form-label small mb-1">End Date</label>
        <input
          type="date"
          v-model="endDate"
          class="form-control date-time-input"
        />
      </div>
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
export default {
  name: "EngagementCard",
  data() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      schedule: [{ date: "", time: "", place: "", confirmed: false }],
    };
  },
  methods: {
    addRow() {
      this.schedule.push({ date: "", time: "", place: "", confirmed: false });
    },
  },
};
</script>

<style scoped>
.engagement-card {
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
