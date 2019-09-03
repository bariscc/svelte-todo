<script>
  import { todos } from '../store.js'
  import { tick } from 'svelte'

  export let item
  let input

  const deleteTodo = e => {
    todos.update(arr => arr.filter(todo => todo.id !== item.id))
  }
  const checkTodo = e => {
    todos.update(arr =>
      arr.map(todo => {
        if (todo.id === item.id) {
          todo.done = !todo.done
        }
        return todo
      })
    )
  }

  let isEditing = false

  const onEnter = e => {
    if (e.keyCode == 13) {
      update(e)
    }
  }

  const update = e => {
    if (e.target.value.length) {
      todos.update(arr =>
        arr.map(todo => {
          if (todo.id === item.id) {
            todo.text = e.target.value
          }
          return todo
        })
      )
    }
    isEditing = false
  }

  const onDblClick = async e => {
    isEditing = true
    // currently input is undefined, because it resides in an if block below.
    // we wait until a tick (next render) is done, then call it
    await tick()
    input.focus()
  }
</script>

<style>
  li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    display: flex;
  }

  li .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    appearance: none;
  }

  li .toggle {
    opacity: 0;
  }

  li .toggle + label {
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);
    background-repeat: no-repeat;
    background-position: center left;
  }
  li .toggle:checked + label {
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E);
  }
  li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
  li label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }
  li .destroy:after {
    content: '×';
  }
  li .destroy:hover {
    color: #af5b5e;
  }
  li:hover .destroy {
    display: block;
  }

  .edit {
    position: relative;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: block;
    width: 100%;
    padding: 12px 16px;
    margin: 0 0 0 43px;
  }
</style>

<li class={item.done ? 'todo completed' : 'todo'} on:dblclick={onDblClick}>
  {#if isEditing}
    <input
      bind:this={input}
      type="text"
      class="edit"
      value={item.text}
      on:blur={update}
      on:keydown={onEnter} />
  {:else}
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        id={`todo-${item.id}`}
        checked={item.done}
        on:click={checkTodo} />
      <label>{item.text}</label>
      <button class="destroy" on:click={deleteTodo} />
    </div>
  {/if}
</li>
