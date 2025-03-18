import { defineStore } from "pinia";


export const useTaskStore = defineStore('taskStore', {

    state: () => ({

        tasks: [],

        task: {
            id : '1',
            name : 'Task 1 From Store',
            is_completed : false
        }
        
    })
})
