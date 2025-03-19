import { defineStore } from "pinia";
import { allTasks, createTask, updateTask, completeTask, deleteTask } from '../http/task-api';
import { computed, ref, reactive } from "vue";


export const useTaskStore = defineStore('taskStore', () => {

    const tasks = ref([]);

    const task = reactive({
        id: null,
        name: null,
        is_completed: null
    })

    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))

    console.log('completedTasks', completedTasks.value.length)

    const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))

    const fetchAllTasks = async () => {

        const { data } = await allTasks();

        tasks.value = data.data;


    }

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


    return{
        task, tasks, completedTasks, uncompletedTasks,
        fetchAllTasks, handleAddedNewTask, handleUpdatedTask,
        handleCompletedTask, handleRemovedTask
    }

})
