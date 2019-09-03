<script>
  import Item from './Item.svelte'
  import { list, hash } from '../store'
</script>

<style>
  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<ul class="todo-list">
  {#each $list as item}
    <Item {item} />
  {/each}
</ul>
