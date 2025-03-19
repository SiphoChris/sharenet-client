<template>
  <footer>
    <div class="mx-auto py-8 bg-black text-primary-50">
      <ul class="space-y-16">
        <li class="flex justify-evenly max-md:flex-col max-md:text-center max-md:space-y-6 items-center">
          <ul class="space-y-1">
            <li class="text-primary-300 text-sm">Site Map</li>
            <li><RouterLink to="/home" class="text-primary-50 text-xs md:text-md">Home</RouterLink></li>
            <li><RouterLink to="/contact" class="text-primary-50 text-xs md:text-md">Contact</RouterLink></li>
            <li><RouterLink to="/venues" class="text-primary-50 text-xs md:text-md">See more venues</RouterLink></li>
          </ul>
          <img class="max-w-1/2 w-full" src="../../public/images/intellidex-awards-2020.png" alt="partners" />
        </li>
        <li class="text-center text-xs">&copy;Copyrights Reserved {{ currentYear }} Sharenet</li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear().toString()
</script>
