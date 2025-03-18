<template>
  <section class="mx-auto pt-12 space-y-8">
    <h1 class="text-[4.4rem] font-extrabold leading-20 tracking-tighter text-center">
      A Leading Financial Services <br />
      and Data Provider
    </h1>
    <p class="text-center text-lg">
      Providing a range of financial services and products. <br/> Serving
      individuals and companies throughout South Africa and Africa.
    </p>
    <div class="flex justify-center gap-x-4">
      <button class="btn btn-secondary">Get started</button>
      <button class="btn btn-primary">Read more</button>
    </div>
    <div class="space-y-4">
      <p class="text-center text-sm">
        See who uses our white label solutions to provide trading and investment services to their clients.
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
