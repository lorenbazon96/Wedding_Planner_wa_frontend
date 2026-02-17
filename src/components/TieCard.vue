<template>
  <div class="salon-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="tie.gallery && tie.gallery.length ? tie.gallery[0] : 'https://via.placeholder.com/420x200'" class="w-100 h-100 salon-img" alt="tie" />
      </div>

      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="mb-1 salon-title">{{ tie.name }}</h5>

            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ tie.rating }}</small>
            </div>

            <p class="mb-1">📍 {{ tie.address }}</p>
            <p class="mb-1">📞 {{ tie.phone }}</p>
            <p class="mb-2">📧 {{ tie.email }}</p>
          </div>

          <div>
            <button
              class="btn btn-dark rounded-pill px-4 py-1"
              @click="$emit('read-more', tie)"
            >
              Read more...
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TieCard",
  props: {
    tie: { type: Object, required: true },
  },
  emits: ["read-more"],
};
</script>

<style scoped>
.salon-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.salon-img {
  object-fit: cover;
  min-height: 150px;
}
.salon-title {
  font-family: "Georgia", "Times New Roman", serif;
}
</style>
