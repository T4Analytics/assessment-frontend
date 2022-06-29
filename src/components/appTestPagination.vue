<template>
  <div
    class="relative flex bg-white p-6 lg:px-2 lg:py-3 items-center justify-center border-t border-gray-200 sm:px-6"
  >
    <div class="">
      <ul
        class="hidden flex lg:flex items-center flex-wrap justify-center gap-y-1"
        id="question_pages"
      >
        <li
          class="w-[50px] h-[38px]"
          v-for="(i, index) in this.$store.getters.getQuestionCount"
          :key="index"
        >
          <a
            @click="this.$store.commit('setActiveQuestion', i)"
            class="block py-2 px-3 text-center text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
            :class="[
              i === this.$store.getters.getActiveQuestion
                ? 'active'
                : 'bg-white',

              this.$store.getters.getAnsweredQuestions.includes(i)
                ? 'completed'
                : 'bg-white',
            ]"
          >
            {{ i }}
          </a>
        </li>
      </ul>
    </div>
    <div class="flex justify-end px-3 lg:hidden">
      <button
        @click="showSlideOvers"
        class="absolute top-0 right-0 mr-2 text-xs bg-t4-bg text-white rounded-sm p-2 mb-1 cursor-pointer"
      >
        Soruları gözden geçir
      </button>
    </div>
  </div>

  <div
    class="lg:hidden fixed inset-0 overflow-hidden animate__animated animate__fadeInRight"
    :class="{ hidden: !slideOvers }"
    role="dialog"
    aria-modal="true"
    @click="getSlideOversTarget($event)"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="close-slide-overs absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
      >
        <div class="pointer-events-auto relative w-96">
          <div
            class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"
          >
            <button
              type="button"
              @click="closeSlideOvers"
              class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span class="sr-only">Close panel</span>

              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="h-full overflow-y-auto bg-white p-8">
            <div class="space-y-6 pb-16">
              <div class="">
                <ul
                  class="flex lg:flex items-center flex-wrap justify-center gap-y-1"
                  id="question_pages_mobile"
                >
                  <li
                    class="w-[50px] h-[38px]"
                    v-for="(i, index) in this.$store.getters.getQuestionCount"
                    :key="index"
                  >
                    <a
                      @click="goQuestion(i)"
                      class="block py-2 px-3 text-center text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                      :class="[
                        i === this.$store.getters.getActiveQuestion
                          ? 'activeMobile'
                          : 'bg-white',
                        this.$store.getters.getAnsweredQuestions.includes(i)
                          ? 'completed'
                          : 'bg-white',
                      ]"
                    >
                      {{ i }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { ref, watch } from "vue";

const store = useStore();
const slideOvers = ref(false);
const showSlideOvers = () => {
  slideOvers.value = true;
};
const getSlideOversTarget = (e) => {
  if (e.target.classList.contains("close-slide-overs")) {
    slideOvers.value = false;
  }
};
const closeSlideOvers = () => {
  slideOvers.value = false;
};
const goQuestion = (i) => {
  store.commit("setActiveQuestion", i);
  slideOvers.value = false;
};
watch(
  () => slideOvers.value,
  (newValue) => {
    if (newValue === true) {
      document.body.classList.remove("overflow-auto");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.add("overflow-auto");
      document.body.classList.remove("overflow-hidden");
    }
  }
);
</script>
<style scoped>
.active {
  background: linear-gradient(to bottom, #ffffff 80%, gray 20%);
  transform: scale(1.2);
  color: black;
}
.activeMobile {
  background: linear-gradient(to bottom, #ffffff 80%, gray 20%);
  transform: scale(1.1);
  color: black;
}

.completed {
  background: linear-gradient(to bottom, #ffffff 80%, #33cc00 20%);
}
</style>
