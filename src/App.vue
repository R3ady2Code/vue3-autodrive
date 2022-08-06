<template>
  <div class="p-6 flex flex-col sm:flex-row gap-5">
    <Button background="blue" @click="openModal(getCities[0])">Заказать в Москву</Button>
    <Button background="teal" @click="openModal(getCities[1])">Заказать в Санкт-Петербург</Button>
  </div>
  <Modal v-if="modalOpen" :closeModal="closeModal" />
</template>

<script>
import Modal from './components/Modal';
import Button from './components/ui/Button.vue';

import { mapGetters } from 'vuex'

export default {
  name: "App",
  components: { Modal, Button },
  data: () => ({
    modalOpen: false,
  }),
  computed: {
    ...mapGetters(['getCities'])
  },
  methods: {
    closeModal() {
      this.modalOpen = false;
    },

    openModal(city) {
      this.modalOpen = true;
      this.$store.commit('setCity', city)
    },
  }
};
</script>
