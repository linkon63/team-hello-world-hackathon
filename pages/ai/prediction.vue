<script setup>
//   email: undefined,
//   password: undefined,
//   year: '',
//   city: '',
//   crimeType: [
//   { id: 1, name: 'Murder' },
//   { id: 2, name: 'Kidnapping' },
//   { id: 3, name: 'Crime Against Women' },
//   { id: 4, name: 'Crime Against Children' },
//   { id: 5, name: 'Crime Committed by Juveniles' },
//   { id: 6, name: 'Crime Against Senior Citizen' },
//   { id: 7, name: 'Drug Trafficking' },
//   { id: 8, name: 'Theft' },
//   { id: 9, name: 'Rape' },
//   { id: 10, name: 'Robbery' }

const state = reactive({
    predictData: '',
    districtName: [
    { id: 1, name: "Bagerhat" },
    { id: 2, name: "Bandarban" },
    { id: 3, name: "Barguna" },
    { id: 4, name: "Barisal" },
    { id: 5, name: "Bhola" },
    { id: 6, name: "Bogra" },
    { id: 7, name: "Brahmanbaria" },
    { id: 8, name: "Chandpur" },
    { id: 9, name: "Chittagong" },
    { id: 10, name: "Chuadanga" },
    { id: 11, name: "Comilla" },
    { id: 12, name: "Cox's Bazar" },
    { id: 13, name: "Dhaka" },
    { id: 14, name: "Dinajpur" },
    { id: 15, name: "Faridpur" },
    { id: 16, name: "Feni" },
    { id: 17, name: "Gaibandha" },
    { id: 18, name: "Gazipur" },
    { id: 19, name: "Gopalganj" },
    { id: 20, name: "Habiganj" },
    { id: 21, name: "Jamalpur" },
    { id: 22, name: "Jessore" },
    { id: 23, name: "Jhalokati" },
    { id: 24, name: "Jhenaidah" },
    { id: 25, name: "Joypurhat" },
    { id: 26, name: "Khagrachari" },
    { id: 27, name: "Khulna" },
    { id: 28, name: "Kishoreganj" },
    { id: 29, name: "Kurigram" },
    { id: 30, name: "Kushtia" },
    { id: 31, name: "Lakshmipur" },
    { id: 32, name: "Lalmonirhat" },
    { id: 33, name: "Madaripur" },
    { id: 34, name: "Magura" },
    { id: 35, name: "Manikganj" },
    { id: 36, name: "Meherpur" },
    { id: 37, name: "Moulvibazar" },
    { id: 38, name: "Munshiganj" },
    { id: 39, name: "Mymensingh" },
    { id: 40, name: "Naogaon" },
    { id: 41, name: "Narail" },
    { id: 42, name: "Narayanganj" },
    { id: 43, name: "Narsingdi" },
    { id: 44, name: "Natore" },
    { id: 45, name: "Netrokona" },
    { id: 46, name: "Nilphamari" },
    { id: 47, name: "Noakhali" },
    { id: 48, name: "Pabna" },
    { id: 49, name: "Panchagarh" },
    { id: 50, name: "Patuakhali" },
    { id: 51, name: "Pirojpur" },
    { id: 52, name: "Rajbari" },
    { id: 53, name: "Rajshahi" },
    { id: 54, name: "Rangamati" },
    { id: 55, name: "Rangpur" },
    { id: 56, name: "Satkhira" },
    { id: 57, name: "Shariatpur" },
    { id: 58, name: "Sherpur" },
    { id: 59, name: "Sirajganj" },
    { id: 60, name: "Sunamganj" },
    { id: 61, name: "Sylhet" },
    { id: 62, name: "Tangail" },
    { id: 63, name: "Thakurgaon" }
    ],
    crimeType: [
    { id: 1, name: "Murder" },
    { id: 2, name: "Kidnapping" },
    { id: 3, name: "Crime Against Women" },
    { id: 4, name: "Crime Against Children" },
    { id: 5, name: "Crime Committed by Juveniles" },
    { id: 6, name: "Crime Against Senior Citizen" },
    { id: 7, name: "Drug Trafficking" },
    { id: 8, name: "Theft" },
    { id: 9, name: "Rape" },
    { id: 10, name: "Robbery" }
    ]})

const formState = reactive({
    year: '',
    district: '',
    crime: ''
})

// async function onSubmit(event) {
//   // Do something with event.data
//   console.log('ai predict data',event.data)
// }

const aiPredict = async() => {
    const obj = {
        District: formState.district,
        Year: formState.year + '',
        Crime: formState.crime
    }
    console.log('Send Object', obj)
  const res = await useFetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    body: JSON.stringify(obj)
  })

  state.predictData = res.data.value
}

</script>

<template>
    <section class="flex justify-center">
        <section class="w-4/6">
            <p class="font-bold text-[32px] py-8">AI Prediction Crime Zone</p>
            <p class="py-1 font-semibold">Select the District</p>
            <USelectMenu
                v-model="formState.district"
                :options="state.districtName" 
                placeholder="Select Dristrict"
                value-attribute="name"
                option-attribute="name"
            />
            <br>
            <USelectMenu
                v-model="formState.crime"
                :options="state.crimeType" 
                placeholder="Select Dristrict"
                value-attribute="name"
                option-attribute="name"
            />
            <br>
            <UInput v-model="formState.year" type="number" placeholder="Enter a 2010 to 2100"
                min="2010"
                max="2100" />
            <br>
            <UButton type="button" @click="aiPredict">
                Submit
            </UButton>
            <br>
            <section class="font-bold py-4">
                <p>Crime Status: {{   state.predictData.Crime_Status}}</p>
                <p>Crime Type: {{   state.predictData.Crime_Type}}</p>
                <p>Estimated_Cases: {{   state.predictData.Estimated_Cases}}</p>
                <p>Population_Used: {{   state.predictData.Population_Used}}</p>
                <p>Predicted_Crime_Rate: {{   state.predictData.Predicted_Crime_Rate}}</p>
            </section>
        </section>
    </section>
</template>

