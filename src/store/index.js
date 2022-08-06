import { createStore } from 'vuex';

import axios from 'axios';

export default createStore({
  state: {
    userForm: {
      name: '',
      phone: '',
      email: '',
      city: {},
    },
    cities: [
      {
        id: 1,
        name: 'Москва',
      },
      {
        id: 2,
        name: 'Санкт-Петербург',
      },
      {
        id: 3,
        name: 'Казань',
      },
    ],
  },
  getters: {
    getUserForm(state) {
      return state.userForm;
    },
    getSelectedCity(state) {
      return state.userForm.city;
    },
    getCities(state) {
      return state.cities;
    },
    getFormToRequest(state) {
      return {
        name: state.userForm.name,
        city_id: state.userForm.city.id,
        phone: state.userForm.phone,
        email: state.userForm.email,
      };
    },
  },
  mutations: {
    setName(state, payload) {
      state.userForm.name = payload;
    },
    setPhone(state, payload) {
      state.userForm.phone = payload;
    },
    setEmail(state, payload) {
      state.userForm.email = payload;
    },
    setCity(state, payload) {
      state.userForm.city = payload;
    },
  },
  actions: {
    async requestToCall({ getters }) {
      try {
        const response = await axios.post(
          'http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
          getters.getFormToRequest,
        );
        return response;
      } catch (e) {
        return e.response;
      }
    },
  },
});
