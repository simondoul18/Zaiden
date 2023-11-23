<template>
    <div>
        <v-row style="background:white;padding: 40px;">
            <v-col>
                <v-img :src="require('~/assets/map.png')">

                </v-img>
            </v-col>
            <v-col>
                <v-text-field label="First Name" solo dense></v-text-field>
                <v-text-field label="Last Name" solo dense></v-text-field>
                <v-text-field label="Email" solo dense></v-text-field>
                <v-text-field label="Phone" solo dense></v-text-field>
                <v-textarea solo name="input-7-4" label="Your Message"></v-textarea>
                <v-btn class="primary">Send</v-btn>
            </v-col>
        </v-row>
    </div>
</template>