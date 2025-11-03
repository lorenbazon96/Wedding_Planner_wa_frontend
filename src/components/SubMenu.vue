<template>
  <div class="submenu rounded-4 p-3 h-100">
    <ul class="list-unstyled mb-0">
      <li
        v-for="item in items"
        :key="item.id"
        class="sub-item d-flex align-items-center gap-3 mb-2"
        :class="{ active: item.label === activeSub }"
        @click="$emit('select-sub', item.label)"
        role="button"
      >
        <img :src="item.icon" alt="" class="icon-img" />
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    category: String,
    activeSub: String,
  },
  computed: {
    items() {
      const map = {
        bride: [
          {
            label: "Wedding dress",
            icon: "https://picsum.photos/36?random=11",
          },
          { label: "Rings", icon: "https://picsum.photos/36?random=12" },
          { label: "Shoes", icon: "https://picsum.photos/36?random=13" },
          { label: "Hairdresser", icon: "https://picsum.photos/36?random=14" },
          { label: "Nails", icon: "https://picsum.photos/36?random=15" },
          {
            label: "Maid of honor",
            icon: "https://picsum.photos/36?random=16",
          },
        ],
        groom: [
          { label: "Suit", icon: "https://picsum.photos/36?random=17" },
          { label: "Rings", icon: "https://picsum.photos/36?random=18" },
          { label: "Shoes", icon: "https://picsum.photos/36?random=19" },
          { label: "Barber", icon: "https://picsum.photos/36?random=20" },
        ],
        flowers: [
          { label: "Bouquet", icon: "https://picsum.photos/36?random=21" },
          { label: "Decorations", icon: "https://picsum.photos/36?random=22" },
          {
            label: "Venue flowers",
            icon: "https://picsum.photos/36?random=23",
          },
        ],
        church: [
          { label: "Ceremony", icon: "https://picsum.photos/36?random=24" },
          { label: "Music", icon: "https://picsum.photos/36?random=25" },
          { label: "Documents", icon: "https://picsum.photos/36?random=26" },
        ],
        hall: [
          { label: "Venues", icon: "https://picsum.photos/36?random=27" },
          { label: "Catering", icon: "https://picsum.photos/36?random=28" },
        ],
      };
      return map[this.category] || [];
    },
  },
};
</script>

<style scoped>
.submenu {
  background: rgba(244, 231, 204, 0.95);
  border-radius: 1.5rem;
  height: 100%;
  min-height: calc(100vh - 130px);
}
.sub-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  transition: 0.2s;
}
.sub-item.active,
.sub-item:hover {
  background: #d4af37;
  color: #fff;
}
.icon-img {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  object-fit: cover;
}
</style>
