<template>
  <header>
    <div
      class="bg-t4-bg h-[60px] flex items-center justify-between px-4 relative"
    >
      <div>
        <a class="text-white text-xl">T4 Analytics</a>
      </div>
      <div class="flex gap-6 items-center">
        <a
          class="text-white text-base hover:text-gray-300 cursor-pointer hidden lg:inline-block"
          v-for="(link, index) in navigationLinks"
          :key="index"
          >{{ link.name }}</a
        >
        <div class="lg:hidden">
          <i
            @click="showMobileMenu"
            class="fas text-white cursor-pointer"
            :class="mobileMenuIcon"
          ></i>
        </div>
      </div>
    </div>

    <div
      id="mobile-menu"
      class="bg-t4-bg w-screen absolute top-14 p-5 animate__animated animate__fadeIn lg:hidden"
      :class="{ hidden: !mobileMenu }"
    >
      <ul class="flex flex-col gap-3">
        <li
          class="text-center"
          v-for="(link, index) in navigationLinks"
          :key="index"
        >
          <a class="text-white text-base hover:text-gray-300 cursor-pointer">{{
            link.name
          }}</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<script setup>
import { ref } from "vue";
const mobileMenu = ref(false);
const mobileMenuIcon = ref("fa-bars");
const navigationLinks = [
  {
    name: "Envanter Hakkında",
  },
  {
    name: "KVKK Bilgilendirme Metni",
  },
];

const showMobileMenu = () => {
  if (!mobileMenu.value) {
    mobileMenu.value = true;
    mobileMenuIcon.value = "fa-times";
  } else {
    mobileMenu.value = false;
    mobileMenuIcon.value = "fa-bars";
  }
};
</script>
<style scoped></style>
