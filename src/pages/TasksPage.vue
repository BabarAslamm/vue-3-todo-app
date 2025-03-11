<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div class="relative">
                        <input type="text" class="form-control form-control-lg padding-right-lg"
                            placeholder="+ Add new task. Press enter to save." />
                    </div>

                    <!-- List Of Uncompleted Tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- Show/Hide completed tasks toggle button -->
                     <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-dark" v-on:click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                        </button>
                     </div>

                    <!-- List Of Completed Tasks -->
                    <Tasks :tasks="completedTasks" :show="showCompletedTasks && completedTaskIsVisible" />





                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { allTasks } from '../http/task-api';

    import Tasks from '@/components/tasks/Tasks.vue';

    const tasks = ref([]);

    onMounted( async () => {

        const { data } = await allTasks();

        tasks.value = data.data;

    });

    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))
    const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))

    const showToggleCompletedBtn = computed(
        () => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0
    )

    const completedTaskIsVisible = computed(
        () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
    )

    const showCompletedTasks = ref([false])

</script>


