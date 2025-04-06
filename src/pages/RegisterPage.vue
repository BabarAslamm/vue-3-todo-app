<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>ToeDoe</span>
                <strong>List</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Register</h2>

            <!-- Display general error message -->
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>

            <div class="form-floating mb-2">
                <input type="text" v-model="form.name" class="form-control" :class="{ 'is-invalid': errors.name }" id="name" placeholder="Your Name" />
                <label for="email">Name</label>
                 <!-- Display email errors -->
                 <div v-if="errors.name" class="invalid-feedback">
                    {{ errors.name[0] }}
                </div>
            </div>

            <div class="form-floating mb-2">
                <input type="email" v-model="form.email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email" placeholder="name@example.com" />
                <label for="email">Email</label>
                 <!-- Display email errors -->
                 <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email[0] }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" v-model="form.password" class="form-control" :class="{ 'is-invalid': errors.password }" id="password" placeholder="Password" />
                <label for="password">Password</label>
                <!-- Display password errors -->
                <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password[0] }}
                </div>
            </div>

            <div class="form-floating mb-3">
                <input type="password" v-model="form.password_confirmation" class="form-control" :class="{ 'is-invalid': errors.password_confirmation }" id="confirm_password" placeholder="Confirm Password" />
                <label for="password">Confirm Password</label>
                <!-- Display password errors -->
                <div v-if="errors.password_confirmation" class="invalid-feedback">
                    {{ errors.password_confirmation[0] }}
                </div>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit" :disabled="isLoading">
                <span v-if="!isLoading">Sign up</span>
                <span v-else>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Signing in...
                </span>
            </button>
        </form>
    </main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useAuthStore();

const errorMessage = ref('');
const errors = ref({});
const isLoading = ref(false);


const form = reactive({
    email : '',
    password : '',
    password_confirmation : ""
})

const handleSubmit = async() => {

    errorMessage.value = '';
    errors.value = '';
    isLoading.value = true;

    try {

        await store.handleRegiter(form);

        router.push({ name: 'tasks' });

    } catch (error) {

        if(error.response){
            // Handle validation errors
            if(error.response.status === 422){
                errorMessage.value = error.response.data.message;
                errors.value = error.response.data.errors;
            }else {
                errorMessage.value = error.response.data.message || 'Registetr failed';
            }
        }else {
            errorMessage.value = 'Network error or server is unreachable';
        }

    } finally {
        isLoading.value = false;
    }
}

</script>

<style>
    .auth-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 60vh;
        margin-top: 2rem;
    }

    .auth-form {
        width: 400px;
    }

    /* Add this if you're using Bootstrap */
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }

    .is-invalid {
        border-color: #dc3545;
    }
</style>
