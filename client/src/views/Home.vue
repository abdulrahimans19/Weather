<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import WeatherCard from '../components/WeatherCard.vue'

const places = ref([])

const addPlace = (data) => {
  places.value.push(data)
}

const deletePlace = (name) => {
  if (confirm('Are you sure')) {
    places.value = places.value.filter((p) => p.location.name !== name)
  }
}
</script>
<template>
  <main>  
    <!-- Search -->
    <div>
      <NavBar @place-data="addPlace" />
    </div>

    <!-- Weather cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(place, idx) in places" :key="idx">
        <WeatherCard :place="place" @delete-place="deletePlace" />
      </div>
    </div>
  </main>
</template>
<style scoped></style>
