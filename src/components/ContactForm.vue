<template>
  <form>
    <div class="flex flex-col sm:flex-row md:flex-col items-center gap-8 max-sm:flex-col w-full">
      <div class="flex flex-col space-y-4 items-center w-1/2 md:w-full">
        <input
          type="text"
          minlength="5"
          required
          name="Full name"
          placeholder="Full Name"
          class="input"
        />
        <input
          type="email"
          minlength="10"
          required
          name="Email"
          placeholder="Email"
          class="input"
        />
        <input
          type="text"
          minlength="15"
          required
          name="Message"
          placeholder="Type your message..."
          class="input h-24"
        />
      </div>
      <div class="md:w-full">
        <ul class="text-sm md:text-md text-primary-950 space-y-1.5">
          <li class="flex items-center gap-x-4">
            <i class="bi bi-envelope-arrow-up-fill"></i>
            <span>support@sharenet.co.za</span>
          </li>
          <li class="flex items-center gap-x-4">
            <i class="bi bi-telephone-forward-fill"></i>
            <span>(021) 700 4800</span>
          </li>
          <li class="flex items-center gap-x-4">
            <i class="bi bi-telephone-forward-fill"></i>
            <span>+27 21 700 4800 (International)</span>
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script setup></script>
