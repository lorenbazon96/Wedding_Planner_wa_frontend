<template>
  <div class="cake-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="cake.img" class="w-100 h-100 cake-img" alt="wedding cake" />
      </div>

      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="cake-title">{{ cake.name }}</h5>

            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ cake.rating }}</small>
            </div>

            <p class="mb-1">📍 {{ cake.address }}</p>
            <p class="mb-2">⏱️ {{ cake.status }}</p>
          </div>

          <div>
            <button class="btn btn-dark rounded-pill px-4 py-1">
              View cakes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CakeCard",
  props: {
    cake: { type: Object, required: true },
  },
};
</script>

<style scoped>
.cake-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.cake-img {
  object-fit: cover;
  min-height: 150px;
}
.cake-title {
  font-family: Georgia, serif;
}
</style>
