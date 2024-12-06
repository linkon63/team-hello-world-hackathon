<script setup>
import { GoogleMap, HeatmapLayer } from 'vue3-google-map';
import { ref } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../components/config/firestore.js'
import { collection, getDocs } from "firebase/firestore";

const apiKey = 'AIzaSyDM_zbLEpF8w2xOdMQzoGfKM-GavUXuhl4'

const bangladesh = { lat: 23.6850, lng: 90.3563 }
const mapRef = ref(null)
let heatmapData = [
  { location: { lat: 23.780887, lng: 90.279237 }, weight: 0.5 }, // Dhanmondi
  { lat: 23.793389, lng: 90.404687 }, // Bashundhara
  { location: { lat: 23.752688, lng: 90.375351 }, weight: 2 }, // Motijheel
  { location: { lat: 23.810331, lng: 90.412521 }, weight: 3 }, // Gulshan
  { location: { lat: 23.795779, lng: 90.349285 }, weight: 2 }, // Mohammadpur
  { lat: 23.734007, lng: 90.392847 }, // Paltan
  { location: { lat: 23.726221, lng: 90.417049 }, weight: 0.5 }, // Shahbagh
  { location: { lat: 23.768557, lng: 90.428833 }, weight: 3 }, // Banani
  { location: { lat: 23.709921, lng: 90.407143 }, weight: 2 }, // Lalbagh
  { lat: 23.738264, lng: 90.409040 }, // New Market
  { location: { lat: 23.746466, lng: 90.376015 }, weight: 0.5 }, // Ramna
  { lat: 23.814169, lng: 90.427619 }, // Baridhara
  { location: { lat: 23.868722, lng: 90.400787 }, weight: 2 }, // Uttara
  { location: { lat: 23.774015, lng: 90.365131 }, weight: 3 }, // Mirpur
  { location: { lat: 23.721920, lng: 90.431192 }, weight: 2 }, // Old Dhaka
  { lat: 23.820263, lng: 90.355871 }, // Pallabi
  { location: { lat: 23.781640, lng: 90.428217 }, weight: 0.5 }, // Niketon
  { location: { lat: 23.745928, lng: 90.392677 }, weight: 1 }, // Katabon
  { lat: 23.766199, lng: 90.422936 }, // Mohakhali
  { location: { lat: 23.737931, lng: 90.402926 }, weight: 3 }, // Segunbagicha
  { location: { lat: 23.754439, lng: 90.376589 }, weight: 1 }, // Shahbagh National Museum
  { location: { lat: 23.731830, lng: 90.402455 }, weight: 1.5 }, // Elephant Road
  { location: { lat: 23.800678, lng: 90.355345 }, weight: 2 }, // Kalyanpur
  { lat: 23.747210, lng: 90.394865 }, // Science Lab
  { location: { lat: 23.762762, lng: 90.431072 }, weight: 0.5 }, // Tejgaon
  { lat: 23.744839, lng: 90.395064 }, // Panthapath
  { location: { lat: 23.816790, lng: 90.430091 }, weight: 2 }, // Pragati Sarani
  { location: { lat: 23.698937, lng: 90.423510 }, weight: 1.5 }, // Jatrabari
  { location: { lat: 23.761027, lng: 90.364722 }, weight: 3 }, // Agargaon
  { lat: 23.726831, lng: 90.435916 }, // Gandaria
];



