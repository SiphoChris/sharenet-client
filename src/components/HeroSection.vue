<template>
  <section class="mx-auto pt-12 space-y-6 md:space-y-8">
    <h1 class="text-4xl md:text-6xl lg:text-[4.4rem] font-extrabold leading:12 md:leading-20 tracking-tighter text-center">
      A Leading Financial Services <br />
      and Data Provider
    </h1>
    <p class="text-center text-sm md:text-lg">
      Providing a range of financial services and products. <br/> Serving
      individuals and companies throughout South Africa and Africa.
    </p>
    <div class="flex justify-center gap-x-4">
      <button class="btn btn-secondary">Get started</button>
      <button class="btn btn-primary">Read more</button>
    </div>
    <div class="space-y-4">
      <p class="text-center text-xs md:text-sm">
        See who uses our white label solutions to provide trading and investment services to their clients.
      </p>
      <PartnerImages />
    </div>
  </section>
</template>
<script setup>
import PartnerImages from './PartnersComp.vue'
</script>
