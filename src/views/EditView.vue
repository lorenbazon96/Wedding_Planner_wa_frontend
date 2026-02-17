<template>
  <div
    class="edit-shell d-flex flex-column align-items-center justify-content-start"
  >
    <div class="d-flex align-items-center gap-3 mt-4">
      <img src="@/assets/logo.png" alt="Wedding Planner" class="top-logo" />

      <router-link to="/welcome" class="wedding-info-link text-decoration-none">
        <div class="d-flex align-items-center gap-3">
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Wedding cover"
            class="header-cover"
          />
          <div class="text-start">
            <h3 class="mb-0 fancy-name">
              {{ brideName }} &amp; {{ groomName }}
            </h3>
            <small class="date-text fancy-name">{{ date }}</small>
          </div>
        </div>
      </router-link>
    </div>

    <div class="edit-form mt-5 d-flex flex-column align-items-center">
      <label class="label-gold mb-2">Bride Name</label>
      <input
        type="text"
        v-model="brideName"
        placeholder="Ivana"
        class="form-input mb-3"
      />

      <label class="label-gold mb-2">Groom Name</label>
      <input
        type="text"
        v-model="groomName"
        placeholder="Ivan"
        class="form-input mb-3"
      />

      <label class="label-gold mb-2">Date</label>
      <input type="date" v-model="date" class="form-input mb-4" />

      <label class="label-gold mb-2">Cover image</label>
      <input
        type="file"
        accept="image/*"
        class="form-input mb-4"
        @change="onImageChange"
      />
      <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn btn-gold" @click="saveChanges">Save Changes</button>
        <button class="btn btn-gold" @click="goBack">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, updateProfile } from "@/services/authService.js";

export default {
  name: "EditView",
  data() {
    return {
      brideName: "",
      groomName: "",
      date: "",
      imageFile: null,
      imagePreview: null,
    };
  },
  async mounted() {
    const profile = await getProfile();
    this.brideName = profile.brideName || "";
    this.groomName = profile.groomName || "";
    if (profile.dateWedding) {
      this.date = new Date(profile.dateWedding).toISOString().slice(0, 10);
    }
    if (profile.coverImage) {
      this.imagePreview = profile.coverImage;
    }
  },
  methods: {
    async saveChanges() {
      const data = {
        brideName: this.brideName,
        groomName: this.groomName,
        dateWedding: this.date,
      };

      if (this.imagePreview) {
        data.coverImage = this.imagePreview;
      }

      await updateProfile(data);
      this.$router.push("/welcome");
    },
    goBack() {
      this.$router.push("/welcome");
    },
    onImageChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = (evt) => {
        this.imagePreview = evt.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.edit-shell {
  min-height: 100vh;
  background: #d4af37 url("@/assets/background.png") no-repeat center center;
  background-size: cover;
  color: #08182e;
  padding: 2rem;
  text-align: center;
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
  background: rgba(8, 24, 46, 0.15);
  transform: translateY(-2px);
  cursor: pointer;
}

.fancy-name {
  font-family: inherit;
  font-size: 3rem;
  line-height: 1;
  color: #08182e;
}

.edit-form {
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(6px);
  background: rgba(212, 175, 55, 0.3);
  border-radius: 20px;
  padding: 2rem;
}

.label-gold {
  color: #08182e;
  font-weight: 600;
  letter-spacing: 0.05rem;
}

.form-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 30px;
  border: 1px solid #08182e;
  background: transparent;
  color: #08182e;
}

.form-input::placeholder {
  color: rgba(8, 24, 46, 0.7);
}

.btn-gold {
  background: #08182e;
  border: none;
  color: #d4af37;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
  transition: background 0.3s ease;
}

.btn-gold:hover {
  background: #0c274f;
  color: #d4af37;
}
.date-text {
  font-size: 30px;
}

.header-cover {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #08182e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: none;
}
</style>
