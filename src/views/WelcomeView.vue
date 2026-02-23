<template>
  <div class="welcome-shell">
    <header
      class="topbar d-flex justify-content-between align-items-center px-3 px-lg-5 py-3"
    >
      <div class="d-flex align-items-center gap-3">
        <img src="@/assets/logo.png" alt="Wedding Planner" class="top-logo" />

        <router-link v-if="!isGuest" to="/edit" class="wedding-info-link text-decoration-none">
          <div class="d-flex align-items-center gap-3">
            <img
              v-if="coverImage"
              :src="coverImage"
              alt="Wedding cover"
              class="header-cover"
            />
            <div class="wedding-info">
              <h3 class="mb-0 fancy-name">
                {{ brideName }} &amp; {{ groomName }}
              </h3>
              <small>{{ weddingDateDisplay }}</small>
            </div>
          </div>
        </router-link>
      </div>
      <div class="d-flex flex-column align-items-end gap-2">
        <button class="remaining-pill logout-btn" @click="logOut">
          {{ isGuest ? 'Home' : 'Log out' }}
        </button>
        <div v-if="!isGuest" class="remaining-pill">{{ daysLeftMessage }}</div>
      </div>
    </header>

    <div class="container-fluid flex-grow-1" style="min-height: 0">
      <div class="row h-100 g-3">
        <div class="col-12 col-lg-2 h-100">
          <LeftMenu
            :active="currentCategory"
            @select-category="onSelectCategory"
          />
        </div>

        <div class="col-12 col-lg-3 h-100">
          <SubMenu
            :category="currentCategory"
            :active-sub="currentSub"
            :chats="chats"
            :budget-planned="budgetPlanned"
            :budget-spent="budgetSpent"
            :guests="guests"
            :notes="notes"
            @select-sub="currentSub = $event"
            @delete-chat="handleDeleteChat"
            @notes-updated="onNotesUpdated"
          />
        </div>

        <div class="col-12 col-lg-7 h-100">
          <ContentPanel
            :category="currentCategory"
            :sub="currentSub"
            :chats="chats"
            :notes="notes"
            @open-chat="handleOpenChat"
            @budget-updated="onBudgetUpdated"
            @guests-updated="onGuestsUpdated"
            @notes-updated="onNotesUpdated"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import LeftMenu from "../components/LeftMenu.vue";
import SubMenu from "../components/SubMenu.vue";
import ContentPanel from "../components/ContentPanel.vue";
import { getProfile } from "../services/authService.js";
import api from "../api.js";

