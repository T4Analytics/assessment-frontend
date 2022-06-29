<template>
  <transition name="bounce">
    <section class="mt-2">
      <p
        id="countdown"
        class="font-bold text-red-500 text-center text-sm md:text-base"
      >
        <vue-countdown
        v-if="this.$store.getters.getDuration>=3600000"
          :time="this.$store.getters.getDuration"
          :transform="transformSlotProps"
          v-slot="{ hours, minutes, seconds }"
          @start="startTest"
          @end="finishTest"
        >
          {{ hours }}:{{ minutes }}:{{ seconds }}
        </vue-countdown>

        <vue-countdown
        v-else
          :time="this.$store.getters.getDuration"
          :transform="transformSlotProps"
          v-slot="{ minutes, seconds }"
          @start="startTest"
          @end="finishTest"
        >
          {{ minutes }}:{{ seconds }}
        </vue-countdown>
      </p>
    </section>
  </transition>
</template>
<script setup>
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
// const router = useRouter();
const store = useStore()

const startTest = () => {
  axios.get("http://localhost:3000/papers/"+route.params.id).then((response) => {
    if (response.data.startTime === null) {
      let start = Date.now();
      let end = start + response.data.minutes * 60000;
      axios.patch("http://localhost:3000/papers/"+route.params.id, {
        startTime: Date.now(),
        endTime: end,
      });
    } else {
      if (Date.now() > response.data?.endTime) {
        finishTest();
      }
    }
  });
};

const finishTest = () => {
  axios.patch("http://localhost:3000/papers/"+route.params.id, {
    completed: true,
    duration: 0,
  });
  store.commit("setDuration", 0);
  store.commit("setActiveComponent", 'TestCompleted');
};

const transformSlotProps = (props) => {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
};
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 10s;
}
.bounce-leave-active {
  animation: bounce-in 10s reverse;
}
@keyframes bounce-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
