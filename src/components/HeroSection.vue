<template>
  <section class="mx-auto pt-12 space-y-8">
    <h1 class="text-[4.4rem] font-extrabold leading-16 tracking-tighter text-center">
      lore um ipsum dolor,<br /> sit amet
      consectetur adipis
    </h1>
    <p class="text-center text-lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
      Nunc accumsan sem ut ligula scelerisque sollicitudin. In hac habit
    </p>
    <div class="flex justify-center gap-x-4">
      <button class="btn btn-secondary">Toggle</button>
      <button class="btn btn-primary">Toggle</button>
    </div>
    <div class="space-y-4">
      <p class="text-center text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident nisi in illum minus
        velit rations
      </p>
      <div class="flex justify-center items-center w-8/12 mx-auto gap-x-4 mb-12">
        <ul v-for="image in partnerImages" :key="image.name">
          <li><img :src="image.path" alt="partner" /></li>
        </ul>
      </div>
    </div>
  </section>
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