export default {
  name: "WelcomeView",
  components: { LeftMenu, SubMenu, ContentPanel },
  setup() {
    const weddingDate = ref(new Date("2026-11-15"));
    const brideName = ref("...");
    const groomName = ref("...");
    const coverImage = ref(null);
    const isGuest = ref(!localStorage.getItem("token"));

    onMounted(async () => {
      if (isGuest.value) return;

      const profile = await getProfile();
      brideName.value = profile.brideName || "Bride";
      groomName.value = profile.groomName || "Groom";
      if (profile.dateWedding) {
        weddingDate.value = new Date(profile.dateWedding);
      }
      if (profile.coverImage) {
        coverImage.value = profile.coverImage;
      }

      try {
        const res = await api.get("/chats");
        chats.value = res.data.map((c) => ({
          id: c._id,
          type: c.type,
          subjectId: c.subjectId,
          title: c.title,
        }));
      } catch (err) {
        console.error("Failed to load chats:", err);
      }

      try {
        const res = await api.get("/notes");
        notes.value = res.data.map((n) => ({
          id: n._id,
          title: n.title,
          priority: n.priority,
          done: n.done,
          text: n.text,
          image: n.image,
        }));
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    });

    const currentCategory = ref("bride");
    const currentSub = ref("Wedding dress");

    const chats = ref([]);

    const weddingDateDisplay = computed(() =>
      weddingDate.value.toLocaleDateString("hr-HR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    );

    const daysLeft = computed(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(weddingDate.value);
      target.setHours(0, 0, 0, 0);
      const diffMs = target - today;
      return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    });

    const daysLeftMessage = computed(() => {
      if (daysLeft.value > 1) return `${daysLeft.value} days left`;
      if (daysLeft.value === 1) return "1 day left 💍";
      if (daysLeft.value === 0) return "Today is the big day! 💒";
      return "Wedding day has passed 💐";
    });

    const onSelectCategory = (cat) => {
      currentCategory.value = cat;
      const defaults = {
        bride: "Wedding dress",
        groom: "Suit",
        flowers: "Bouquet",
        church: "Ceremony",
        hall: "Venues",
      };
      currentSub.value = defaults[cat] || null;
    };

    const handleOpenChat = async ({ type, subjectId, title }) => {
      let chat = chats.value.find(
        (c) => c.type === type && String(c.subjectId) === String(subjectId),
      );

      if (!chat) {
        try {
          const res = await api.post("/chats", { type, subjectId, title });
          chat = {
            id: res.data._id,
            type: res.data.type,
            subjectId: res.data.subjectId,
            title: res.data.title,
          };
          chats.value.push(chat);
        } catch (err) {
          console.error("Failed to create chat:", err);
          return;
        }
      }

      currentCategory.value = "chat";
      currentSub.value = `chat-${chat.id}`;
    };

    const handleDeleteChat = async (chatId) => {
      const chat = chats.value.find((c) => c.id === chatId);
      const title = chat ? chat.title : chatId;

      if (!confirm(`Želiš li stvarno obrisati razgovor "${title}"?`)) return;

      try {
        await api.delete(`/chats/${chatId}`);
      } catch (err) {
        console.error("Failed to delete chat:", err);
      }

      chats.value = chats.value.filter((c) => c.id !== chatId);

      if (currentSub.value === "chat-" + chatId) {
        const first = chats.value[0];
        if (first) {
          currentSub.value = "chat-" + first.id;
        } else {
          currentCategory.value = "bride";
          currentSub.value = "Wedding dress";
        }
      }
    };
    const logOut = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
    };

    const budgetPlanned = ref(0);
    const budgetSpent = ref(0);
    const guests = ref([]);
    const notes = ref([]);

    const onBudgetUpdated = ({ planned, spent }) => {
      budgetPlanned.value = planned;
      budgetSpent.value = spent;
    };

    const onGuestsUpdated = (updatedGuests) => {
      guests.value = updatedGuests;
    };

    const onNotesUpdated = (updatedNotes) => {
      notes.value = updatedNotes;
    };

    return {
      isGuest,
      weddingDate,
      weddingDateDisplay,
      daysLeftMessage,
      brideName,
      groomName,
      coverImage,
      currentCategory,
      currentSub,
      chats,
      onSelectCategory,
      handleOpenChat,
      handleDeleteChat,
      logOut,
      budgetPlanned,
      budgetSpent,
      onBudgetUpdated,
      guests,
      onGuestsUpdated,
      notes,
      onNotesUpdated,
    };
  },
};
</script>

<style scoped>
.welcome-shell {
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.topbar {
  background: rgba(245, 235, 218, 0.441);
}

.top-logo {
  height: 140px;
  filter: hue-rotate(190deg) saturate(2) brightness(0.55);
}

.wedding-info-link {
  color: inherit;
  transition: all 0.3s ease;
  border-radius: 10px;
  padding: 0.2rem 0.5rem;
}

.wedding-info-link:hover {
  background: rgba(212, 175, 55, 0.15);
  transform: translateY(-2px);
  cursor: pointer;
}

.fancy-name {
  font-family: inherit;
  font-size: 3rem;
  line-height: 1;
  color: #2b2b2b;
}

.wedding-info small {
  color: #333;
  font-size: 1.4em;
}

.remaining-pill {
  background: #d4af37;
  color: #fff;
  padding: 0.5rem 2rem;
  border-radius: 999px;
  font-weight: 600;
}
button.remaining-pill:focus {
  outline: none;
  box-shadow: none;
}

.logout-btn {
  outline: none !important;
  box-shadow: none !important;
}

.logout-btn:focus {
  outline: none !important;
  box-shadow: none !important;
}

.header-cover {
  width: 90px;
  height: 120px;
  border-radius: 10%;
  object-fit: cover;
  border: 2px solid #d4af37;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
