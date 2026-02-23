<template>
  <div class="vendor-shell d-flex flex-column align-items-center">
    <div class="d-flex align-items-center gap-3 mt-4">
      <img src="@/assets/logo.png" alt="Wedding Planner" class="top-logo" />
      <h2 class="fancy-name mb-0">Vendor Dashboard</h2>
    </div>

    <div class="d-flex gap-2 mt-4">
      <button
        :class="['tab-btn', activeTab === 'profile' ? 'tab-btn-active' : '']"
        @click="activeTab = 'profile'"
      >
        Profile
      </button>
      <button
        :class="['tab-btn', activeTab === 'chat' ? 'tab-btn-active' : '']"
        @click="activeTab = 'chat'; loadConversations()"
      >
        Messages
      </button>
    </div>

    <div v-if="activeTab === 'chat'" class="vendor-form mt-3">
      <h4 class="section-title mb-3">Messages</h4>

      <div v-if="!activeConversation" class="conversation-list">
        <div v-if="conversations.length === 0" class="text-muted text-center py-4">
          No messages yet
        </div>
        <div
          v-for="conv in conversations"
          :key="conv.userId"
          class="conversation-item d-flex align-items-center gap-2 p-2 mb-2 rounded-3"
          role="button"
          @click="openConversation(conv)"
        >
          <div class="conv-avatar">💬</div>
          <div class="fw-bold">{{ conv.name }}</div>
        </div>
      </div>

      <div v-else class="d-flex flex-column" style="min-height: 400px">
        <div class="d-flex align-items-center gap-2 mb-3">
          <button class="btn-back" @click="activeConversation = null">⬅️</button>
          <h6 class="mb-0 fw-bold">{{ activeConversation.name }}</h6>
        </div>

        <div class="chat-messages flex-grow-1 mb-3 p-3 rounded-4 bg-white shadow-sm overflow-auto">
          <div
            v-for="msg in chatMessages"
            :key="msg.id"
            class="d-flex mb-2"
            :class="{
              'justify-content-end': msg.from === 'me',
              'justify-content-start': msg.from === 'them',
            }"
          >
            <div
              class="chat-bubble"
              :class="{
                'chat-bubble-me': msg.from === 'me',
                'chat-bubble-them': msg.from === 'them',
              }"
            >
              <div v-if="msg.type === 'text'">{{ msg.text }}</div>
              <div v-else>📎 {{ msg.text }}</div>
              <div class="chat-time">{{ msg.time }}</div>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <textarea
            v-model="newMessage"
            class="form-control border rounded-pill flex-grow-1"
            rows="1"
            placeholder="Write a reply..."
            @keyup.enter.exact.prevent="sendReply"
          ></textarea>
          <button class="btn btn-gold btn-sm px-3" @click="sendReply">Send</button>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'profile'" class="vendor-form mt-3">
      <h4 class="section-title mb-3">Business Info</h4>

      <label class="label-gold mb-1">Business Name</label>
      <input type="text" v-model="form.name" class="form-input mb-3" />

      <label class="label-gold mb-1">Category</label>
      <div class="category-grid mb-3">
        <label
          v-for="cat in allCategories"
          :key="cat.value"
          class="category-chip"
          :class="{ 'category-chip-active': form.category.includes(cat.value) }"
        >
          <input
            type="checkbox"
            :value="cat.value"
            v-model="form.category"
            class="d-none"
          />
          {{ cat.label }}
        </label>
      </div>

      <label class="label-gold mb-1">Address</label>
      <input type="text" v-model="form.address" class="form-input mb-3" />

      <label class="label-gold mb-1">Phone</label>
      <input type="text" v-model="form.phone" class="form-input mb-3" />

      <label class="label-gold mb-1">Email</label>
      <input type="email" v-model="form.email" class="form-input mb-3" />

      <label class="label-gold mb-1">Website</label>
      <input type="text" v-model="form.website" class="form-input mb-3" />

      <label class="label-gold mb-1">Instagram</label>
      <input type="text" v-model="form.instagram" class="form-input mb-3" />

      <h4 class="section-title mt-4 mb-3">Working Hours</h4>

      <div v-for="day in days" :key="day.key" class="d-flex align-items-center gap-2 mb-2">
        <span class="day-label">{{ day.label }}</span>
        <input type="text" v-model="form.workingHours[day.key]" placeholder="e.g. 09:00 - 17:00" class="form-input flex-grow-1" />
      </div>

      <h4 class="section-title mt-4 mb-3">Gallery</h4>
      <div v-for="(img, i) in form.gallery" :key="i" class="d-flex align-items-center gap-2 mb-2">
        <input type="text" v-model="form.gallery[i]" placeholder="Image URL" class="form-input flex-grow-1" />
        <button class="btn-remove" @click="form.gallery.splice(i, 1)">✕</button>
      </div>
      <button class="btn-add mb-3" @click="form.gallery.push('')">+ Add image URL</button>

      <div class="d-flex gap-2 mt-4">
        <button class="btn btn-gold" @click="saveProfile">Save Changes</button>
        <button class="btn btn-outline-gold" @click="logOut">Log out</button>
      </div>

      <div v-if="saved" class="text-success fw-bold mt-2">✅ Profile saved!</div>

      <button class="btn btn-danger-custom mt-4" @click="deleteMyAccount">Delete Account</button>
    </div>
  </div>
