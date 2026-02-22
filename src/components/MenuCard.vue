<template>
  <div
    class="menu-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold mb-3 text-center">Wedding Menu</h5>

    <div class="flex-grow-1 overflow-auto">
      <table class="table table-sm align-middle text-center mb-0">
        <thead class="table-light sticky-top">
          <tr>
            <th style="width: 200px">Dish Name</th>
            <th style="width: 120px">Time</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(dish, index) in menu" :key="index">
            <td>
              <input
                type="text"
                v-model="dish.name"
                class="form-control form-control-sm beige-input"
                placeholder="Enter dish name"
              />
            </td>

            <td>
              <input
                type="time"
                v-model="dish.time"
                class="form-control form-control-sm beige-input"
              />
            </td>

            <td>
              <textarea
                v-model="dish.description"
                class="form-control form-control-sm"
                placeholder="Enter description"
                rows="1"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-dark rounded-pill mt-2" @click="addDish">
        Add Dish
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuCard",

  data() {
    return {
      menu: [{ name: "", time: "", description: "" }],
      debounceTimer: null,
    };
  },

  methods: {
    addDish() {
      this.menu.push({ name: "", time: "", description: "" });
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveMenu();
      }, 600);
    },

    async saveMenu() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axios.post(
          "http://localhost:5000/api/menu",
          { menu: this.menu },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.error("SAVE MENU ERROR:", err.response?.data || err.message);
      }
    },

    async fetchMenu() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/menu", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.menu) this.menu = res.data.menu;
      } catch (err) {
        console.error("FETCH MENU ERROR:", err.response?.data || err.message);
      }
    },
  },

  watch: {
    menu: {
      deep: true,
      handler() {
        this.debouncedSave();
      },
    },
  },

  mounted() {
    this.fetchMenu();
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
