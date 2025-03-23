<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">

                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List Of Uncompleted Tasks -->
                    <Tasks
                        :tasks="uncompletedTasks"

                    />

                    <!-- Show/Hide completed tasks toggle button -->
                     <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-dark" v-on:click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                        </button>
                     </div>

                    <!-- List Of Completed Tasks -->
                    <Tasks
                        :tasks="completedTasks"
                        :show="showCompletedTasks && completedTaskIsVisible"

                    />





                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import Tasks from '@/components/tasks/Tasks.vue';
    import NewTask from '@/components/tasks/NewTask.vue';
    import { useTaskStore } from '@/stores/task';
    import { storeToRefs } from 'pinia';

    const store = useTaskStore();

    const  { completedTasks, uncompletedTasks } = storeToRefs(store);

    const { fetchAllTasks } = store;

    onMounted( async () => {

        await fetchAllTasks();

    });

    const showToggleCompletedBtn = computed(
        () => completedTasks.length > 0 && uncompletedTasks.value.length > 0
    )

    const completedTaskIsVisible = computed(
        () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
    )

    const showCompletedTasks = ref([false])


</script>


