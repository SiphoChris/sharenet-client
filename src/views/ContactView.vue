<template>
  <section class="flex flex-col gap-y-18 font-bold py-4 lg:py-18">
    <h3 class="text-3xl text-center">Contact us</h3>
    <div class="flex max-md:flex-col items-center justify-center gap-x-24 gap-y-8">
      <Map class="max-md:order-2"/>
      <Form class="max-md:order-1"/>
    </div>
  </section>
</template>

<script setup>
import Form from '../components/ContactForm.vue';
import Map from '../components/MapComp.vue';
</script>