const state = reactive([
  { location: { lat: 23.780887, lng: 90.279237 }, weight: 0.5 }, // Dhanmondi
  { lat: 23.793389, lng: 90.404687 }, // Bashundhara
  { location: { lat: 23.752688, lng: 90.375351 }, weight: 2 }, // Motijheel
  { location: { lat: 23.810331, lng: 90.412521 }, weight: 3 }, // Gulshan
  { location: { lat: 23.795779, lng: 90.349285 }, weight: 2 }, // Mohammadpur
  { lat: 23.734007, lng: 90.392847 }, // Paltan
  { location: { lat: 23.726221, lng: 90.417049 }, weight: 0.5 }, // Shahbagh
  { location: { lat: 23.768557, lng: 90.428833 }, weight: 3 }, // Banani
  { location: { lat: 23.709921, lng: 90.407143 }, weight: 2 }, // Lalbagh
  { lat: 23.738264, lng: 90.409040 }, // New Market
  { location: { lat: 23.746466, lng: 90.376015 }, weight: 0.5 }, // Ramna
  { lat: 23.814169, lng: 90.427619 }, // Baridhara
  { location: { lat: 23.868722, lng: 90.400787 }, weight: 2 }, // Uttara
  { location: { lat: 23.774015, lng: 90.365131 }, weight: 3 }, // Mirpur
  { location: { lat: 23.721920, lng: 90.431192 }, weight: 2 }, // Old Dhaka
  { lat: 23.820263, lng: 90.355871 }, // Pallabi
  { location: { lat: 23.781640, lng: 90.428217 }, weight: 0.5 }, // Niketon
  { location: { lat: 23.745928, lng: 90.392677 }, weight: 1 }, // Katabon
  { lat: 23.766199, lng: 90.422936 }, // Mohakhali
  { location: { lat: 23.737931, lng: 90.402926 }, weight: 3 }, // Segunbagicha
  { location: { lat: 23.754439, lng: 90.376589 }, weight: 1 }, // Shahbagh National Museum
  { location: { lat: 23.731830, lng: 90.402455 }, weight: 1.5 }, // Elephant Road
  { location: { lat: 23.800678, lng: 90.355345 }, weight: 2 }, // Kalyanpur
  { lat: 23.747210, lng: 90.394865 }, // Science Lab
  { location: { lat: 23.762762, lng: 90.431072 }, weight: 0.5 }, // Tejgaon
  { lat: 23.744839, lng: 90.395064 }, // Panthapath
  { location: { lat: 23.816790, lng: 90.430091 }, weight: 2 }, // Pragati Sarani
  { location: { lat: 23.698937, lng: 90.423510 }, weight: 1.5 }, // Jatrabari
  { location: { lat: 23.761027, lng: 90.364722 }, weight: 3 }, // Agargaon
  { lat: 23.726831, lng: 90.435916 }, // Gandaria
]);

const localState = reactive({
    crimeLocation: []
})


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
        });
        state.complainList = complainList
}

