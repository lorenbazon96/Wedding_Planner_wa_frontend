<template>
  <div
    class="readers-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">Readers</h5>

    <div class="flex-grow-1 overflow-auto">
      <table class="table table-sm align-middle text-center mb-0">
        <thead class="table-light sticky-top">
          <tr>
            <th>Full Name</th>
            <th>Reading</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reader, index) in readers" :key="index">
            <td>
              <input
                type="text"
                v-model="reader.fullName"
                class="form-control form-control-sm"
                placeholder="Enter full name"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="reader.reading"
                class="form-control form-control-sm"
                placeholder="Enter reading"
              />
            </td>
            <td>
              <input
                type="checkbox"
                v-model="reader.done"
                class="form-check-input"
              />
            </td>
            <td>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeReader(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-outline-dark rounded-pill mt-2" @click="addReader">
        Add Reader
      </button>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "ReadersCard",

  data() {
    return {
      readers: [{ fullName: "", reading: "", done: false }],
      debounceTimer: null,
    };
  },

  methods: {
    addReader() {
      this.readers.push({ fullName: "", reading: "", done: false });
    },

    removeReader(index) {
      this.readers.splice(index, 1);
      this.debouncedSave();
    },

    async saveReaders() {
      try {
        await api.post("/readers", {
          readers: this.readers,
        });
      } catch (err) {
        console.error("SAVE READERS ERROR:", err.response?.data || err.message);
      }
    },

    async fetchReaders() {
      try {
        const res = await api.get("/readers");

        if (res.data?.readers?.length) {
          this.readers = res.data.readers;
        }
      } catch (err) {
        console.error(
          "FETCH READERS ERROR:",
          err.response?.data || err.message,
        );
      }
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveReaders();
      }, 600);
    },
  },

  watch: {
    readers: {
      handler() {
        this.debouncedSave();
      },
      deep: true,
    },
  },

  mounted() {
    this.fetchReaders();
  },
};
</script>

<style scoped>
.readers-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.form-control-sm {
  background-color: #f4e7cc;
  border: 1px solid #d1bfa7;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
}
</style>
