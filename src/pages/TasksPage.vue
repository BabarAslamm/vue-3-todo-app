<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">

                    <!-- Add new Task -->
                    <NewTask  @added="handleAddedNewTask"/>

                    <!-- List Of Uncompleted Tasks -->
                    <Tasks
                        :tasks="uncompletedTasks"
                        @updated="handleUpdatedTask"
                        @completed="handleCompletedTask"
                        @remove="handleRemovedTask"
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
                        @updated="handleUpdatedTask"
                        @completed="handleCompletedTask"
                        @remove="handleRemovedTask"
                    />





                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { allTasks, createTask, updateTask, completeTask, deleteTask } from '../http/task-api';
    import Tasks from '@/components/tasks/Tasks.vue';
    import NewTask from '@/components/tasks/NewTask.vue';
    import { useTaskStore } from '@/stores/task';
    import { storeToRefs } from 'pinia';

    const store = useTaskStore();

   const  { task } = storeToRefs(store);

    // store.task.name = "Task 1 updated"

    // store.$patch({
    //     task : {
    //       id : '111',
    //       name : 'Task 1111'
    //     }
    // })

    // task.value.name = "Store to ref"

    const tasks = ref([]);

    onMounted( async () => {

        const { data } = await allTasks();

        tasks.value = data.data;

        console.log('store', task.value)

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

    const handleAddedNewTask = async (newTask) => {

      const { data: createdTask } = await createTask(newTask);

      tasks.value.unshift(createdTask.data);

    }

    const handleUpdatedTask = async (task) => {

      const {data : updatedTask } = await updateTask(task.id, {

        name : task.name

      })

      const currentTask = tasks.value.find(item => item.id === task.id)
      currentTask.name = updatedTask.data.name

    }

    const handleCompletedTask = async (task) => {

        const { data : completedTask } = await completeTask(task.id, {
            is_completed : task.is_completed
        })

        const currentTask = tasks.value.find(item => item.id === task.id)
        currentTask.is_completed = completedTask.data.is_completed

    }

    const handleRemovedTask = async (task) => {

        await deleteTask(task.id);

        const index = tasks.value.findIndex(item => item.id === task.id)

        tasks.value.splice(index, 1)

    }

</script>


