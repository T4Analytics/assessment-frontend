<template>
<div class="flex flex-col flex-1">
 <AppCountdown />
  <section class="m-auto">
    <div
      class="flex lg:justify-around flex-col lg:flex-row mt-1 lg:mt-0 items-center md:px-5"
    >
      <span
        class="lg:hidden mb-2 md:mb-5 text-sm md:text-base lg:text-lg text-center lg:pl-5 px-3 flex items-center justify-center"
        >Aşağıdaki seçeneklerden doğru olanı işaretleyiniz.
      </span>
      <div class="">
        <img
          src="@/assets/aptitude-question-image-1.png"
          alt=""
          class="w-[250px] md:w-[275px] lg:w-[400px]"
        />
      </div>

      <div class="lg:ml-10">
        <span
          class="hidden mb-2 sm:mb-10 text-sm md:text-base lg:text-lg text-center lg:pl-5 px-3 lg:flex items-center justify-center"
          >Aşağıdaki seçeneklerden doğru olanı işaretleyiniz.
        </span>
        <form
          id="answersForm"
          class="flex w-full flex-col md:flex-row lg:flex-col justify-center items-center gap-2 mt-5 mb-5 lg:mb-0 lg:mt-0 lg:px-10"
        >
          <div class="flex">
            <input
            @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_1"
              name="answers"
              value="A"
              v-model="answerCheck"
            />
            <label
              class="label-aptitude flex items-center justify-center p-2 transition-all text-center"
              for="answer_1"
              ><img
                src="@/assets/aptitude-answers-image-1.png"
                alt=""
                class="w-[75px] md:w-[77px] lg:w-[90px]"
            /></label>

            <input
            @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_2"
              name="answers"
              value="B"
               v-model="answerCheck"
            />
            <label
              class="label-aptitude flex items-center justify-center p-2 transition-all text-center"
              for="answer_2"
              ><img
                src="@/assets/aptitude-answers-image-2.png"
                alt=""
                class="w-[75px] md:w-[77px] lg:w-[90px]"
              />
            </label>
            <input
            @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_3"
              name="answers"
              value="C"
               v-model="answerCheck"
            />
            <label
              class="label-aptitude flex items-center justify-center p-2 transition-all text-center"
              for="answer_3"
              ><img
                src="@/assets/aptitude-answers-image-3.png"
                alt=""
                class="w-[75px] md:w-[77px] lg:w-[90px]"
              />
            </label>
          </div>
          <div class="flex">
            <input
            @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_4"
              name="answers"
              value="D"
               v-model="answerCheck"
            />
            <label
              class="label-aptitude flex items-center justify-center p-2 transition-all text-center"
              for="answer_4"
              ><img
                src="@/assets/aptitude-answers-image-4.png"
                alt=""
                class="w-[75px] md:w-[77px] lg:w-[90px]"
              />
            </label>
            <input
            @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_5"
              name="answers"
              value="E"
               v-model="answerCheck"
            />
            <label
              class="label-aptitude flex items-center justify-center p-2 transition-all text-center"
              for="answer_5"
              ><img
                src="@/assets/aptitude-answers-image-5.png"
                alt=""
                class="w-[75px] md:w-[77px] lg:w-[90px]"
              />
            </label>

            <input
            @click="clearAnswer($event)"
              class="hidden"
              type="radio"
              id="answer_6"
              name="answers"
              value="F"
             v-model="answerCheck"
            />
            <label
              class="label-aptitude flex items-center justify-center p-2 transition-all text-center"
              for="answer_6"
              ><img
                src="@/assets/aptitude-answers-image-6.png"
                alt=""
                class="w-[75px] md:w-[77px] lg:w-[90px]"
              />
            </label>
          </div>
        </form>
        <AppQuestionSwitchButtons/>
      </div>
    </div>
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
<style></style>
