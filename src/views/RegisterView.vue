<template>
  <div class="home-wrapper d-flex align-items-center justify-content-center">
    <div class="container d-flex w-100 position-relative">
      <router-link to="/" class="btn btn-outline-gold back-btn">
        Back
      </router-link>

      <div class="form-section text-start">
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

        <h4 class="label-gold">Email</h4>
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          class="form-input mb-3"
        />

        <h4 class="label-gold">Password</h4>
        <input
          type="text"
          v-model="password"
          placeholder="Password"
          class="form-input mb-3"
        />

        <router-link to="/welcome" class="btn-gold mt-3 text-center"
          >Submit</router-link
        >
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
export default {
  name: "RegisterView",
  data() {
    return {
      Bride_name: "",
      Groom_name: "",
      Date_wedding: "",
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Bride:", this.Bride_name);
      console.log("Groom:", this.Groom_name);
      console.log("Date:", this.Date_wedding);
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      alert("Form submitted!");
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
</style>
