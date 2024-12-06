<script setup>
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "~/components/config/firestore";
const cityName = [
  { id: 1, name: 'Dhaka', lat: 23.8103, lon: 90.4125 },
  { id: 2, name: 'Faridpur', lat: 23.6070, lon: 89.8429 },
  { id: 3, name: 'Gazipur', lat: 23.9999, lon: 90.4203 },
  { id: 4, name: 'Gopalganj', lat: 23.0050, lon: 89.8266 },
  { id: 5, name: 'Jamalpur', lat: 24.9375, lon: 89.9371 },
  { id: 6, name: 'Kishoreganj', lat: 24.4449, lon: 90.7766 },
  { id: 7, name: 'Madaripur', lat: 23.1641, lon: 90.1893 },
  { id: 8, name: 'Manikganj', lat: 23.8644, lon: 90.0047 },
  { id: 9, name: 'Munshiganj', lat: 23.5422, lon: 90.5305 },
  { id: 10, name: 'Mymensingh', lat: 24.7471, lon: 90.4203 },
  { id: 11, name: 'Narayanganj', lat: 23.6238, lon: 90.5000 },
  { id: 12, name: 'Narsingdi', lat: 23.9322, lon: 90.7187 },
  { id: 13, name: 'Netrokona', lat: 24.8852, lon: 90.7270 },
  { id: 14, name: 'Rajbari', lat: 23.7574, lon: 89.6445 },
  { id: 15, name: 'Shariatpur', lat: 23.2426, lon: 90.4343 },
  { id: 16, name: 'Sherpur', lat: 25.0196, lon: 90.0153 },
  { id: 17, name: 'Tangail', lat: 24.2498, lon: 89.9167 },
  { id: 18, name: 'Bogra', lat: 24.8467, lon: 89.3770 },
  { id: 19, name: 'Joypurhat', lat: 25.1012, lon: 89.0280 },
  { id: 20, name: 'Naogaon', lat: 24.7936, lon: 88.9318 },
  { id: 21, name: 'Natore', lat: 24.4125, lon: 88.9802 },
  { id: 22, name: 'Nawabganj', lat: 24.5965, lon: 88.2775 },
  { id: 23, name: 'Pabna', lat: 24.0064, lon: 89.2393 },
  { id: 24, name: 'Rajshahi', lat: 24.3745, lon: 88.6042 },
  { id: 25, name: 'Sirajgonj', lat: 24.4534, lon: 89.7001 },
  { id: 26, name: 'Dinajpur', lat: 25.6270, lon: 88.6377 },
  { id: 27, name: 'Gaibandha', lat: 25.3287, lon: 89.5411 },
  { id: 28, name: 'Kurigram', lat: 25.8077, lon: 89.6674 },
  { id: 29, name: 'Lalmonirhat', lat: 25.9923, lon: 89.2847 },
  { id: 30, name: 'Nilphamari', lat: 25.9317, lon: 88.8560 },
  { id: 31, name: 'Panchagarh', lat: 26.3309, lon: 88.5541 },
  { id: 32, name: 'Rangpur', lat: 25.7465, lon: 89.2508 },
  { id: 33, name: 'Thakurgaon', lat: 26.0330, lon: 88.4641 },
  { id: 34, name: 'Barguna', lat: 22.1567, lon: 90.1250 },
  { id: 35, name: 'Barisal', lat: 22.7010, lon: 90.3535 },
  { id: 36, name: 'Bhola', lat: 22.6859, lon: 90.6482 },
  { id: 37, name: 'Jhalokati', lat: 22.6406, lon: 90.2000 },
  { id: 38, name: 'Patuakhali', lat: 22.3596, lon: 90.3299 },
  { id: 39, name: 'Pirojpur', lat: 22.5790, lon: 89.9750 },
  { id: 40, name: 'Bandarban', lat: 22.1953, lon: 92.2184 },
  { id: 41, name: 'Brahmanbaria', lat: 23.9571, lon: 91.1119 },
  { id: 42, name: 'Chandpur', lat: 23.2333, lon: 90.6710 },
  { id: 43, name: 'Chittagong', lat: 22.3569, lon: 91.7832 },
  { id: 44, name: 'Comilla', lat: 23.4578, lon: 91.2049 },
  { id: 45, name: 'Cox\'s Bazar', lat: 21.4272, lon: 92.0058 },
  { id: 46, name: 'Feni', lat: 23.0159, lon: 91.3976 },
  { id: 47, name: 'Khagrachari', lat: 23.1097, lon: 91.9704 },
  { id: 48, name: 'Lakshmipur', lat: 22.9427, lon: 90.8412 },
  { id: 49, name: 'Noakhali', lat: 22.8696, lon: 91.0982 },
  { id: 50, name: 'Rangamati', lat: 22.6360, lon: 92.1987 },
  { id: 51, name: 'Habiganj', lat: 24.3815, lon: 91.4155 },
  { id: 52, name: 'Maulvibazar', lat: 24.4823, lon: 91.7774 },
  { id: 53, name: 'Sunamganj', lat: 25.0658, lon: 91.3951 },
  { id: 54, name: 'Sylhet', lat: 24.8949, lon: 91.8687 },
  { id: 55, name: 'Bagerhat', lat: 22.6553, lon: 89.7850 },
  { id: 56, name: 'Chuadanga', lat: 23.6402, lon: 88.8410 },
  { id: 57, name: 'Jessore', lat: 23.1704, lon: 89.2029 },
  { id: 58, name: 'Jhenaidah', lat: 23.5446, lon: 89.1534 },
  { id: 59, name: 'Khulna', lat: 22.8456, lon: 89.5403 },
  { id: 60, name: 'Kushtia', lat: 23.8907, lon: 89.1099 },
  { id: 61, name: 'Magura', lat: 23.4873, lon: 89.4196 },
  { id: 62, name: 'Meherpur', lat: 23.7945, lon: 88.6312 },
  { id: 63, name: 'Narail', lat: 23.1641, lon: 89.4970 },
  { id: 64, name: 'Satkhira', lat: 22.7157, lon: 89.0706 },
];

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
]
const state = reactive({
  areaZone: '',
  date: new Date(),
  cityName: cityName,
  crimeType: crimeType,
  complainList: []
})

