<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input
                class="form-check-input mt-0"
                :class="completedClass"
                :checked="task.is_completed"
                type="checkbox"
                @click="markTaskAsCompleted"
            />
            <div
                class="ms-2 flex-grow-1"
                :class="completedClass"
                title="Double click the text to edit or remove"
                @dblclick="$event => isEdit = true"
                >
                <div class="relative" v-if="isEdit" >
                    <input
                        class="editable-task"
                        type="text" v-focus
                        @keyup.esc="undo"
                        @keyup.enter="updateTask"
                        v-model="editingTask"
                    />
                  </div>
                  <span v-else> {{ task.name }}</span>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>

        <!-- Task Actions -->
        <TaskActions @edit="$event => isEdit = true" @remove="removeTask" />

    </li>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import TaskActions from '@/components/tasks/TaskActions.vue'

const emit = defineEmits(['updated', 'completed', 'remove']);

const props = defineProps({
    task: {
        type: Object
    }
})

const completedClass = computed(() => props.task.is_completed ? 'completed': '');

const isEdit = ref(false); // Use a boolean instead of a string

const vFocus = {
    mounted : (el) => el.focus()
}

const editingTask = ref(props.task.name)

const updateTask = event => {

    const updatedTask = { ...props.task, name: event.target.value}

    isEdit.value = false

    emit('updated', updatedTask)

}

const undo = () => {

    isEdit.value = false

    editingTask.value = props.task.name
}

const markTaskAsCompleted = event => {

    const completedTask = { ...props.task, is_completed: !props.task.is_completed }

    emit('completed', completedTask)

}

const removeTask = event => {

    if(confirm('Are You Sure'))
    {

        const removedTask = { ...props.task }

        emit('remove', removedTask)

    }


}

</script>
