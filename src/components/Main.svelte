<script>
  import List from './List.svelte'
  import { todos, activeTodos } from '../store.js'

  const markAll = () => {
    const markAs = !!$activeTodos.length
    todos.update(arr =>
      arr.map(todo => {
        todo.done = markAs
        return todo
      })
    )
  }
</script>

<style>
  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }

  .toggle-all {
    text-align: center;
    border: none;
    opacity: 0;
    position: absolute;
  }

  .toggle-all + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .toggle-all:checked + label:before {
    color: #737373;
  }

  .toggle-all + label:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
</style>

<section class="main">
  <input
    id="toggle-all"
    type="checkbox"
    class="toggle-all"
    on:click={markAll}
    checked={$activeTodos.length} />
  <label for="toggle-all">Mark all as complete</label>
  <List />
</section>
