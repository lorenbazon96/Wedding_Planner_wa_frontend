<template>
  <div class="left-menu rounded-4 p-3 h-100">
    <ul class="list-unstyled mb-0">
      <li
        v-for="item in menu"
        :key="item.id"
        class="left-item d-flex align-items-center gap-3 mb-2"
        :class="{ active: item.id === active }"
        @click="$emit('select-category', item.id)"
        role="button"
      >
        <img :src="item.icon" alt="" class="icon-img" />
        <span class="item-text">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  props: {
    active: String,
  },
  data() {
    return {
      menu: [
        {
          id: "bride",
          name: "Bride",
          icon: "https://picsum.photos/40?random=1",
        },
        {
          id: "groom",
          name: "Groom",
          icon: "https://picsum.photos/40?random=2",
        },
        {
          id: "flowers",
          name: "Flowers",
          icon: "https://picsum.photos/40?random=3",
        },
        {
          id: "church",
          name: "Church",
          icon: "https://picsum.photos/40?random=4",
        },
        {
          id: "hall",
          name: "Wedding hall",
          icon: "https://picsum.photos/40?random=5",
        },
        {
          id: "budget",
          name: "Budget",
          icon: "https://picsum.photos/40?random=6",
        },
        {
          id: "notes",
          name: "Notes",
          icon: "https://picsum.photos/40?random=7",
        },
        {
          id: "guests",
          name: "Guests",
          icon: "https://picsum.photos/40?random=8",
        },
        { id: "chat", name: "Chat", icon: "https://picsum.photos/40?random=9" },
        {
          id: "day",
          name: "THE Day",
          icon: "https://picsum.photos/40?random=10",
        },
      ],
    };
  },
};
</script>

<style scoped>
.left-menu {
  background: rgba(255, 255, 255, 0.165);
  backdrop-filter: blur(2px);
  border-radius: 0 1.5rem 1.5rem 0;
  height: 100%;
  min-height: calc(100vh - 130px);
}
.left-item {
  padding: 0.4rem 0.6rem;
  border-radius: 999px 0 0 999px;
  transition: 0.2s;
}
.left-item.active,
.left-item:hover {
  background: linear-gradient(90deg, #d4af37 0%, #f5ebda 100%);
}
.icon-img {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  object-fit: cover;
}
.item-text {
  font-weight: 500;
}
</style>
