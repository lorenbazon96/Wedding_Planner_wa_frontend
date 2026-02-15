<template>
  <div class="shirt-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="shirt.img" class="w-100 h-100 shirt-img" alt="shirt" />
      </div>
      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="mb-1 shirt-title">{{ shirt.name }}</h5>
            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ shirt.rating }}</small>
            </div>
            <p class="mb-1">📍 {{ shirt.address }}</p>
            <p class="mb-2">⏱️ {{ shirt.status }}</p>
          </div>
          <div>
            <button
              class="btn btn-dark rounded-pill px-4 py-1"
              @click="$emit('read-more', shirt)"
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
  name: "ShirtCard",
  props: {
    shirt: { type: Object, required: true },
  },
  emits: ["read-more"],
};
</script>

<style scoped>
.shirt-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.shirt-img {
  object-fit: cover;
  min-height: 150px;
}
.shirt-title {
  font-family: "Georgia", "Times New Roman", serif;
}
</style>
