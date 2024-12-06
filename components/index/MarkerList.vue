<script setup>
import { GoogleMap, HeatmapLayer } from 'vue3-google-map';
const apiKey = 'AIzaSyDM_zbLEpF8w2xOdMQzoGfKM-GavUXuhl4'

const bangladesh = { lat: 23.6850, lng: 90.3563 }
const props = defineProps({
    data: Array,

});

</script>
    
<template>
    <!-- {{  data }}
    {{  typeof(data) }} -->

     <GoogleMap
        :api-key="apiKey"
        :libraries="['visualization']"
        style="width: 100%; height: 600px"
        :center="bangladesh"
        :zoom="13"
    >

        <HeatmapLayer ref="mapRef" :options="{ data: data }" />
    </GoogleMap>
    <!-- <CustomMarker
        :options="{ position: { lat: marker.lat, lng:  marker.lng }, anchorPoint: 'CENTER' }">
        <img src="/img/marker.svg" alt="hello marker" width="50" height="50" />
    </CustomMarker> -->
</template>