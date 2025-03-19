<template>
    <div class="flex max-md:flex-wrap justify-center items-center w-8/12 mx-auto gap-x-4 mb-12">
        <ul v-for="image in partnerImages" :key="image.name">
          <li><img :src="image.path" alt="partner" class="min-w-[60px] max-w-[80px]" /></li>
        </ul>
      </div>
</template>

<script setup>
const partnerImages = [
  { name: 'image1', path: '../../public/images/partner-1.png' },
  { name: 'image2', path: '../../public/images/partner-2.png' },
  { name: 'image3', path: '../../public/images/partner-3.png' },
  { name: 'image4', path: '../../public/images/partner-4.png' },
  { name: 'image5', path: '../../public/images/partner-5.png' },
  { name: 'image6', path: '../../public/images/partner-6.png' },
  { name: 'image7', path: '../../public/images/partner-7.png' },
  { name: 'image8', path: '../../public/images/partner-8.png' },
]
</script>
