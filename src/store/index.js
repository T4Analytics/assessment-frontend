import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    activeComponent: "Welcome",
    testName: null,
    questionCount: 15,
    activeQuestion: 1,
    visibilityOfModal: false,
    duration: null,
    answeredQuestions: [],
  },
  getters: {
    getActiveComponent: (state) => state.activeComponent,
    getTestName: (state) => state.testName,
    getQuestionCount: (state) => state.questionCount,
    getActiveQuestion: (state) => state.activeQuestion,
    getVisibilityOfModal: (state) => state.visibilityOfModal,
    getDuration: (state) => state.duration,
    getAnsweredQuestions: (state) => state.answeredQuestions,
  },
  mutations: {
    setActiveComponent(state, payload) {
      state.activeComponent = payload;
    },
    setTestName(state, payload) {
      state.testName = payload;
    },
    setActiveQuestion(state, payload) {
      state.activeQuestion = payload;
    },
    setVisibilityOfModal(state, payload) {
      state.visibilityOfModal = payload;
    },
    setDuration(state, payload) {
      state.duration = payload;
    },
    setAnsweredQuestions(state, payload) {
      state.answeredQuestions.push(payload);
    },
    filterAnsweredQuestions(state) {
      state.answeredQuestions = state.answeredQuestions.filter(
        (i) => i != state.activeQuestion
      );
    },
  },
  actions: {},
  modules: {},
  // plugins: [createPersistedState()],
});
