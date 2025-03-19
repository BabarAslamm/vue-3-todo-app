import { completeTask } from "@/http/task-api";
import { defineStore } from "pinia";


export const useTaskStore = defineStore('taskStore', {

    state: () => ({

        tasks: [
            {
                id : '1',
                name : 'Task 1 From Store',
                is_completed : false
            },
            {
                id : '2',
                name : 'Task 2 From Store',
                is_completed : true
            }
        ],

        task: {
            id : '1',
            name : 'Task 1 From Store',
            is_completed : false
        }

    }),

    getters: {

        completedTasks: (state) => state.tasks.filter(task => task.is_completed),

        uncompletedTasks(){

           return this.tasks.filter(task => !task.is_completed)
        }
        
    }
})
