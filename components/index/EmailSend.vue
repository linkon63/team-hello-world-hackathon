<template>
    <form ref="form" @submit.prevent="sendEmail">
      <input class="hidden" type="text" name="to_name" value="Hackathon">
      <input class="hidden" type="email" name="from_name" value="help@gamil.com">
      <textarea class="hidden" name="message" value="lat:23.8883388 lng:90.3906981"></textarea>
      <input type="submit" value="SOS" class="py-4 px-16 bg-red-500 border text-white hover:cursor-pointer hover:bg-red-800 rounded-md">
    </form>
  </template>
  
  <script>
  import emailjs from '@emailjs/browser';
  import { useGeolocation } from '@vueuse/core'
  const { coords, locatedAt, error, resume, pause } = useGeolocation()
  
  export default {

    data() {
    return {
      list: [
      ],
      location : 'hello cordinate'
    }
  },
    //    const serviceId = 'service_b87fh3k';
    // const templateId = 'template_0qb0zsv';
    //     const userId = 'dMoTGtwUZ_NLU7dKS';
    created() {
        // const success = (position) => {
        //     const latitude  = position.coords.latitude;
        //     const longitude = position.coords.longitude;

        //     // Do something with the position
        // };

        // const error = (err) => {
        //     console.log(error)
        // };

        // // This will open permission popup
        // window.navigator.geolocation.getCurrentPosition(success, error);
        },
    methods: {
      sendEmail() {
        emailjs
          .sendForm('service_55anmgp', 'template_0qb0zsv', this.$refs.form, {
            publicKey: 'dMoTGtwUZ_NLU7dKS',
          })
          .then(
            () => {
              console.log('SOS MESSEGE SEND SUCCESSFULLY. Help will arrive soon!');
              alert('SOS MESSEGE SEND SUCCESSFULLY. Help will arrive soon!')
            },
            (error) => {
              alert('Failed')
              console.log('FAILED...', error.text);
            },
          );
      },
    },
  };
  </script>