<template>
  <div class="content-panel rounded-4 p-3 h-100 d-flex flex-column">
    <div class="d-flex flex-column flex-md-row gap-2 mb-3">
      <div
        v-if="
          showSalons ||
          showRings ||
          showShoes ||
          showHairdresser ||
          showCozmetic
        "
        class="flex-grow-1 position-relative"
      >
        <input
          v-model="search"
          type="text"
          class="form-control rounded-pill ps-5"
          placeholder="Search..."
        />
        <span class="search-icon">🔍</span>
      </div>

      <select
        v-if="
          showSalons ||
          showRings ||
          showShoes ||
          showHairdresser ||
          showCozmetic
        "
        class="form-select rounded-pill w-auto"
      >
        <option>Sort by</option>
        <option>Name</option>
        <option>Rating</option>
      </select>
    </div>

    <div v-if="showSalons" class="flex-grow-1 overflow-auto pe-1">
      <SalonCard
        v-for="salon in filteredSalons"
        :key="salon.id"
        :salon="salon"
      />
    </div>

    <div v-else-if="showRings" class="flex-grow-1 overflow-auto pe-1">
      <RingsCard
        v-for="store in filteredStores"
        :key="store.id"
        :store="store"
      />
    </div>

    <div v-else-if="showShoes" class="flex-grow-1 overflow-auto pe-1">
      <ShoesCard v-for="shop in filteredShops" :key="shop.id" :store="shop" />
    </div>

    <div v-else-if="showHairdresser" class="flex-grow-1 overflow-auto pe-1">
      <HairdresserCard
        v-for="salon in filteredHairSalon"
        :key="salon.id"
        :store="salon"
      />
    </div>

    <div v-else-if="showCozmetic" class="flex-grow-1 overflow-auto pe-1">
      <CozmeticCard
        v-for="salon in filteredCozmetic"
        :key="salon.id"
        :store="salon"
      />
    </div>

    <div v-else-if="showMaidOfHonor" class="flex-grow-1 overflow-auto pe-1">
      <MaidOfHonorCard />
    </div>

    <div v-else-if="showTie" class="flex-grow-1 overflow-auto pe-1">
      <TieCard v-for="item in filteredTie" :key="item.id" :tie="item" />
    </div>

    <div v-else-if="showShoesG" class="flex-grow-1 overflow-auto pe-1">
      <ShoesGCard
        v-for="item in filteredStoresG"
        :key="item.id"
        :storeg="item"
      />
    </div>

    <div v-else-if="showShirts" class="flex-grow-1 overflow-auto pe-1">
      <ShirtCard
        v-for="shirt in filteredShirts"
        :key="shirt.id"
        :shirt="shirt"
      />
    </div>

    <div v-else-if="showSuit" class="flex-grow-1 overflow-auto pe-1">
      <SuitCard v-for="item in filteredSuits" :key="item.id" :suit="item" />
    </div>

    <div v-else-if="showHairdresserG" class="flex-grow-1 overflow-auto pe-1">
      <HairdresserGCard
        v-for="hairdresser in filteredHairdresserG"
        :key="hairdresser.id"
        :hairdresser="hairdresser"
      />
    </div>

    <div v-else-if="showBarber" class="flex-grow-1 overflow-auto pe-1">
      <BarberCard
        v-for="barber in filteredBarbers"
        :key="barber.id"
        :barber="barber"
      />
    </div>
    <div v-else-if="showBestMan" class="flex-grow-1 overflow-auto pe-1">
      <BestManCard />
    </div>

    <div v-else-if="showBudget" class="flex-grow-1 p-3 d-flex flex-column">
      <div class="bg-white rounded-4 shadow-sm p-3 d-flex flex-column h-100">
        <h5 class="fw-bold mb-3 text-center">Wedding Budget Items</h5>

        <div class="budget-table-wrapper flex-grow-1">
          <table class="table table-sm align-middle text-center mb-0">
            <thead class="table-light sticky-top">
              <tr>
                <th class="text-start">Item</th>
                <th style="width: 120px">Planned (€)</th>
                <th style="width: 120px">Spent (€)</th>
                <th style="width: 180px">Document</th>
                <th style="width: 110px">Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in budgetItems" :key="item.label">
                <td class="text-start">
                  <span class="d-flex align-items-center gap-2">
                    <img
                      v-if="item.icon"
                      :src="item.icon"
                      alt=""
                      class="icon-img"
                    />
                    {{ item.label }}
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control form-control-sm text-center"
                    v-model.number="item.planned"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control form-control-sm text-center"
                    v-model.number="item.spent"
                  />
                </td>
                <td>
                  <input type="file" class="form-control form-control-sm" />
                </td>
                <td>
                  <span
                    :class="{
                      'text-success': item.planned - item.spent > 0,
                      'text-danger': item.planned - item.spent < 0,
                    }"
                  >
                    {{ item.planned - item.spent }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else-if="showNotes" class="flex-grow-1 p-3 d-flex flex-column">
      <div
        class="bg-white rounded-4 shadow-sm p-3 h-100 d-flex flex-column gap-3"
      >
        <div class="d-flex gap-2">
          <input
            v-model="currentNote.title"
            type="text"
            class="form-control"
            placeholder="Note title..."
          />
          <select
            v-model="currentNote.priority"
            class="form-select"
            style="max-width: 150px"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div class="form-check d-flex align-items-center gap-2">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="currentNote.done"
              :id="'note-done-' + currentNote.id"
            />
            <label
              class="form-check-label small"
              :for="'note-done-' + currentNote.id"
            >
              Done
            </label>
          </div>
        </div>

        <textarea
          v-model="currentNote.text"
          class="form-control flex-grow-1"
          placeholder="Write your note here..."
        ></textarea>

        <div class="d-flex gap-3 align-items-center">
          <div>
            <label class="form-label small mb-1">Attach image</label>
            <input type="file" class="form-control form-control-sm" />
          </div>
          <div
            v-if="currentNote.image"
            class="border rounded p-1"
            style="width: 90px; height: 90px; overflow: hidden"
          >
            <img
              :src="currentNote.image"
              alt=""
              class="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
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
import RingsCard from "./RingsCard.vue";
import ShoesCard from "./ShoesCard.vue";
import HairdresserCard from "./HairdresserCard.vue";
import CozmeticCard from "./CozmeticCard.vue";
import MaidOfHonorCard from "./MaidOfHonorCard.vue";
import TieCard from "./TieCard.vue";
import ShoesGCard from "./ShoesGCard.vue";
import ShirtCard from "./ShirtCard.vue";
import SuitCard from "./SuitCard.vue";
import HairdresserGCard from "./HairdresserGCard.vue";
import BarberCard from "./BarberCard.vue";
import BestManCard from "./BestManCard.vue";

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
  name: "ContentPanel",
  components: {
    SalonCard,
    RingsCard,
    ShoesCard,
    HairdresserCard,
    CozmeticCard,
    MaidOfHonorCard,
    TieCard,
    ShoesGCard,
    ShirtCard,
    SuitCard,
    HairdresserGCard,
    BarberCard,
    BestManCard,
  },
  props: {
    category: String,
    sub: String,
  },
  data() {
    return {
      search: "",
      notesData: [
        {
          id: 1,
          title: "Checklist for photographer",
          priority: "high",
          done: false,
          text: "Ask about golden hour, backup, price.",
          image: "",
        },
        {
          id: 2,
          title: "Questions for the hall",
          priority: "medium",
          done: false,
          text: "How many people, cake, music until when...",
          image: "",
        },
        {
          id: 3,
          title: "Guests to call",
          priority: "low",
          done: true,
          text: "Marko, Ana, Luka...",
          image: "",
        },
      ],

      budgetItems: [
        { label: "Wedding dress", icon: bride, planned: 1200, spent: 800 },
        { label: "Rings", icon: ring, planned: 800, spent: 500 },
        { label: "Shoes (bride)", icon: heels, planned: 150, spent: 0 },
        {
          label: "Hairdresser (bride)",
          icon: hairdresser,
          planned: 90,
          spent: 0,
        },
        { label: "Nails", icon: nails, planned: 50, spent: 0 },
        { label: "Maid of Honor", icon: maid, planned: 120, spent: 0 },

        { label: "Tie", icon: tai, planned: 40, spent: 0 },
        { label: "Shoes (groom)", icon: shoes, planned: 120, spent: 0 },
        { label: "Shirt", icon: shirt, planned: 60, spent: 0 },
        { label: "Suit", icon: suit, planned: 350, spent: 0 },
        {
          label: "Hairdresser (groom)",
          icon: hairdresser,
          planned: 25,
          spent: 0,
        },
        { label: "Barber", icon: barber, planned: 25, spent: 0 },
        { label: "Best Man", icon: groom, planned: 80, spent: 0 },

        { label: "Bouquet", icon: bouquet, planned: 90, spent: 0 },
        { label: "Lapel", icon: lapel, planned: 25, spent: 0 },
        { label: "Car flowers", icon: car, planned: 70, spent: 0 },
        { label: "Hall flowers", icon: flowers, planned: 180, spent: 0 },
        { label: "Church flowers", icon: church, planned: 120, spent: 0 },

        { label: "Date & Time", icon: time, planned: 0, spent: 0 },
        { label: "Engagement course", icon: engagement, planned: 50, spent: 0 },
        { label: "Music (church)", icon: music, planned: 120, spent: 0 },
        { label: "A Priest", icon: priest, planned: 50, spent: 0 },
        { label: "Readers", icon: readers, planned: 0, spent: 0 },
        { label: "Documents", icon: note, planned: 30, spent: 0 },
        { label: "Confetti", icon: confetti, planned: 40, spent: 0 },

        { label: "Hall", icon: halla, planned: 1500, spent: 0 },
        { label: "Menu", icon: menu, planned: 900, spent: 0 },
        { label: "Cake", icon: cake, planned: 300, spent: 0 },
        { label: "Band", icon: band, planned: 700, spent: 0 },
        { label: "First dance", icon: dance, planned: 100, spent: 0 },
      ],

      salons: [
        {
          id: 1,
          name: "Angels-Wedding",
          rating: 4.9,
          address: "Zagrebačka ul. 1, Pula",
          status: "open",
          img: "https://picsum.photos/420/200?random=30",
        },
        {
          id: 2,
          name: "Vjenčanice Biba Rijeka",
          rating: 4.9,
          address: "Ul. Strossmayerova 2b, Rijeka",
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
      stores: [
        {
          id: 1,
          name: "Zlatarna Dodić",
          rating: 4.9,
          address: "Ilica 46, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=40",
        },
        {
          id: 2,
          name: "Zlatarna Celje",
          rating: 4.9,
          address: "Praška ulica 8, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=41",
        },
        {
          id: 3,
          name: "Prahir",
          rating: 4.7,
          address: "Ul. Vice Vukova 6, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=42",
        },
      ],
      shops: [
        {
          id: 1,
          name: "Aldo",
          rating: 4.9,
          address: "Varšavska 46, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=50",
        },
        {
          id: 2,
          name: "Mass",
          rating: 4.9,
          address: "Ilica 8, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=51",
        },
        {
          id: 3,
          name: "Zooek",
          rating: 4.7,
          address: "Vukovarska ul. 6, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=52",
        },
      ],
      hairSalon: [
        {
          id: 1,
          name: "Sasha",
          rating: 4.9,
          address: "Dalmatinska 4, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=60",
        },
        {
          id: 2,
          name: "Vikler i Ruž",
          rating: 4.9,
          address: "Frankopanska 12",
          status: "open",
          img: "https://picsum.photos/420/200?random=61",
        },
        {
          id: 3,
          name: "Hairque",
          rating: 4.7,
          address: "Vukovarska ul. 6, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=62",
        },
      ],
      cozmeticSalon: [
        {
          id: 1,
          name: "Estrella Beauty & academy",
          rating: 4.9,
          address: "Cetingradska 26, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=60",
        },
        {
          id: 2,
          name: "Vikler i Ruž",
          rating: 4.9,
          address: "Frankopanska 12",
          status: "open",
          img: "https://picsum.photos/420/200?random=61",
        },
        {
          id: 3,
          name: "De luxe",
          rating: 4.7,
          address: "Ilica 35, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=62",
        },
      ],
      ties: [
        {
          id: 1,
          name: "Croata",
          rating: 4.9,
          address: "Oktogon, Ilica 6, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=60",
        },
        {
          id: 2,
          name: "Galileo",
          rating: 4.9,
          address: "Medvedgradska 12",
          status: "open",
          img: "https://picsum.photos/420/200?random=61",
        },
      ],
      shopsg: [
        {
          id: 1,
          name: "Aldo",
          rating: 4.9,
          address: "Varšavska 46, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=50",
        },
        {
          id: 2,
          name: "Mass",
          rating: 4.9,
          address: "Ilica 8, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=51",
        },
        {
          id: 3,
          name: "Modivo",
          rating: 4.7,
          address: "Vukovarska ul. 6, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=52",
        },
      ],
      shirts: [
        {
          id: 1,
          name: "Classic White Shirt",
          rating: 4.9,
          address: "Varšavska 10, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=70",
        },
        {
          id: 2,
          name: "Slim Fit Blue Shirt",
          rating: 4.7,
          address: "Ilica 25, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=71",
        },
      ],
      suits: [
        {
          id: 1,
          name: "Jeordie's",
          rating: 4.9,
          address: "Ilica 12, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=100",
        },
        {
          id: 2,
          name: "Martin Arbanas",
          rating: 4.7,
          address: "Savska 5, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=101",
        },
        {
          id: 3,
          name: "Suitbox",
          rating: 4.7,
          address: "Savska 5, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=1021",
        },
      ],
      hairSalonG: [
        {
          id: 1,
          name: "Gentlemen's Cut",
          rating: 4.8,
          address: "Ilica 10, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=730",
        },
        {
          id: 2,
          name: "Barber King",
          rating: 4.9,
          address: "Vukovarska 15, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=741",
        },
      ],
      barbers: [
        {
          id: 1,
          name: "Barber Shop One",
          rating: 4.8,
          address: "Trg bana J. Jelačića 5, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=70",
        },
        {
          id: 2,
          name: "Classic Barber",
          rating: 4.7,
          address: "Ilica 20, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=71",
        },
        {
          id: 3,
          name: "The Royal Barber Shop",
          rating: 4.7,
          address: "Froudeova ulica 9., Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=731",
        },
        {
          id: 4,
          name: "Brijačko - frizerski salon Man style",
          rating: 4.7,
          address: "Nova Cesta 171, Zagreb",
          status: "open",
          img: "https://picsum.photos/420/200?random=571",
        },
      ],
    };
  },
  computed: {
    showSalons() {
      return (
        this.category === "bride" &&
        !["Rings", "Shoes", "Hairdresser", "Nails", "Maid of Honor"].includes(
          this.sub
        )
      );
    },
    showRings() {
      return this.category === "bride" && this.sub === "Rings";
    },
    showShoes() {
      return this.category === "bride" && this.sub === "Shoes";
    },
    showHairdresser() {
      return this.category === "bride" && this.sub === "Hairdresser";
    },
    showCozmetic() {
      return this.category === "bride" && this.sub === "Nails";
    },
    showMaidOfHonor() {
      return this.category === "bride" && this.sub === "Maid of Honor";
    },
    showTie() {
      return this.category === "groom" && this.sub === "Tie";
    },
    showShoesG() {
      return this.category === "groom" && this.sub === "Shoes";
    },
    showShirts() {
      return this.category === "groom" && this.sub === "Shirt";
    },
    showSuit() {
      return this.category === "groom" && this.sub === "Suit";
    },
    showHairdresserG() {
      return this.category === "groom" && this.sub === "Hairdresser";
    },
    showBarber() {
      return this.category === "groom" && this.sub === "Barber";
    },
    showBestMan() {
      return this.category === "groom" && this.sub === "Best Man";
    },

    filteredSalons() {
      if (!this.search) return this.salons;
      return this.salons.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredStores() {
      if (!this.search) return this.stores;
      return this.stores.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredShops() {
      if (!this.search) return this.shops;
      return this.shops.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredHairSalon() {
      if (!this.search) return this.hairSalon;
      return this.hairSalon.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredCozmetic() {
      if (!this.search) return this.cozmeticSalon;
      return this.cozmeticSalon.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredTie() {
      if (!this.search) return this.ties;
      return this.ties.filter((t) =>
        t.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredStoresG() {
      if (!this.search) return this.shopsg;
      return this.shopsg.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredShirts() {
      if (!this.search) return this.shirts;
      return this.shirts.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredSuits() {
      if (!this.search) return this.suits;
      return this.suits.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredHairdresserG() {
      if (!this.search) return this.hairSalonG;
      return this.hairSalonG.filter((s) =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredBarbers() {
      if (!this.search) return this.barbers;
      return this.barbers.filter((b) =>
        b.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    showBudget() {
      return this.category === "budget";
    },
    showNotes() {
      return this.category === "notes";
    },
    currentNote() {
      if (!this.showNotes) return {};

      const id =
        this.sub && this.sub.startsWith("note-")
          ? Number(this.sub.replace("note-", ""))
          : this.notesData[0]?.id;
      return this.notesData.find((n) => n.id === id) || this.notesData[0];
    },
  },
  methods: {
    onSelectNote(id) {
      this.activeNoteId = id;
    },
    onAddNote() {
      const newId = this.notes.length
        ? Math.max(...this.notes.map((n) => n.id)) + 1
        : 1;
      this.notes.push({
        id: newId,
        title: "New note",
        priority: "low",
        done: false,
        text: "",
        image: "",
      });
      this.activeNoteId = newId;
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
.icon-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.budget-table-wrapper {
  max-height: calc(100vh - 260px);
  overflow-y: auto;
}

textarea {
  min-height: 160px;
  resize: vertical;
}
</style>
