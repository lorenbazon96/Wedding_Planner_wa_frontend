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
import bride from "@/assets/bride.png";
import groom from "@/assets/groom.png";
import church from "@/assets/church.png";
import hall from "@/assets/hall.png";
import flowers from "@/assets/flowers.png";
import budget from "@/assets/budget.png";
import note from "@/assets/note.png";
import guests from "@/assets/guests.png";
import chat from "@/assets/chat.png";
import ring from "@/assets/ring.png";

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
          icon: bride,
        },
        {
          id: "groom",
          name: "Groom",
          icon: groom,
        },
        {
          id: "flowers",
          name: "Flowers",
          icon: flowers,
        },
        {
          id: "church",
          name: "Church",
          icon: church,
        },
        {
          id: "hall",
          name: "Wedding hall",
          icon: hall,
        },
        {
          id: "budget",
          name: "Budget",
          icon: budget,
        },
        {
          id: "notes",
          name: "Notes",
          icon: note,
        },
        {
          id: "guests",
          name: "Guests",
          icon: guests,
        },
        { id: "chat", name: "Chat", icon: chat },
        {
          id: "day",
          name: "THE Day",
          icon: ring,
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
  min-height: calc(100vh - 200px);
}
.left-item {
  padding: 0.4rem 0.6rem;
  border-radius: 999px 0 0 999px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.left-item.active,
.left-item:hover {
  background: linear-gradient(90deg, #d4af37 0%, #f5ebda 100%);
}
.icon-img {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  object-fit: contain;
  filter: invert(16%) sepia(89%) saturate(894%) hue-rotate(199deg)
    brightness(90%) contrast(90%);
}
.item-text {
  font-weight: 500;
}
</style>
