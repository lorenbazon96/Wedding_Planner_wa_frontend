<template>
  <div class="bouquet-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img
          :src="flower.gallery && flower.gallery.length ? flower.gallery[0] : 'https://via.placeholder.com/420x200'"
          class="w-100 h-100 bouquet-img"
          alt="flower shop"
        />
      </div>
      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="shop-title">{{ flower.name }}</h5>
            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ flower.rating }}</small>
            </div>
            <p class="mb-1">📍 {{ flower.address }}</p>
            <p class="mb-1">📞 {{ flower.phone }}</p>
            <p class="mb-2">📧 {{ flower.email }}</p>
          </div>
          <div>
            <button
              class="btn btn-dark rounded-pill px-4 py-1"
              @click="$emit('read-more', flower)"
            >
              View bouquets
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BouquetCard",
  props: {
    flower: { type: Object, required: true },
  },
  emits: ["read-more"],
};
</script>

<style scoped>
.bouquet-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.bouquet-img {
  object-fit: cover;
  min-height: 150px;
}
.shop-title {
  font-family: Georgia, serif;
}
</style>
