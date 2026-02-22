<template>
  <div class="content-panel p-4 shadow-xl rounded-2xl">
    <div class="mb-4">
      <table class="table table-sm align-middle text-center mb-0">
        <thead class="table-light sticky-top">
          <tr>
            <th>Women's Lapels</th>
            <th>Men's Lapels</th>
            <th>Children's Lapels</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                class="form-control form-control-sm text-center"
                v-model.number="lapels.women"
              />
            </td>
            <td>
              <input
                type="number"
                class="form-control form-control-sm text-center"
                v-model.number="lapels.men"
              />
            </td>
            <td>
              <input
                type="number"
                class="form-control form-control-sm text-center"
                v-model.number="lapels.children"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-4">
      <h5 class="mb-2">Assistants</h5>
      <table class="table table-sm align-middle mb-2 text-center">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Confirmed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(assistant, index) in assistants" :key="index">
            <td>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="assistant.name"
              />
            </td>
            <td class="align-middle">
              <input type="checkbox" v-model="assistant.checked" />
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-sm btn-primary" @click="addAssistant">
        Add Assistant
      </button>
    </div>

    <div class="mb-4">
      <h5 class="mb-2">Notes (Materials & Suppliers)</h5>
      <textarea class="form-control" v-model="notes"></textarea>
    </div>

    <!-- 🖼 Reference image -->
    <div>
      <h5 class="mb-2">Reference image for lapels</h5>
      <div class="d-flex align-items-center gap-3">
        <div style="max-width: 260px" class="flex-grow-1">
          <input
            type="file"
            accept="image/*"
            class="form-control form-control-sm"
            @change="onImageChange"
          />
        </div>

        <div
          v-if="imagePreview"
          class="border rounded p-1"
          style="width: 90px; height: 90px; overflow: hidden"
        >
          <img
            :src="imagePreview"
            alt="Lapels reference"
            class="w-100 h-100 object-fit-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LapelCard",

  data() {
    return {
      lapels: {
        women: 0,
        men: 0,
        children: 0,
      },
      assistants: [{ name: "", checked: false }],
      notes: "",
      imageFile: null,
      imagePreview: null,
      allLapels: [],
      debounceTimer: null,
    };
  },

  methods: {
    addAssistant() {
      this.assistants.push({ name: "", checked: false });
    },

    onImageChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.imageFile = file;
      this.imagePreview = URL.createObjectURL(file);

      this.debouncedSave();
    },

    async saveLapels() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axios.post(
          "http://localhost:5000/api/lapels",
          {
            women: this.lapels.women,
            men: this.lapels.men,
            children: this.lapels.children,
            assistants: this.assistants,
            notes: this.notes,
            image: null, // zasad
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

    async fetchLapels() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/lapels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const lapel = response.data;
        if (!lapel) return;

        this.lapels = {
          women: lapel.women ?? 0,
          men: lapel.men ?? 0,
          children: lapel.children ?? 0,
        };

        this.assistants = lapel.assistants?.length
          ? lapel.assistants
          : [{ name: "", checked: false }];

        this.notes = lapel.notes ?? "";

        this.imagePreview = lapel.image
          ? `http://localhost:5000${lapel.image}`
          : null;
      } catch (error) {
        console.error("FETCH ERROR:", error.response?.data || error.message);
      }
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveLapels();
      }, 800);
    },
  },

  mounted() {
    this.fetchLapels();
  },

  watch: {
    lapels: {
      deep: true,
      handler() {
        this.debouncedSave();
      },
    },
    assistants: {
      deep: true,
      handler() {
        this.debouncedSave();
      },
    },
    notes() {
      this.debouncedSave();
    },
  },
};
</script>
<style scoped>
.content-panel {
  background: rgba(244, 231, 204, 0.95);
  border-radius: 1.5rem;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-panel > .flex-grow-1 {
  min-height: 0;
}

.table {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
}

textarea {
  min-height: 160px;
  resize: vertical;
}
</style>
