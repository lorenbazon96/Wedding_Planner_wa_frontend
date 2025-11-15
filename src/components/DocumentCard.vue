<template>
  <div
    class="document-card p-3 bg-white rounded-4 shadow-sm h-100 d-flex flex-column gap-4"
  >
    <h5 class="fw-bold text-center mb-3">Documents</h5>

    <div class="flex-grow-1">
      <h6 class="fw-bold mb-2">Documents of the Bride</h6>
      <div class="table-responsive">
        <table class="table table-sm table-bordered mb-2">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, index) in brideDocs" :key="'bride-' + index">
              <td>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="doc.name"
                  placeholder="Document name"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="doc.type"
                  placeholder="Type"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-dark btn-sm rounded-pill" @click="addBrideDoc">
        Add Row
      </button>
    </div>

    <div class="flex-grow-1 mt-4">
      <h6 class="fw-bold mb-2">Groom's Documents</h6>
      <div class="table-responsive">
        <table class="table table-sm table-bordered mb-2">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, index) in groomDocs" :key="'groom-' + index">
              <td>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="doc.name"
                  placeholder="Document name"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="doc.type"
                  placeholder="Type"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-dark btn-sm rounded-pill" @click="addGroomDoc">
        Add Row
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentCard",
  data() {
    return {
      brideDocs: [{ name: "", type: "" }],
      groomDocs: [{ name: "", type: "" }],
    };
  },
  methods: {
    addBrideDoc() {
      this.brideDocs.push({ name: "", type: "" });
    },
    addGroomDoc() {
      this.groomDocs.push({ name: "", type: "" });
    },
  },
};
</script>

<style scoped>
.document-card {
  background-color: #fff;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
.table th,
.table td {
  vertical-align: middle;
}
</style>
