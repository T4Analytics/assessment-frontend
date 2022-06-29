<template>
  <div
    v-if="this.$store.getters.getVisibilityOfModal"
    class="relative z-10 block"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        id="modal-box"
      >
        <div
          class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full animate__animated"
          :class="{ animate__headShake: animateStatus }"
          id="modal-animate"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg> -->
                <i class="fas fa-exclamation-triangle t4-warning" v-if="!modalIconColor"></i>
                <i class="fas fa-check-circle t4-success" v-else></i>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Testi tamamlamak istediğinize emin misiniz?
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ modalText }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="finishTest"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              :class="modalButton"
            >
              Testi Bitir
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();

const animateStatus = ref(false);
const closeModal = () => {
  store.commit("setVisibilityOfModal", false);
};
const modalText = computed(() =>
  store.getters.getAnsweredQuestions.length === store.getters.getQuestionCount
    ? "Tüm soruları cevapladınız. Testi Bitir butonuna tıklayarak testi tamamlayabilirsiniz."
    : "Henüz cevaplanmamış sorular var. İptal butonuna tıklayarak teste kaldığınız yerden devam edebilirsiniz."
);
const modalButton = computed(() =>
  store.getters.getAnsweredQuestions.length === store.getters.getQuestionCount
    ? "bg-t4-success hover:bg-t4-success"
    : "bg-red-600 hover:bg-red-700"
);
const modalIconColor = computed(()=>store.getters.getAnsweredQuestions.length === store.getters.getQuestionCount)
const finishTest = () => {
  axios.patch("http://localhost:3000/papers/" + route.params.id, {
    completed: true,
    duration: 0,
  });
  store.commit("setDuration", 0);

  store.commit("setActiveComponent", "TestCompleted");
};
watch(
  () => store.getters.getVisibilityOfModal,
  (newValue) => {
    if (newValue === true) {
      document.body.classList.add("!overflow-hidden");
      document.body.classList.remove("overflow-auto");
    } else {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("overflow-auto");
    }
  }
);

window.addEventListener("click", (e) => {
  if (e.target.id === "modal-box") {
    animateStatus.value = true;
    setTimeout(() => {
      animateStatus.value = false;
    }, 500);
  }
});
</script>
<style scoped>
.fas {
  font-size: 2rem;
}
</style>
