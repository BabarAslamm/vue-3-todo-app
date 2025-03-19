import { defineStore } from "pinia";
import { allTasks } from '../http/task-api';
import { computed, ref, reactive } from "vue";


export const useTaskStore = defineStore('taskStore', () => {

    const tasks = ref([]);

    const task = reactive({
        id: null,
        name: null,
        is_completed: null
    })

    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))

    const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))

    const fetchAllTasks = async () => {

        const { data } = await allTasks();

        tasks.value = data.data;

    }

   return {

        task, tasks, completedTasks, uncompletedTasks, fetchAllTasks

   }

})
