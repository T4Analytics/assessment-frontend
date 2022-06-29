<template>
  <div class="flex flex-col flex-1">
    <AppCountdown />
    <section class="mb-auto mt-auto">
      <div class="flex flex-col justify-center mt-10 lg:mt-0">
        <span
          class="lg:mb-10 text-sm md:text-base lg:text-lg text-center lg:pl-5 px-3 flex items-center justify-center"
          >{{ question.question }}
        </span>

        <div>
          <form
            id="answersForm"
            class="flex w-full flex-col md:flex-row justify-center items-center gap-2 sm:gap-5 mt-5 mb-5 lg:mb-0 lg:mt-0 px-10"
          >
            <div
              class="w-full"
              v-for="answer in question.answers"
              :key="answer.id"
            >
              <input
                @click="clearAnswer($event)"
                class="hidden"
                type="radio"
                :id="answer.id"
                name="answers"
                :value="answer.answer"
                v-model="answerCheck"
              />
              <label
                class="label-disc flex items-center justify-center md:h-[60px] w-full p-2 border-2 border-gray-400 text-xs lg:text-sm transition-all text-center rounded-full"
                :for="answer.id"
                >{{ answer.answer }}</label
              >
            </div>
            <!-- 
            <input
              @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_2"
              name="answers"
              value="Katılmıyorum"
              v-model="answer"
            />
            <label
              class="label-disc flex items-center justify-center md:h-[60px] w-full p-2 border-2 border-gray-400 text-xs lg:text-sm transition-all text-center rounded-full"
              for="answer_2"
              >Katılmıyorum
            </label>

            <input
              @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_3"
              name="answers"
              value="Ne katılıyorum ne katılmıyorum"
              v-model="answer"
            />
            <label
              class="label-disc flex items-center justify-center md:h-[60px] w-full p-2 border-2 border-gray-400 text-xs lg:text-sm transition-all text-center rounded-full"
              for="answer_3"
              >Ne katılıyorum ne katılmıyorum
            </label>

            <input
              @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_4"
              name="answers"
              value="Kısmen katılıyorum"
              v-model="answer"
            />
            <label
              class="label-disc flex items-center justify-center md:h-[60px] w-full p-2 border-2 border-gray-400 text-xs lg:text-sm transition-all text-center rounded-full"
              for="answer_4"
              >Kısmen katılıyorum
            </label>

            <input
              @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_5"
              name="answers"
              value="Kesinlikle katılıyorum"
              v-model="answer"
            />
            <label
              class="label-disc flex items-center justify-center md:h-[60px] w-full p-2 border-2 border-gray-400 text-xs lg:text-sm transition-all text-center rounded-full"
              for="answer_5"
              >Kesinlikle katılıyorum
            </label> -->
          </form>
        </div>
      </div>
      <AppQuestionSwitchButtons />
    </section>
    <AppTestPagination />
    <AppModal />
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
<style></style>
