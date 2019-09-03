import { writable, readable, derived } from 'svelte/store'

export const todos = writable(
  JSON.parse(window.localStorage.getItem('todos')) || []
)

export const activeTodos = derived(todos, $todos =>
  $todos.filter(todo => todo.done === false)
)

export const completedTodos = derived(todos, $todos =>
  $todos.filter(todo => todo.done === true)
)

todos.subscribe(value => {
  window.localStorage.setItem('todos', JSON.stringify(value))
})

export const hash = readable(window.location.hash, set => {
  window.addEventListener(
    'hashchange',
    () => {
      set(window.location.hash)
    },
    false
  )
})

export const list = derived(
  [todos, activeTodos, completedTodos, hash],
  ([$todos, $activeTodos, $completedTodos, $hash]) => {
    switch ($hash) {
      case '#active':
        return $activeTodos
      case '#completed':
        return $completedTodos
      default:
        return $todos
    }
  }
)
