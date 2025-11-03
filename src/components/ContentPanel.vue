<template>
  <div class="content-panel rounded-4 p-3 h-100 d-flex flex-column">
    <div v-if="showSalons" class="d-flex flex-column h-100">
      <div class="d-flex flex-column flex-md-row gap-2 mb-3">
        <div class="flex-grow-1 position-relative">
          <input
            v-model="search"
            type="text"
            class="form-control rounded-pill ps-5"
            placeholder="Search..."
          />
          <span class="search-icon">🔍</span>
        </div>
        <select class="form-select rounded-pill w-auto">
          <option>Sort by</option>
          <option>Name</option>
          <option>Rating</option>
        </select>
      </div>

      <div class="flex-grow-1 overflow-auto pe-1">
        <SalonCard
          v-for="salon in filteredSalons"
          :key="salon.id"
          :salon="salon"
        />
      </div>
    </div>

    <div
      v-else
      class="d-flex flex-column justify-content-center align-items-center h-100 text-center"
    >
      <h4 class="mb-2 text-muted">This section will have its own page</h4>
      <p class="text-muted">
        Budget, notes, guests, chat ... will lead to different components.
      </p>
    </div>
  </div>
</template>

<script>
import SalonCard from "./SalonCard.vue";

export default {
  name: "ContentPanel",
  components: { SalonCard },
  props: {
    category: String,
    sub: String,
  },
  data() {
    return {
      search: "",
      salons: [
        {
          id: 1,
          name: "Angels-Wedding",
          rating: 4.9,
          address: "Zagrebačka ul. 1, 52100, Pula",
          status: "open",
          img: "https://picsum.photos/420/200?random=30",
        },
        {
          id: 2,
          name: "Vjenčanice Biba Rijeka",
          rating: 4.9,
          address: "Ul. Strossmayerova 2b, 51000 Rijeka",
          status: "open",
          img: "https://picsum.photos/420/200?random=31",
        },
        {
          id: 3,
          name: "Glamour Bridal",
          rating: 4.7,
          address: "Ilica 15, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=32",
        },
      ],
    };
  },
  computed: {
    showSalons() {
      return ["bride", "groom", "flowers", "church", "hall"].includes(
        this.category
      );
    },
    filteredSalons() {
      if (!this.search) return this.salons;
      return this.salons.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.content-panel {
  background: rgba(244, 231, 204, 0.95);
  border-radius: 1.5rem;
  height: 100%;
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
}
</style>
