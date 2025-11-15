<template>
  <div class="content-panel p-4 shadow-xl rounded-2xl">
    <div class="mb-4">
      <table class="table table-sm align-middle text-center mb-0">
        <thead class="table-light sticky-top">
          <tr>
            <th>Women's Lapels</th>
            <th>Men's Lapels</th>
            <th>Children's Lapels</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                class="form-control form-control-sm text-center"
                v-model.number="lapels.women"
              />
            </td>
            <td>
              <input
                type="number"
                class="form-control form-control-sm text-center"
                v-model.number="lapels.men"
              />
            </td>
            <td>
              <input
                type="number"
                class="form-control form-control-sm text-center"
                v-model.number="lapels.children"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-4">
      <h5 class="mb-2">Assistants</h5>
      <table class="table table-sm align-middle mb-2 text-center">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Confirmed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(assistant, index) in assistants" :key="index">
            <td>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="assistant.name"
              />
            </td>
            <td class="align-middle">
              <input type="checkbox" v-model="assistant.checked" />
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-sm btn-primary" @click="addAssistant">
        Add Assistant
      </button>
    </div>

    <div>
      <h5 class="mb-2">Notes (Materials & Suppliers)</h5>
      <textarea class="form-control" v-model="notes"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "LapelCard",
  data() {
    return {
      lapels: {
        women: 0,
        men: 0,
        children: 0,
      },
      assistants: [{ name: "", checked: false }],
      notes: "",
    };
  },
  methods: {
    addAssistant() {
      this.assistants.push({ name: "", checked: false });
    },
  },
};
</script>

<style scoped>
.content-panel {
  background: rgba(244, 231, 204, 0.95);
  border-radius: 1.5rem;
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
}

.table {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
}

textarea {
  min-height: 160px;
  resize: vertical;
}
</style>
