<script setup lang="ts">
const time = new Date().getTime()
const links = [
  [{
    label: 'Hello World',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    // badge: time
  }, {
    label: 'Home Page',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'AI Prediction',
    icon: 'i-heroicons-chart-bar',
    to: '/ai/prediction'
  }, 
  {
    label: 'Complain',
    icon: 'i-heroicons-command-line',
    to: '/area/complain'
  }
], 
  [{
    label: 'Profile Info',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'SOS',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
</script>

<template>
    <div class="border w-1/6 h-screen">
        <UVerticalNavigation :links="links" />
    </div>
</template>