watch(
  () => selected.value,
  (newSelected) => {
    const currentCrime = state.complainList.filter( cl => cl.crimeType === newSelected)
    const location = []
    if(currentCrime.length > 0){
        for(let i = 0; i < currentCrime.length; i++){
            location.push(currentCrime[i].location)
        }
    }

    console.log('location', location)
    localState.crimeLocation = location
//     heatmapData = [{ location: { lat: 23.795779, lng: 90.349285 }, weight: 2 }, // Mohammadpur
//   { lat: 23.734007, lng: 90.392847 }, // Paltan
//   { location: { lat: 23.726221, lng: 90.417049 }, weight: 0.5 }, // Shahbagh
//   { location: { lat: 23.768557, lng: 90.428833 }, weight: 3 }, // Banani
//   { location: { lat: 23.709921, lng: 90.407143 }, weight: 2 }, // Lalbagh
//   { lat: 23.738264, lng: 90.409040 }, // New Market
//   { location: { lat: 23.746466, lng: 90.376015 }, weight: 0.5 }, // Ramna
//   { lat: 23.814169, lng: 90.427619 }, // Baridhara
//   { location: { lat: 23.868722, lng: 90.400787 }, weight: 2 }, // Uttara
//   { location: { lat: 23.774015, lng: 90.365131 }, weight: 3 }, // Mirpur
//   { location: { lat: 23.721920, lng: 90.431192 }, weight: 2 }, // Old Dhaka
//   { lat: 23.820263, lng: 90.355871 }, // Pallabi
//   { location: { lat: 23.781640, lng: 90.428217 }, weight: 0.5 }, // Niketon
//   { location: { lat: 23.745928, lng: 90.392677 }, weight: 1 }, // Katabon
//   { lat: 23.766199, lng: 90.422936 }, // Mohakhali
//   { location: { lat: 23.737931, lng: 90.402926 }, weight: 3 }, // Segunbagicha
//   { location: { lat: 23.754439, lng: 90.376589 }, weight: 1 }, // Shahbagh National Museum
//   { location: { lat: 23.731830, lng: 90.402455 }, weight: 1.5 }, // Elephant Road
//   { location: { lat: 23.800678, lng: 90.355345 }, weight: 2 }, // Kalyanpur
//   { lat: 23.747210, lng: 90.394865 }, // Science Lab
//   { location: { lat: 23.762762, lng: 90.431072 }, weight: 0.5 }, // Tejgaon
//   { lat: 23.744839, lng: 90.395064 }, // Panthapath
//   { location: { lat: 23.816790, lng: 90.430091 }, weight: 2 }, // Pragati Sarani
//   { location: { lat: 23.698937, lng: 90.423510 }, weight: 1.5 }, // Jatrabari
//   { location: { lat: 23.761027, lng: 90.364722 }, weight: 3 }, // Agargaon
//   { lat: 23.726831, lng: 90.435916 }, // Gandaria
//   ]
    // const heatMap = new HeatmapLayer
    // console.log('heatMap', heatMap)
    //  { location: { lat: 23.780887, lng: 90.279237 }, weight: 0.5 }, // Dhanmondi
    //   { lat: 23.793389, lng: 90.404687 }, // Bashundhara
    //   { location: { lat: 23.752688, lng: 90.375351 }, weight: 2 }, // Motijheel

    // mapRef.value.options.data = [
    //   { location: { lat: 23.780887, lng: 90.279237 }, weight: 0.5 }, // Dhanmondi
    //   { lat: 23.793389, lng: 90.404687 }, // Bashundhara
    //   { location: { lat: 23.752688, lng: 90.375351 }, weight: 2 }, // Motijheel
    // ]
    // mapRef.heatmapLayer.data.Eg = [
    //   { location: { lat: 23.780887, lng: 90.279237 }, weight: 0.5 }, // Dhanmondi
    //   { lat: 23.793389, lng: 90.404687 }, // Bashundhara
    //   { location: { lat: 23.752688, lng: 90.375351 }, weight: 2 }, // Motijheel
    // ]
    // console.log('mapRef.heatmapLayer.data.Eg', mapRef.value.heatmapLayer.data.Eg)
    // mapRef.value.heatmapLayer.data.Eg = [
    //   { location: { lat: 23.780887, lng: 90.279237 }, weight: 0.5 }, // Dhanmondi
    //   { lat: 23.793389, lng: 90.404687 }, // Bashundhara
    //   { location: { lat: 23.752688, lng: 90.375351 }, weight: 2 }, // Motijheel
    // ]
    // console.log('mapRef.value.options.data', mapRef.value.options.data)
    // console.log('currentCrime', currentCrime)
    // console.log('crime type id', newSelected)
    // console.log('complainList', state.complainList)

    // console.log(`mapRef is: ${mapRef}`,mapRef)
    console.log(`mapRef is: ${mapRef}`,mapRef.value)

  }

)

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
        <section class="w-full py-8">
            <div class="" v-for="location in localState.crimeLocation" :key="location">
                <section class="border-2 border-red-500 my-1">
                    <p>lat : {{ location.location.lat }}</p>
                    <p>log : {{ location.location.lng }}</p>
                </section>
            </div>
        </section>
        </section>
    </section>
    <section class="w-full mx-2">
        <p class="font-bold text-[32px] py-8 text-center">Heat map showing</p>
        <section>
            <IndexMarkerList :data="heatmapData" />
        </section>
        <!-- <GoogleMap
        :api-key="apiKey"
        :libraries="['visualization']"
        style="width: 100%; height: 600px"
        :center="bangladesh"
        :zoom="13"
    >

        <HeatmapLayer ref="mapRef" :options="{ data: heatmapData }" />
    </GoogleMap> -->
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