const formState = reactive({
    email: 'm.alinkon10@gmail.com',
    date: '',
    cityName: state.cityName[0].id,
    areaName: state.cityName[0].name,
    crimeType: '',
    description: '',
    photo: '',
    location: {location : { lat: state.cityName[0].lat, lng: state.cityName[0].lon}, weight: 5 },
    time: ''
})

watch(
  () => formState.cityName,
  (cityName) => {
    const find = state.cityName.find( ctn => ctn.id === cityName)
    formState.location.location.lat = find.lat
    formState.location.location.lng = find.lon
    formState.areaName = find.name

    console.log(`cityName is: ${cityName}`, find)
  }

)

async function onSubmit(event) {
  // Do something with event.data
  formState.time = new Date();
  console.log('ai predict data',event.data)
  await sendComplain()
}

const sendComplain = async() => { 
    const docRef = await addDoc(collection(db, "hComplain"), formState);
    console.log("Document written with ID: ", docRef.id);
    await fetchComplain()
}

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
    console.log('firestore database')
    await fetchComplain()
})

</script>

<template>
    <section class="flex justify-center">
        <section class="w-4/6">
            <p class="font-bold text-[32px] py-8">Complain about specific Area or Zone</p>
            <UForm :state="formState" class="space-y-4" @submit="onSubmit">
            
              <section class="grid grid-cols-3 gap-4">
                <UFormGroup label="City/Zone" name="cityName">
                <USelectMenu
                    v-model="formState.cityName"
                    :options="state.cityName"
                    placeholder="Select area/zone"
                    value-attribute="id"
                    option-attribute="name"
                />
                </UFormGroup>
                <UFormGroup label="Latitude" name="Lat">
                    <UInput v-model="formState.location.location.lat" type="number" />
                </UFormGroup>
                <UFormGroup label="Loglongitude" name="lng">
                    <UInput v-model="formState.location.location.lng" type="number" />
                </UFormGroup>

                <UFormGroup label="Crime Type" name="crimeType">
                <USelectMenu
                    v-model="formState.crimeType"
                    :options="state.crimeType"
                    placeholder="Select crime type"
                    value-attribute="id"
                    option-attribute="name"
                />
                </UFormGroup>

                <UFormGroup label="Date" name="date">
                <UInput
                    v-model="formState.date"
                    type="date"
                />
                </UFormGroup>

                <UFormGroup label="Crime Description" name="description">
                    <UInput v-model="formState.description" type="text" />
                </UFormGroup>

                
              </section>
              <UInput type="file" size="sm" icon="i-heroicons-folder" disabled />
              <UInput type="email" size="sm" icon="ic:baseline-alternate-email" v-model="formState.email" />

            <UButton type="submit">
                Submit
            </UButton>
            </UForm>
        </section>
    </section>
    <section class="flex justify-center">
        <section class="w-4/6">
            <p class="font-bold text-[32px] py-8">Your Complaint list</p>
            <section class=" border-green-500">
                <section v-if="state.complainList.length > 0">
                    <section class="py-2 px-1 border border-red-500 my-1" v-for="com in state.complainList" :key="com">
                        <p>
                            Id : {{com.id}}
                        </p>
                        <p>
                            Area : {{com?.areaName}} 
                        </p>
                        <p>
                            Description : {{com.description}} 
                        </p>

                    </section>  
                </section>
            </section>
        </section>
    </section>
</template>