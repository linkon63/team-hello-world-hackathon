<script setup>
import { GoogleMap, HeatmapLayer } from 'vue3-google-map';
import { ref } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../components/config/firestore.js'
import { collection, getDocs } from "firebase/firestore";

const locations = ref({
    FCB: {
        id: 'FCB',
        headline: 'FC Bayern München',
        text: 'Bayern München is the most successful soccer club in Germany. In the german Bundesliga their current rank is #1. Add some more text for this item to make it look bigger',
        lat: 48.21888549557031,
        lng: 11.625109549171704
    },
    SCF: {
        id: 'SCF',
        headline: 'SC Freiburg',
        text: 'SC Freiburg is also a german soccer club from the 1. Bundesliga in Germany. In the german Bundesliga their current rank is #2. Add some more text for this item to make it look bigger',
        lat: 48.021196964093434,
        lng: 7.82996300258625
    },
    RBL: {
        id: 'RBL',
        headline: 'Red Bull Leipzig',
        text: 'Red Bull Leipzig is a very good soccer club as well. They are sponsered by Red Bull I guess. In the german Bundesliga their current rank is #3. Add some more text for this item to make it look bigger',
        lat: 51.34762220651972,
        lng: 12.35519705573161
    },
    FCUB: {
        id: 'FCUB',
        headline: 'Union Berlin',
        text: 'This is a soccer club from Berlin. I dont know anything about soccer but here is more text. In the german Bundesliga their current rank is #5. Add some more text for this item to make it look bigger',
        lat: 52.45755304910101,
        lng: 13.568600380052235
    },
    BVB: {
        id: 'BVB',
        headline: 'BVB Borussia Dortmund',
        text: 'BVB is also pretty good soccer club right? They are colored in yellow and black and I thats all I know. In the german Bundesliga their current rank is #6. Add some more text for this item to make it look bigger',
        lat: 51.492787217050754,
        lng: 7.452501674962833
    }
});

const apiKey = 'AIzaSyDM_zbLEpF8w2xOdMQzoGfKM-GavUXuhl4'

const sanFrancisco = { lat: 37.774546, lng: -122.433523 }

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

const crimeItemsOptions = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], 
//   
]

// onMounted(async() => {
//     console.log('firestore database')
//     const querySnapshot = await getDocs(collection(db, "todos"));
//     console.log('firestore database', querySnapshot)

//     querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     });

// })

</script>
<template>
   <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <section class="w-full mx-2">
        <p class="font-bold text-[32px] py-8">Map control Pabel</p>
        <section class="border w-full">
            <UDropdown :items="crimeItemsOptions" :popper="{ placement: 'bottom-start' }" class="border w-full border-green-400">
                <UButton color="white" label="Select Crime" trailing-icon="i-heroicons-chevron-down-20-solid" class="border border-red-500" />
            </UDropdown>
        </section>
    </section>
    <section class="w-full mx-2">
        <p class="font-bold text-[32px] py-8">Heat map showing</p>
        <GoogleMap
        :api-key="apiKey"
        :libraries="['visualization']"
        style="width: 100%; height: 500px"
        :center="sanFrancisco"
        :zoom="13"
    >
        <HeatmapLayer :options="{ data: heatmapData }" />
    </GoogleMap>
    </section>
    <!-- <section class="w-3/6 mx-2">
        <p class="font-bold text-[32px] py-8">Normal Map Showing</p>
        <GoogleMap
            :api-key="apiKey"
            style="width: 100%; height: 500px"
            :center="{ lat: 33.678, lng: -116.243 }"
            :zoom="15" mapTypeId="terrain"
            >
                <Rectangle :options="rectangle" />
    </GoogleMap>
    </section> -->
</section>

</template>

<style scoped>
.map {
    position: relative;
    width: 100%;
    height: 650px;
}
</style>