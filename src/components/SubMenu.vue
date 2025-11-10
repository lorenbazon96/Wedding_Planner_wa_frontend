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
import bride from "@/assets/bride.png";
import ring from "@/assets/ring.png";
import hairdresser from "@/assets/hairdresser.png";
import heels from "@/assets/heels.png";
import nails from "@/assets/nails.png";
import maid from "@/assets/maid.png";
import tai from "@/assets/tai.png";
import groom from "@/assets/groom.png";
import shirt from "@/assets/shirt.png";
import suit from "@/assets/suit.png";
import shoes from "@/assets/shoes.png";
import car from "@/assets/car.png";
import barber from "@/assets/barber.png";
import time from "@/assets/time.png";
import church from "@/assets/church.png";
import flowers from "@/assets/flowers.png";
import lapel from "@/assets/lapel.png";
import bouquet from "@/assets/bouquet.png";
import engagement from "@/assets/engagement.png";
import music from "@/assets/music.png";
import priest from "@/assets/priest.png";
import note from "@/assets/note.png";
import readers from "@/assets/readers.png";
import confetti from "@/assets/confetti.png";
import band from "@/assets/band.png";
import menu from "@/assets/menu.png";
import halla from "@/assets/halla.png";
import cake from "@/assets/cake.png";
import dance from "@/assets/dance.png";

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
            icon: bride,
          },
          { label: "Rings", icon: ring },
          { label: "Shoes", icon: heels },
          { label: "Hairdresser", icon: hairdresser },
          { label: "Nails", icon: nails },
          {
            label: "Maid of Honor",
            icon: maid,
          },
        ],
        groom: [
          { label: "Tie", icon: tai },
          { label: "Shoes", icon: shoes },
          { label: "Shirt", icon: shirt },
          { label: "Suit", icon: suit },
          { label: "Hairdresser", icon: hairdresser },
          { label: "Barber", icon: barber },
          { label: "Best Man", icon: groom },
        ],
        flowers: [
          { label: "Bouquet", icon: bouquet },
          { label: "Lapel", icon: lapel },
          {
            label: "Car flowers",
            icon: car,
          },
          { label: "Hall flowers", icon: flowers },
          {
            label: "Church flowers",
            icon: church,
          },
        ],
        church: [
          { label: "Date & Time", icon: time },
          {
            label: "Engagement course",
            icon: engagement,
          },
          { label: "Music", icon: music },
          { label: "A Priest", icon: priest },
          { label: "Readers", icon: readers },
          { label: "Documents", icon: note },
          { label: "Confetti", icon: confetti },
        ],
        hall: [
          { label: "Hall", icon: halla },
          { label: "Menu", icon: menu },
          { label: "Cake", icon: cake },
          { label: "Band", icon: band },
          { label: "First dance", icon: dance },
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
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.sub-item.active,
.sub-item:hover {
  background: #d4af37;
  color: #fff;
}
.icon-img {
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  object-fit: contain;
  filter: invert(16%) sepia(89%) saturate(894%) hue-rotate(199deg)
    brightness(90%) contrast(90%);
}
</style>
