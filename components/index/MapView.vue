<script setup>
import { GoogleMap, HeatmapLayer } from 'vue3-google-map';
import { ref } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../components/config/firestore.js'
import { collection, getDocs } from "firebase/firestore";

const apiKey = 'AIzaSyDM_zbLEpF8w2xOdMQzoGfKM-GavUXuhl4'

const bangladesh = { lat: 23.6850, lng: 90.3563 }

const heatmapData = [
  { location: { lat: 37.782, lng: -122.447 }, weight: 0.5 },
  { lat: 37.782, lng: -122.445 },
  { location: { lat: 37.782, lng: -122.443 }, weight: 2 },
  { location: { lat: 37.782, lng: -122.441 }, weight: 3 },
  { location: { lat: 37.782, lng: -122.439 }, weight: 2 },
  { lat: 37.782, lng: -122.437 },
  { location: { lat: 37.782, lng: -122.435 }, weight: 0.5 },

  { location: { lat: 37.785, lng: -122.447 }, weight: 3 },
  { location: { lat: 37.785, lng: -122.445 }, weight: 2 },
  { lat: 37.785, lng: -122.443 },
  { location: { lat: 37.785, lng: -122.441 }, weight: 0.5 },
  { lat: 37.785, lng: -122.439 },
  { location: { lat: 37.785, lng: -122.437 }, weight: 2 },
  { location: { lat: 37.785, lng: -122.435 }, weight: 3 },
]


const state = reactive({
    heatmapData : heatmapData
});


const crimeItemsOptions = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], 
//   
]

const crimeType = [
  { id: 1, name: 'Murder' },
  { id: 2, name: 'Kidnapping' },
  { id: 3, name: 'Crime Against Women' },
  { id: 4, name: 'Crime Against Children' },
  { id: 5, name: 'Crime Committed by Juveniles' },
  { id: 6, name: 'Crime Against Senior Citizen' },
  { id: 7, name: 'Drug Trafficking' },
  { id: 8, name: 'Theft' },
  { id: 9, name: 'Rape' },
  { id: 10, name: 'Robbery' }
];

const selected = ref(crimeType[0].id)

const fetchComplain = async() => {
    const querySnapshot = await getDocs(collection(db, "hComplain"));

        const complainList = []

        querySnapshot.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id }
        complainList.push(obj)
        console.log(doc.id, " => ", doc.data());
        });
        state.complainList = complainList
}

onMounted(async() => {
    console.log('firestore database index homepage')
    await fetchComplain()

})

</script>
<template>
   <section class="grid grid-cols-1 lg:grid-cols-[20%_70%] gap-8 overflow-hidden">
    <section class="w-full mx-2">
        <p class="font-bold text-[32px] py-8">Map control Panel</p>
        <section class="w-full">
            <p class="py-1 font-semibold">Select the crime</p>
            <USelectMenu
                v-model="selected"
                :options="crimeType"
                placeholder="Select crime"
                value-attribute="id"
                option-attribute="name"
            />
            <section class="flex justify-center">
            <section class="w-full py-8 flex justify-center">
                <UButton class="bg-red-500 text-center w-full flex justify-center py-4">SOS</UButton>
            </section>
        </section>
        </section>
    </section>
    <section class="w-full mx-2">
        <p class="font-bold text-[32px] py-8 text-center">Heat map showing</p>
        <GoogleMap
        :api-key="apiKey"
        :libraries="['visualization']"
        style="width: 100%; height: 600px"
        :center="bangladesh"
        :zoom="13"
    >
        <HeatmapLayer :options="{ data: state?.heatmapData }" />
    </GoogleMap>
    </section>
</section>

</template>

<style scoped>
.map {
    position: relative;
    width: 100%;
    height: 700px;
}
</style>