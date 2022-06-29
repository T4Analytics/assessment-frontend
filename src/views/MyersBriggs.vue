<template >
    <div class="flex flex-col flex-1">
         <AppCountdown />
           <section class="mb-auto mt-auto">
      <div class="flex flex-col lg:flex-row justify-center mt-10">
        <span
          class="text-sm md:text-base lg:text-lg text-center lg:pl-5 px-3 flex items-center justify-center"
          >1- Çoktan seçmeli soruları tercih eden
        </span>

        <div class="flex items-center justify-center">
          <form
            id="answersForm"
            class="flex flex-col lg:flex-row justify-center items-center gap-2 mt-5 mb-5 lg:mb-0 lg:mt-0"
          >
            <input
             @click="clearAnswer($event)"
            v-model="answerCheck"
              class="hidden"
              type="radio"
              id="answer_1"
              name="answers"
              value="1"
            />
            <label
              class="label-mb inline-block w-10 md:w-20 p-2 border-2 border-gray-400 transition-all text-center rounded-full"
              for="answer_1"
              >1</label
            >

            <input
             @click="clearAnswer($event)"
            v-model="answerCheck"
              class="hidden"
              type="radio"
              id="answer_2"
              name="answers"
              value="2"
            />
            <label
              class="label-mb inline-block w-10 md:w-20 p-2 border-2 border-gray-400 transition-all text-center rounded-full"
              for="answer_2"
              >2
            </label>

            <input
             @click="clearAnswer($event)"
            v-model="answerCheck"
              class="hidden"
              type="radio"
              id="answer_3"
              name="answers"
              value="3"
            />
            <label
              class="label-mb inline-block w-10 md:w-20 p-2 border-2 border-gray-400 transition-all text-center rounded-full"
              for="answer_3"
              >3
            </label>

            <input
             @click="clearAnswer($event)"
            v-model="answerCheck"
              class="hidden"
              type="radio"
              id="answer_4"
              name="answers"
              value="4"
            />
            <label
              class="label-mb inline-block w-10 md:w-20 p-2 border-2 border-gray-400 transition-all text-center rounded-full"
              for="answer_4"
              >4
            </label>

            <input
             @click="clearAnswer($event)"
            v-model="answerCheck"
              class="hidden"
              type="radio"
              id="answer_5"
              name="answers"
              value="5"
            />
            <label
              class="label-mb inline-block w-10 md:w-20 p-2 border-2 border-gray-400 transition-all text-center rounded-full"
              for="answer_5"
              >5
            </label>

          </form>
        </div>
        <span
          class="text-sm md:text-base lg:text-lg text-center lg:pr-5 px-3 flex items-center justify-center mb-5 lg:mb-0"
          >5- Açık uçlu soruları tercih eden</span
        >
      
      </div>
   
    
      <AppQuestionSwitchButtons/>
    </section>
    <AppTestPagination/>
  <AppModal/>
    </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
const answerCheck = ref(null);
const question = ref([]);
const getQuestion = () => {
  store.commit(
    "setActiveQuestion",
    localStorage.getItem("activeQuestion") != null
      ? Number(localStorage.getItem("activeQuestion"))
      : 1
  );
  axios
    .get("http://localhost:3000/questions/" + store.getters.getActiveQuestion)
    .then((response) => {
      question.value = response.data;
      answerCheck.value = response.data.answered;
    });

  axios.get("http://localhost:3000/questions/").then((response) => {
    let a = [];
    a = response.data.filter((i) => i.answered != null);

    a.forEach((i) => {
      if (store.getters.getAnsweredQuestions.indexOf(i.id) === -1)
        store.commit("setAnsweredQuestions", i.id);
    });
  });
};
getQuestion();

watch(
  () => store.getters.getActiveQuestion,
  (newValue) => {
    localStorage.setItem("activeQuestion", newValue);
    // if (answerCheck.value === null) {
    //   store.state.answeredQuestions = store.state.answeredQuestions.filter(
    //     (i) => i != oldValue
    //   );
    // }

    axios
      .get("http://localhost:3000/questions/" + newValue)
      .then((response) => {
        question.value = [];
        answerCheck.value = response.data.answered;
        question.value = response.data;
      });
  }
);

watch(
  () => answerCheck.value,
  (newValue,oldValue) => {
    axios.patch(
      "http://localhost:3000/questions/" + store.getters.getActiveQuestion,
      {
        answered: newValue,
      }
    );
    if (
      newValue != null &&
      store.getters.getAnsweredQuestions.indexOf(
        store.getters.getActiveQuestion
      ) === -1
    ) {
      store.commit("setAnsweredQuestions", store.getters.getActiveQuestion);
    } if(newValue===null && oldValue!=null) {
         store.commit('filterAnsweredQuestions')
    }
  }
);

const clearAnswer = (e) => {
  if (e.target.value === answerCheck.value) {
    answerCheck.value = null;
  }
};

</script>
<style >
    
</style>