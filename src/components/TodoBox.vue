<script setup lang="ts">
import { watch, defineProps, ref } from 'vue'
import { useStore } from 'vuex'
import { Todo } from '../typing/common'

interface TodoBoxProps extends Omit<Todo, 'createdAt'> {}

const store = useStore()
const props = defineProps<TodoBoxProps>()

const isDelete = ref<boolean>(false)
const isChecked = ref<boolean>(props.isDone)

const handleDeleteTodo = () => {
  isDelete.value = true
  setTimeout(() => {
    store.commit('DELETE_TODO', props.id)
  }, 400)
}

watch(isChecked, () => {
  store.commit('TOGGLE_STATUS_TODO', props.id)
})
</script>

<template>
  <div
    :class="{ 'line-through opacity-40': isChecked, 'delete-todo': isDelete }"
    class="flex items-center justify-between duration-300"
  >
    <div>
      <input
        :class="{
          'accent-primary': isChecked
        }"
        class="cursor-pointer"
        v-model="isChecked"
        type="checkbox"
      />
      <span class="ml-2">{{ props.text }}</span>
    </div>
    <img class="h-2.5 cursor-pointer" src="../assets/close.svg" alt="" @click="handleDeleteTodo" />
  </div>
</template>

<style scoped>
.delete-todo {
  transform: translateX(50%);
  opacity: 0;
}
</style>
