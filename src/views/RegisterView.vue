<template>
  <div class="home-wrapper d-flex align-items-center justify-content-center">
    <div class="container d-flex w-100 position-relative">
      <router-link to="/" class="btn btn-outline-gold back-btn">
        Back
      </router-link>

      <div class="form-section text-start">
        <div class="d-flex gap-2 mb-4">
          <button
            :class="['role-btn', role === 'user' ? 'role-btn-active' : '']"
            @click="role = 'user'"
          >
            Couple
          </button>
          <button
            :class="['role-btn', role === 'vendor' ? 'role-btn-active' : '']"
            @click="role = 'vendor'"
          >
            Vendor
          </button>
        </div>

        <template v-if="role === 'user'">
          <h4 class="label-gold">Bride's Name</h4>
          <input
            type="text"
            v-model="Bride_name"
            placeholder="Enter bride's name"
            class="form-input mb-3"
          />

          <h4 class="label-gold">Groom's Name</h4>
          <input
            type="text"
            v-model="Groom_name"
            placeholder="Enter groom's name"
            class="form-input mb-3"
          />

          <h4 class="label-gold">Date of Wedding</h4>
          <input type="date" v-model="Date_wedding" class="form-input mb-3" />
        </template>

        <template v-else>
          <h4 class="label-gold">Business Name</h4>
          <input
            type="text"
            v-model="vendorName"
            placeholder="Enter your business name"
            class="form-input mb-3"
          />

          <h4 class="label-gold">Category</h4>
          <div class="category-grid mb-3">
            <label
              v-for="cat in vendorCategories"
              :key="cat.value"
              class="category-chip"
              :class="{ 'category-chip-active': vendorCategory.includes(cat.value) }"
            >
              <input
                type="checkbox"
                :value="cat.value"
                v-model="vendorCategory"
                class="d-none"
              />
              {{ cat.label }}
            </label>
          </div>
        </template>

        <h4 class="label-gold">Email</h4>
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          class="form-input mb-3"
        />

        <h4 class="label-gold">Password</h4>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="form-input mb-3"
        />

        <button @click="submitForm" class="btn-gold mt-3">Submit</button>
      </div>

      <div
        class="logo-section d-flex align-items-center justify-content-center"
      >
        <img src="@/assets/logo.png" alt="Wedding Planner" class="logo" />
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "../services/authService.js";

export default {
  name: "RegisterView",
  data() {
    return {
      role: "user",
      Bride_name: "",
      Groom_name: "",
      Date_wedding: "",
      vendorName: "",
      vendorCategory: [],
      email: "",
      password: "",
      vendorCategories: [
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
  methods: {
    async submitForm() {
      try {
        let userData;
        if (this.role === "vendor") {
          userData = {
            username: this.vendorName,
            email: this.email,
            password: this.password,
            role: "vendor",
            vendorName: this.vendorName,
            vendorCategory: this.vendorCategory,
          };
        } else {
          userData = {
            username: `${this.Bride_name} & ${this.Groom_name}`,
            email: this.email,
            password: this.password,
            brideName: this.Bride_name,
            groomName: this.Groom_name,
            dateWedding: this.Date_wedding,
          };
        }
        const user = await register(userData);
        alert(`Account created: ${user.username}`);
        if (user.role === "vendor") {
          this.$router.push("/vendor-dashboard");
        } else {
          this.$router.push("/welcome");
        }
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    },
  },
};
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  background: #08182e;
  color: #fff;
}

.container {
  max-width: 1200px;
  position: relative;
}

.form-section {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-section {
  width: 67%;
}

.logo {
  width: 600px;
  max-width: 80%;
}

.label-gold {
  color: #d4af37;
  font-weight: 600;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 30px;
  border: 1px solid #d4af37;
  background: transparent;
  color: #fff;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.btn-gold {
  background: #d4af37;
  border: none;
  color: #08182e;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
}

.btn-gold:hover {
  background: #e5c45e;
  color: #08182e;
}

.btn-outline-gold {
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
}

.btn-outline-gold:hover {
  background: rgba(212, 175, 55, 0.1);
  color: #fff;
}

.back-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.role-btn {
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  font-weight: 600;
  padding: 0.4rem 1.4rem;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s;
}

.role-btn-active {
  background: #d4af37;
  color: #08182e;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.category-chip {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  border: 1px solid #d4af37;
  color: #d4af37;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;
}

.category-chip-active {
  background: #d4af37;
  color: #08182e;
}
</style>