</template>

<script>
import { getVendorProfile, updateVendorProfile, deleteAccount } from "@/services/authService.js";
import api from "@/api.js";

export default {
  name: "VendorDashboardView",
  data() {
    return {
      activeTab: "profile",
      saved: false,
      conversations: [],
      activeConversation: null,
      chatMessages: [],
      newMessage: "",
      form: {
        name: "",
        category: [],
        address: "",
        phone: "",
        email: "",
        website: "",
        instagram: "",
        workingHours: {
          mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "",
        },
        gallery: [],
      },
      days: [
        { key: "mon", label: "Mon" },
        { key: "tue", label: "Tue" },
        { key: "wed", label: "Wed" },
        { key: "thu", label: "Thu" },
        { key: "fri", label: "Fri" },
        { key: "sat", label: "Sat" },
        { key: "sun", label: "Sun" },
      ],
      allCategories: [
        { value: "salon", label: "Wedding Dress" },
        { value: "rings", label: "Rings" },
        { value: "shoes", label: "Shoes (Bride)" },
        { value: "hairdresser", label: "Hairdresser (Bride)" },
        { value: "cozmetic", label: "Cosmetics / Nails" },
        { value: "tie", label: "Tie" },
        { value: "shoesG", label: "Shoes (Groom)" },
        { value: "shirt", label: "Shirts" },
        { value: "suit", label: "Suits" },
        { value: "hairdresserG", label: "Hairdresser (Groom)" },
        { value: "barber", label: "Barber" },
        { value: "bouquet", label: "Bouquet / Flowers" },
        { value: "carFlowers", label: "Car Flowers" },
        { value: "hallFlowers", label: "Hall Flowers" },
        { value: "churchFlowers", label: "Church Flowers" },
        { value: "music", label: "Church Music" },
        { value: "hall", label: "Wedding Hall" },
        { value: "cake", label: "Cake" },
        { value: "band", label: "Band / DJ" },
      ],
    };
  },
  async mounted() {
    try {
      const vendor = await getVendorProfile();
      this.form.name = vendor.name || "";
      this.form.category = vendor.category || [];
      this.form.address = vendor.address || "";
      this.form.phone = vendor.phone || "";
      this.form.email = vendor.email || "";
      this.form.website = vendor.website || "";
      this.form.instagram = vendor.instagram || "";
      this.form.workingHours = vendor.workingHours || {
        mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "",
      };
      this.form.gallery = vendor.gallery || [];
    } catch (err) {
      console.error("Failed to load vendor profile:", err);
    }
  },
  methods: {
    async saveProfile() {
      try {
        await updateVendorProfile(this.form);
        this.saved = true;
        setTimeout(() => { this.saved = false; }, 2000);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to save profile");
      }
    },
    logOut() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
    async deleteMyAccount() {
      if (!confirm("Jesi li siguran/na da želiš obrisati svoj račun? Ova radnja je nepovratna!")) return;
      try {
        await deleteAccount();
        localStorage.removeItem("token");
        window.location.href = "/";
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete account");
      }
    },
    async loadConversations() {
      try {
        const res = await api.get("/chat/vendor-conversations");
        this.conversations = res.data;
      } catch (err) {
        console.error("Failed to load conversations:", err);
      }
    },
    async openConversation(conv) {
      this.activeConversation = conv;
      try {
        const res = await api.get("/chat/vendor-messages?user=" + conv.userId);
        this.chatMessages = res.data.map((m) => ({
          id: m._id,
          from: m.from,
          text: m.text,
          type: m.type,
          time: new Date(m.createdAt).toLocaleTimeString("hr-HR", { hour: "2-digit", minute: "2-digit" }),
        }));
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    },
    async sendReply() {
      const text = this.newMessage.trim();
      if (!text) return;

      try {
        const res = await api.post("/chat/vendor-message", {
          user: this.activeConversation.userId,
          text,
          type: "text",
        });
        this.chatMessages.push({
          id: res.data._id,
          from: "me",
          text,
          type: "text",
          time: new Date(res.data.createdAt).toLocaleTimeString("hr-HR", { hour: "2-digit", minute: "2-digit" }),
        });
        this.newMessage = "";
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
  },
};
</script>

<style scoped>
.vendor-shell {
  min-height: 100vh;
  background: #d4af37 url("@/assets/background.png") no-repeat center center;
  background-size: cover;
  padding: 2rem;
}

.top-logo {
  height: 100px;
  filter: hue-rotate(190deg) saturate(2) brightness(0.55);
}

.fancy-name {
  font-size: 2.4rem;
  color: #08182e;
}

.vendor-form {
  width: 100%;
  max-width: 600px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  color: #08182e;
  font-weight: 700;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 0.4rem;
}

.label-gold {
  color: #08182e;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  border: 1px solid #08182e;
  background: transparent;
  color: #08182e;
}

.form-input::placeholder {
  color: rgba(8, 24, 46, 0.5);
}

.day-label {
  width: 40px;
  font-weight: 600;
  color: #08182e;
  font-size: 0.9rem;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.category-chip {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  border: 1px solid #08182e;
  color: #08182e;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;
}

.category-chip-active {
  background: #d4af37;
  border-color: #d4af37;
  color: #08182e;
}

.btn-gold {
  background: #08182e;
  border: none;
  color: #d4af37;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
}

.btn-gold:hover {
  background: #0c274f;
  color: #d4af37;
}

.btn-outline-gold {
  background: transparent;
  border: 1px solid #08182e;
  color: #08182e;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
}

.btn-outline-gold:hover {
  background: rgba(8, 24, 46, 0.1);
}

.btn-add {
  background: transparent;
  border: 1px dashed #08182e;
  color: #08182e;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-remove {
  background: transparent;
  border: none;
  color: #c0392b;
  font-size: 1.2rem;
  cursor: pointer;
}

.tab-btn {
  border-radius: 999px;
  padding: 0.5rem 1.6rem;
  border: 1px solid #08182e;
  background: transparent;
  color: #08182e;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.tab-btn-active {
  background: #08182e;
  color: #d4af37;
}

.conversation-item {
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: 0.2s;
}

.conversation-item:hover {
  background: rgba(212, 175, 55, 0.3);
}

.conv-avatar {
  font-size: 1.4rem;
}

.btn-back {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
}

.chat-messages {
  max-height: 350px;
  min-height: 200px;
}

.chat-bubble {
  max-width: 75%;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

.chat-bubble-me {
  background: #08182e;
  color: #fff;
  border-bottom-right-radius: 0.2rem;
}

.chat-bubble-them {
  background: #f1f1f1;
  color: #000;
  border-bottom-left-radius: 0.2rem;
}

.chat-time {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.15rem;
  text-align: right;
}

.btn-danger-custom {
  background: #c0392b;
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1.4rem;
  border-radius: 999px;
  transition: background 0.3s ease;
}

.btn-danger-custom:hover {
  background: #e74c3c;
}
</style>
