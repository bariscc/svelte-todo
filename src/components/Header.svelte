<script>
  import { todos } from '../store'

  const addTodo = e => {
    if (e.keyCode === 13 && e.target.value.length) {
      todos.update(arr => [
        {
          id: new Date().getTime(),
          text: e.target.value,
          done: false,
        },
        ...arr,
      ])
      e.target.value = ''
    }
  }
</script>

<style>
  h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
  .new-todo {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>

<header class="header">
  <h1>todos</h1>
  <input
    autocomplete="off"
    placeholder="What needs to be done?"
    class="new-todo"
    on:keydown={addTodo} />
</header>
