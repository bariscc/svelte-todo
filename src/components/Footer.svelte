<script>
  import { todos, activeTodos, completedTodos, hash } from '../store'

  const clearCompleted = () => {
    todos.update(arr => arr.filter(todo => !todo.done))
  }
</script>

<style>
  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  .todo-count {
    float: left;
    text-align: left;
  }
  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }
  .filters li {
    display: inline;
  }
  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }
  .clear-completed,
  .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    margin-top: -1px;
  }
  .clear-completed:hover {
    text-decoration: underline;
  }

  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }
    .filters {
      bottom: 10px;
    }
  }
</style>

{#if $todos.length}
  <footer class="footer">
    <span class="todo-count">
      <strong>{$activeTodos.length}</strong>
      items left
    </span>
    <ul class="filters">
      <li>
        <a href="#all" class={($hash === '' || $hash === '#all') && 'selected'}>
          All
        </a>
      </li>
      <li>
        <a href="#active" class={$hash === '#active' && 'selected'}>Active</a>
      </li>
      <li>
        <a href="#completed" class={$hash === '#completed' && 'selected'}>
          Completed
        </a>
      </li>
    </ul>
    {#if $completedTodos.length}
      <button class="clear-completed" on:click={clearCompleted}>
        Clear completed
      </button>
    {/if}
  </footer>
{/if}
