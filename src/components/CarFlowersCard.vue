<template>
  <div class="car-flowers-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="car.gallery && car.gallery.length ? car.gallery[0] : 'https://via.placeholder.com/420x200'" class="w-100 h-100 car-img" alt="car flower shop" />
      </div>
      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="shop-title">{{ car.name }}</h5>
            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ car.rating }}</small>
            </div>
            <p class="mb-1">📍 {{ car.address }}</p>
            <p class="mb-1">📞 {{ car.phone }}</p>
            <p class="mb-2">📧 {{ car.email }}</p>
          </div>
          <div>
            <button
              class="btn btn-dark rounded-pill px-4 py-1"
              @click="$emit('read-more', car)"
            >
              View car flowers
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarFlowersCard",
  props: {
    car: { type: Object, required: true },
  },
  emits: ["read-more"],
};
</script>

<style scoped>
.car-flowers-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.car-img {
  object-fit: cover;
  min-height: 150px;
}
.shop-title {
  font-family: Georgia, serif;
}
</style>
