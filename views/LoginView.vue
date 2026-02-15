<template>
  <div class="home-wrapper d-flex align-items-center justify-content-center">
    <div class="container d-flex w-100 position-relative">
      <router-link to="/" class="btn btn-outline-gold back-btn">
        Back
      </router-link>

      <div class="form-section d-flex flex-column justify-content-center">
        <div class="form-inner text-end">
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

          <button @click="submitForm" class="btn btn-gold mt-3">Submit</button>
          <br />
          <button @click="submitForm" class="btn btn-gold mt-3">
            Forgot password?
          </button>
        </div>
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
import { login } from "../services/authService.js";

export default {
  name: "LoginView",
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async submitForm() {
      try {
        const user = await login({
          email: this.email,
          password: this.password,
        });
        alert(`Welcome back, ${user.username}`);
        this.$router.push("/welcome");
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
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
  display: flex;
  flex-direction: row;
}

.form-section {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
}

.form-inner {
  margin-left: auto;
  width: 80%;
}

.logo-section {
  width: 67%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  top: 20px;
  right: 20px;
  z-index: 10;
}
</style>
