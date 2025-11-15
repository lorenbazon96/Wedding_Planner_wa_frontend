<template>
  <div class="band-card mb-3 rounded-4 overflow-hidden">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img :src="band.img" class="w-100 h-100 band-img" alt="band" />
      </div>
      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 class="band-title">{{ band.name }}</h5>
            <div class="mb-1">
              <span class="text-warning">★ ★ ★ ★ ★</span>
              <small class="text-muted ms-2">{{ band.rating }}</small>
            </div>
            <p class="mb-1">📍 {{ band.address }}</p>
            <p class="mb-2">⏱️ {{ band.status }}</p>
          </div>
          <div>
            <button class="btn btn-dark rounded-pill px-4 py-1">
              View band
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BandCard",
  props: {
    band: { type: Object, required: true },
  },
};
</script>

<style scoped>
.band-card {
  background: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.band-img {
  object-fit: cover;
  min-height: 150px;
}
.band-title {
  font-family: Georgia, serif;
}
</style>
