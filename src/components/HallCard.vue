<template>
  <div class="hall-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="hall.img" class="w-100 h-100 hall-img" alt="hall" />
      </div>
      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="hall-title">{{ hall.name }}</h5>
            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ hall.rating }}</small>
            </div>
            <p class="mb-1">📍 {{ hall.address }}</p>
            <p class="mb-2">⏱️ {{ hall.status }}</p>
          </div>
          <div>
            <button class="btn btn-dark rounded-pill px-4 py-1">
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
  name: "HallCard",
  props: {
    hall: { type: Object, required: true },
  },
};
</script>

<style scoped>
.hall-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.hall-img {
  object-fit: cover;
  min-height: 150px;
}
.hall-title {
  font-family: Georgia, serif;
}
</style>
