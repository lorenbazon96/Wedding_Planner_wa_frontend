<template>
  <div
    class="generic-details bg-white rounded-4 shadow-sm p-3 h-100 d-flex flex-column"
  >
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div class="d-flex flex-column flex-md-row gap-3">
        <img :src="item.gallery && item.gallery.length ? item.gallery[0] : 'https://via.placeholder.com/260x190'" :alt="item.name" class="rounded-3 item-main-img" />

        <div>
          <h3 class="fw-bold mb-1">{{ item.name }}</h3>

          <div class="d-flex align-items-center mb-2">
            <span class="me-1">{{ item.rating }}</span>
            <span class="text-warning">★★★★★</span>
          </div>

          <div class="small">
            <div class="mb-1">📍 {{ item.address }}</div>
            <div class="mb-1">📞 {{ item.phone }}</div>
            <div class="mb-1">📧 {{ item.email }}</div>
            <div v-if="item.workingHours">
              <div>🕒 Mon: {{ item.workingHours.mon }}</div>
              <div>Tue: {{ item.workingHours.tue }}</div>
              <div>Wed: {{ item.workingHours.wed }}</div>
              <div>Thu: {{ item.workingHours.thu }}</div>
              <div>Fri: {{ item.workingHours.fri }}</div>
              <div>Sat: {{ item.workingHours.sat }}</div>
              <div>Sun: {{ item.workingHours.sun }}</div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-link p-0 fs-4" @click="$emit('back')">⬅️</button>
    </div>

    <div class="d-flex gap-2 mb-3">
      <button
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'gallery' }"
        @click="activeTab = 'gallery'"
      >
        Gallery
      </button>
      <button
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'contact' }"
        @click="$emit('open-chat')"
      >
        Chat
      </button>

      <button
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'contact' }"
        @click="activeTab = 'contact'"
      >
        Contact us
      </button>
      <button
        class="tab-btn ms-auto"
        :class="{ 'tab-btn-active': activeTab === 'select' }"
        @click="activeTab = 'select'"
      >
        Select
      </button>
    </div>

    <div class="flex-grow-1 overflow-auto">
      <div v-if="activeTab === 'gallery'" class="row g-3">
        <template v-if="item.gallery && item.gallery.length">
          <div v-for="(img, i) in item.gallery" :key="i" class="col-12 col-md-6">
            <img :src="img" alt="" class="w-100 rounded-4 gallery-img" />
          </div>
        </template>
        <p v-else class="text-muted">No images available.</p>
      </div>

      <div v-else-if="activeTab === 'contact'">
        <p class="mb-0">📞 {{ item.phone }}</p>
        <p class="mb-0">📧 {{ item.email }}</p>
        <p class="mb-0">📍 {{ item.address }}</p>
        <p v-if="item.website" class="mb-0">
          🌐 <a :href="item.website" target="_blank">{{ item.website }}</a>
        </p>
        <p v-if="item.instagram" class="mb-0">
          📷 <a :href="item.instagram" target="_blank">{{ item.instagram }}</a>
        </p>
      </div>

      <div v-else-if="activeTab === 'select'" class="mt-2">
        <div class="mb-3 row align-items-center">
          <label class="col-sm-3 col-form-label">This is your pick?</label>
          <div class="col-sm-9">
            <select v-model="form.isPick" class="form-select rounded-pill">
              <option value="">Choose…</option>
              <option value="yes">Yes</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>
        </div>

        <div class="mb-3 row align-items-center">
          <label class="col-sm-3 col-form-label">Appointment date:</label>
          <div class="col-sm-9">
            <input
              type="date"
              v-model="form.appointmentDate"
              class="form-control rounded-pill"
            />
          </div>
        </div>

        <div class="mb-3 row align-items-center">
          <label class="col-sm-3 col-form-label">{{ fieldLabel }}:</label>
          <div class="col-sm-9">
            <input
              type="text"
              v-model="form.customField"
              class="form-control rounded-pill"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label class="col-sm-3 col-form-label">Notes:</label>
          <div class="col-sm-9">
            <textarea
              v-model="form.notes"
              rows="3"
              class="form-control rounded-4"
            ></textarea>
          </div>
        </div>

        <div class="mb-4 row align-items-center">
          <label class="col-sm-3 col-form-label">Price:</label>
          <div class="col-sm-9">
            <input
              type="number"
              v-model.number="form.price"
              class="form-control rounded-pill"
            />
          </div>
        </div>

        <button
          class="btn btn-primary rounded-pill px-4"
          @click="saveSelection"
        >
          💾 Save
        </button>
        <span v-if="saved" class="ms-2 text-success fw-bold">✅ Saved!</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "GenericDetails",
  props: {
    item: {
      type: Object,
      required: true,
    },
    fieldLabel: {
      type: String,
      default: "Details",
    },
  },
  emits: ["back", "save", "open-chat"],
  data() {
    return {
      activeTab: "gallery",
      saved: false,
      form: {
        isPick: "",
        appointmentDate: "",
        customField: "",
        notes: "",
        price: null,
      },
    };
  },
  async mounted() {
    try {
      const res = await api.get("/selections/" + this.item.id);
      if (res.data && (res.data.isPick || res.data.appointmentDate || res.data.customField || res.data.notes || res.data.price)) {
        this.form.isPick = res.data.isPick || "";
        this.form.appointmentDate = res.data.appointmentDate
          ? new Date(res.data.appointmentDate).toISOString().slice(0, 10)
          : "";
        this.form.customField = res.data.customField || "";
        this.form.notes = res.data.notes || "";
        this.form.price = res.data.price ?? null;
      }
    } catch (e) {
      // no existing selection
    }
  },
  methods: {
    async saveSelection() {
      await api.post("/selections", {
        vendor: this.item.id,
        ...this.form,
      });
      this.saved = true;
      setTimeout(() => { this.saved = false; }, 2000);
      this.$emit("save", {
        itemId: this.item.id,
        ...this.form,
      });
    },
  },
};
</script>

<style scoped>
.item-main-img {
  width: 260px;
  height: 190px;
  object-fit: cover;
}

.gallery-img {
  height: 220px;
  object-fit: cover;
}

.tab-btn {
  border-radius: 999px;
  padding: 0.35rem 1.4rem;
  border: none;
  background: #0d1750;
  opacity: 0.35;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
}

.tab-btn-active {
  opacity: 1;
}
</style>
