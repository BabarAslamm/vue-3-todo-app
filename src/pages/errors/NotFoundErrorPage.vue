<template>
    <div class="container py-5">
        <center>
            <h3>Not Found</h3>
            <p>Sorry page <code>{{ $route.params.notFound }}</code>  not found</p>
            <router-link :to="{ name: 'tasks' }">Go back to tasks page</router-link>
        </center>
    </div>
</template>