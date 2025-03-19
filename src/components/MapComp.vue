<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import {GOOGLE_MAPS_API_KEY} from '../../utils/index.js'

const apiKey = GOOGLE_MAPS_API_KEY

const center = { lat: -33.8775, lng: 18.6275 }
</script>

<template>
  <GoogleMap
  :api-key="apiKey"
  :center="center"
  :zoom="15"
  class="h-96 max-md:w-10/12 w-5/12"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>