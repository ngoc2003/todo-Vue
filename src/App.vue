<template>
  <div class="text-center bg-white py-8 px-14 rounded-xl w-full max-w-[440px] overflow-hidden">
    <div class="flex items-center justify-center">
      <img src="./assets/note.svg" width="80" />
      <div>
        <span class="header__todo-title ml-4">To-Do List</span>
      </div>
    </div>
    <p class="text-2xl my-6">~ Today I need to ~</p>
    <div class="flex">
      <input
        placeholder="Add new todo..."
        class="border-b-[3px] border-b-primary border-dashed flex-1 text-lg mr-4 outline-none"
        @keyup.enter="handleAddTodo"
        v-model="todoInput"
      />
      <button
        @click="handleAddTodo"
        class="border bg-white border-primary px-3 rounded-md rotate-3 text-sm text-primary shadow-[2px_2px_2px] shadow-primary"
      >
        Submit
      </button>
    </div>
    <div class="mt-8 text-text">
      <p v-if="!todoList.length">Congrat, you have no more tasks to do</p>
      <div v-else>
        <TodoBox
          v-for="todo in todoList"
          :key="todo.id"
          :text="todo.text"
          :isDone="todo.isDone"
          :id="todo.id"
        />
      </div>
    </div>
    <div v-if="todoList.length" class="text-left mt-8">
      <span class="text-primary">{{ numberTodoLeft }}</span> item left
    </div>
  </div>
</template>

<style scoped>
.header__todo-title {
  @apply grid place-items-center text-white font-medium bg-primary py-1.5 px-3.5 text-xl rotate-3;
  border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoBox from './components/TodoBox.vue'
import { useStore } from 'vuex'
import { Todo } from './typing/common'

const store = useStore()

const todoInput = ref<string>('')
const todoList = computed<Todo[]>(() => store.state.todoList)
const numberTodoLeft = computed<number>(() => todoList.value.filter((item) => !item.isDone).length)

const handleAddTodo = () => {
  if (!todoInput.value) {
    alert('You should put your text first.')
  } else {
    store.commit('ADD_TODO', todoInput.value)
    todoInput.value = ''
  }
}
</script>
