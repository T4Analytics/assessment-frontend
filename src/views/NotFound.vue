<template>
  <section class="flex flex-col justify-center items-center p-2 md:p-0">
     <div class="rounded-3xl flex flex-col gap-y-5 justify-center items-center">
      <i class="fas fa-sad-tear"></i>
      <h1 class="text-t4-bg font-bold md:text-5xl text-3xl text-center">Sayfa bulunamadı.</h1>
      <p class="text-sm text-center">
        Tıkladığın bağlantı bozuk olabilir veya sayfa kaldırılmış olabilir.
      </p>
    </div>
  </section>
</template>
<script setup>
const appDiv = document.getElementById("app");

appDiv.classList.remove("flex-col", "justify-between");
appDiv.classList.add("justify-center");
document.body.classList.add("bg-gray-200");
</script>
<style scoped>
.fas{
  color: rgb(33 37 41);
  font-size: 10rem;
}
</style>
