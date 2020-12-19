import Vue from 'vue/dist/vue';

import Hello from '../Components/Hello.vue';

        var app = new Vue({
            el:"#app",
            data:{
                message:"Hello Vue"
            },
            components:{
                Hello
            }
        })
