<script>
  export let id;
  export let title;
  export let desc;
  export let created;
  export let done;
  export let switchStatus;
  export let edit;
</script>

<div class="todo-item">
  <div class="title">{title}</div>
  <div class="desc">{desc}</div>
  <div class="created">{created}</div>
  <div class="btns">
    {#if !done}
      <button on:click={() => edit(id)}>🖊</button>
    {/if}
    <button on:click={() => switchStatus(id)}>{done ? '×' : '√'}</button>
  </div>
</div>

<style>
  .todo-item {
    position: relative;
  }

  .title {
    
  }
</style>