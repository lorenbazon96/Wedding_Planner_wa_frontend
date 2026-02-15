<template>
  <div
    class="home-wrapper d-flex align-items-center justify-content-center text-center"
  >
    <div>
      <img src="@/assets/logo.png" alt="Wedding Planner" class="logo mb-4" />

      <div class="d-flex gap-3 justify-content-center">
        <router-link to="/register" class="btn btn-gold">Register</router-link>
        <router-link to="/login" class="btn btn-outline-gold"
          >Login</router-link
        >
        <router-link to="/welcome" class="btn btn-outline-gold"
          >Continue as guest</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  background: #08182e;
}

.logo {
  width: 800px;
  max-width: 90vw;
}

.title {
  color: #d4af37;
  letter-spacing: 0.4rem;
  font-weight: 600;
}

.subtitle {
  color: #d4af37;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
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
</style>
