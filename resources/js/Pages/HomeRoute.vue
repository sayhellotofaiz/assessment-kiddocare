<template>
    <div>
        <h2>HOME</h2>
        <router-link to="/test"> Take me to Test page </router-link>
        <button @click="getValue()">Trigger Endpoint</button>
        <p v-if="response">{{ response.data }}</p>
    </div>
</template>
<script setup>
    import axios from "axios";
    import { ref } from "vue";

    const response = ref();
    console.log('response', response);
    const getValue = async () => {
        try {
            response.value = await axios.get("/api/hello");
            console.log('line 18', response.value);
        } catch (error) {
            // Do something with the error
            console.log(error);
        }
    };
</script>
