<template>
  <appHeader v-if="this.$store.getters.getActiveComponent!='TestCompleted'"/>

  <transition name="fade" mode="out-in">
    <component :is="getActiveComponent"></component>
  </transition>
  <appFooter v-if="this.$store.getters.getActiveComponent!='TestCompleted'"/>

</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
const store = useStore();
const route = useRoute();
// const router = useRouter();
const getActiveComponent = computed(() => 
  defineAsyncComponent(() =>
    import(`@/views/${store.getters.getActiveComponent}`)
  )
);

axios.get("http://localhost:3000/papers/" + route.params.id).then((response) => {
  store.commit("setTestName", response.data.testName);
  store.commit(
    "setDuration",
    response.data.endTime != null
      ? response.data.endTime - Date.now()
      : response.data.duration
  )
  
  if (response.data.completed === true) {
    store.commit("setDuration", 0);
    store.commit("setActiveComponent", "TestCompleted");
    // router.push({name:'TestCompleted'})
  }
  if (
    response.data.endTime != null &&
    response.data.endTime - Date.now() <= 0
  ) {
    store.commit("setDuration", 0);
  }
});


if (store.getters.getActiveComponent === "Welcome") {
  document.body.classList.add("bg-gray-200");
} else {
  document.body.classList.remove("bg-gray-200");
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
