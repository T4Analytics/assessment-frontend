<template>
  <div class="flex justify-center gap-4 sm:mt-10 mb-5 items-center">
    <button
    @click="previousStep"
      class="rounded-md p-3 text-white hover:bg-gray-700 transition-all text-sm md:text-base"
      :disabled="previousButtonDisabledControl"
      :class="[previousButtonDisabledControl ? 'gray' : 'bg-t4-bg']"
    >
      Önceki
    </button>

    <span class="text-t4-form text-sm sm:text-xl"
      >Soru {{ getActiveQuestion }}/{{ getQuestionCount }}</span
    >

    <button
      @click="nextStep"
      class="bg-t4-bg rounded-md p-3 text-white hover:bg-gray-700 transition-all text-sm md:text-base"
    >
      {{textOfNextButton}}
    </button>
  </div>
</template>
<script setup>
import { ref,computed,watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const previousButtonDisabledControl = ref(
  (localStorage.getItem("activeQuestion") != null) && 
  Number(localStorage.getItem("activeQuestion")) != 1
      ? false
    : true
)
const getActiveQuestion = computed(() => store.getters.getActiveQuestion);
const getQuestionCount = computed(() => store.getters.getQuestionCount);
const textOfNextButton = computed(
  () => store.getters.getActiveQuestion === store.getters.getQuestionCount ? 'Testi Bitir' : 'Sonraki'
);
const previousStep = () => {
      if (store.getters.getActiveQuestion>1) {
        store.commit('setActiveQuestion',store.getters.getActiveQuestion-1)
      }
}
const nextStep = () => {
    if (store.getters.getActiveQuestion != store.getters.getQuestionCount) {
        store.commit('setActiveQuestion',store.getters.getActiveQuestion+1)
    } else {
        store.commit('setVisibilityOfModal',true)
  }

}

watch(
  () => store.getters.getActiveQuestion,
  (newValue) => {
    if (newValue === 1) {
      previousButtonDisabledControl.value = true
    } else {
        previousButtonDisabledControl.value = false
    }
  }
);


</script>
<style scoped>
.gray{
    background-color: gray;
}
</style>
