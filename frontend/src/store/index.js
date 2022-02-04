import Vue from "vue";
import Vuex from "vuex";
// import dummyData from "./dummyData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuIsOpen: false,
    edit: { status: false, id: null },
    invoices: [],
    filter: [],
  },
  mutations: {
    SET_MENU_IS_OPEN(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_EDIT(state, payload) {
      state.edit = { ...payload };
    },
    SET_INVOICES(state, payload) {
      state.invoices = payload;
    },
    SET_FILTER(state, payload) {
      state.filter = payload;
    },
    DELETE_INVOICE(state, payload) {
      state.invoices.splice(payload, 1);
    },
    MARK_INVOICE(state, payload) {
      state.invoices[payload].status = "Paid";
    },
    INVOICE_UPDATE(state, payload) {
      state.invoices[payload.index] = payload.data;
    },
    NEW_INVOICE(state, payload) {
      state.invoices.push(payload.data);
    },
  },
  actions: {
    fetchInvoices(context) {
      fetch(`http://localhost:3000/v2/invoices`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => context.commit("SET_INVOICES", data.data));
    },
    deleteInvoice({ commit }, payload) {
      fetch(`http://localhost:3000/v2/invoices/${payload}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => commit("DELETE_INVOICE", data.data));
    },
    markInvoice({ commit }, payload) {
      fetch(`http://localhost:3000/v2/invoices/${payload.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload.payload),
      })
        .then((response) => response.json())
        .then(commit("MARK_INVOICE", payload.index));
    },
    async createInvoice({ commit }, payload) {
      const response = await fetch(`http://localhost:3000/v2/invoices`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload.payload),
      });
      const data = await response.json();
      return commit("NEW_INVOICE", { data: data.data });
    },
    async updateInvoice({ commit }, payload) {
      const response = await fetch(
        `http://localhost:3000/v2/invoices/${payload.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload.payload),
        }
      );
      const data = await response.json();
      return commit("INVOICE_UPDATE", {
        data: data.data,
        index: payload.index,
      });
    },
  },
  getters: {
    filteredInvoices(state) {
      if (state.filter.length === 0) return state.invoices;
      else {
        let filtered = state.invoices.filter((item) =>
          state.filter.includes(item.status)
        );
        return filtered;
      }
    },
  },
});
