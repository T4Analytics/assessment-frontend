<template>
  <section class="flex flex-col justify-center items-center p-2 md:p-0">
    <div class="rounded-3xl flex flex-col gap-y-5 justify-center items-center">
      <i class="fas fa-check-circle"></i>
      <h1 class="text-t4-bg font-bold md:text-5xl text-3xl text-center">Test Tamamlandı.</h1>
      <p class="text-sm text-center">
        Katıldığınız için teşekkürler.
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
  color: #33ff33;
  font-size: 10rem;
}
</style>
