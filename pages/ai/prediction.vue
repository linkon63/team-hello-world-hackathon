<script setup>

const state = reactive({
  email: undefined,
  password: undefined,
  year: '',
  city: '',
  crimeType: [
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
})

async function onSubmit(event) {
  // Do something with event.data
  console.log('ai predict data',event.data)
}

</script>

<template>
    <section class="flex justify-center">
        <section class="w-4/6">
            <p class="font-bold text-[32px] py-8">AI Prediction Crime Zone</p>
            <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="City/Zone" name="email">
                <UInput v-model="state.email" />
            </UFormGroup>
            
            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormGroup>
            
            <UButton type="submit">
                Submit
            </UButton>
            </UForm>
        </section>
    </section>
</template>

