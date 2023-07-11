import type { Todo } from '@/typing/common'
import { createStore } from 'vuex'
import { uuid } from 'vue-uuid'

interface StoreType {
  todoList: Todo[]
}

const getItem = () => {
  return JSON.parse(localStorage.getItem('todoVue') || '[]')
}

const setItem = (data: Todo[]) => {
  localStorage.setItem('todoVue', JSON.stringify(data))
}

export const store = createStore({
  state() {
    return {
      todoList: getItem()
    }
  },
  mutations: {
    ADD_TODO(state: StoreType, payload: string) {
      state.todoList.unshift({
        text: payload,
        isDone: false,
        createdAt: new Date().getDate(),
        id: uuid.v1()
      })
      setItem(state.todoList)
    },

    DELETE_TODO(state: StoreType, payload: string) {
      state.todoList = state.todoList.filter((todo) => todo.id !== payload)
      setItem(state.todoList)
    },

    TOGGLE_STATUS_TODO(state: StoreType, payload: string) {
      state.todoList = state.todoList.map((item) => {
        if (item.id !== payload) {
          return item
        }
        return { ...item, isDone: !item.isDone }
      })
      setItem(state.todoList)
    }
  }
})
