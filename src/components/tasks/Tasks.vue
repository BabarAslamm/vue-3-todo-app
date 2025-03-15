<template>
    <div class="card mt-2" v-if="tasks.length && show">
        <ul class="list-group list-group-flush">
            <Task
                v-for="task in tasks"
                :task="task" :key="task.id"
                @updated="$event => $emit('updated', $event)"
            />
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Task from '@/components/tasks/Task.vue'

defineProps({
    tasks: Array,
    show : {
        type : Boolean,
        default : true
    }
})
</script>
