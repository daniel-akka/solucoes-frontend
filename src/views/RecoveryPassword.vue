<template>
    <div>
        

        <form class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <div class="mb-5">
                <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { parseQuery, useRoute } from 'vue-router';
import ServiceRecoverPassword from '@/services/ServiceRecoverPassword';

const apiRecovery = new ServiceRecoverPassword()
const route = useRoute()

export default defineComponent({
    name: 'RecoveryPassword',
    setup () {
        
        let idRecovery = ''
        return {idRecovery}
    },
    mounted() {

        
        try {
            let id = this.$route.query.id
            
            if (typeof id === 'string'){
                this.idRecovery = id
            }
        } catch (error) {
           
        }
        
        
        if (this.idRecovery == ''){
            console.log('redirect to login')
            this.$router.push({path: '/login'})
        }else {

            /*const resp = apiRecovery.getByID(this.idRecovery)        
            resp.then(result => {

            }).catch(erro => {
                //this.$router.push('Login')
            })*/
        }
        
    },
})
</script>

<style scoped>

</style>