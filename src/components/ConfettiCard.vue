<template>
  <div
    class="confetti-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-3"
  >
    <h5 class="fw-bold text-center mb-3">Confetti Notes</h5>
    <textarea
      v-model="noteText"
      class="form-control flex-grow-1"
      placeholder="Write your notes here..."
    ></textarea>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "ConfettiCard",

  data() {
    return {
      noteText: "",
      debounceTimer: null,
    };
  },

  methods: {
    async saveNote() {
      try {
        await api.post("/confetti", { noteText: this.noteText });
      } catch (err) {
        console.error(
          "SAVE CONFETTI ERROR:",
          err.response?.data || err.message,
        );
      }
    },

    async fetchNote() {
      try {
        const res = await api.get("/confetti");

        this.noteText = res.data.noteText || "";
      } catch (err) {
        console.error(
          "FETCH CONFETTI ERROR:",
          err.response?.data || err.message,
        );
      }
    },

    debouncedSave() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.saveNote();
      }, 600);
    },
  },

  watch: {
    noteText() {
      this.debouncedSave();
    },
  },

  mounted() {
    this.fetchNote();
  },
};
</script>

<style scoped>
.confetti-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
textarea {
  min-height: 200px;
  resize: vertical;
}
</style>
