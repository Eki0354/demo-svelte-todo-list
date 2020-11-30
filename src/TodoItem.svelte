<script>
  export let id;
  export let title;
  export let desc;
  export let created;
  export let done;
  export let switchStatus;
  export let edit = null;
  export let del;

  $: fixedCreated = (() => {
    const date = new Date(created);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  })();
</script>

<div class="todo-item">
  <div class="container">
    <div class="info">
      <span class="title">{title}</span>
      <div class="desc">{desc}</div>
    </div>
  </div>
  <div class="operation">
    <div class="created">{fixedCreated}</div>
    <div class="btns">
      {#if !done}
        <button on:click={() => edit(id)}>🖊</button>
      {/if}
      <button class="btn-del" on:click={() => del(id)}>♻</button>
      <button on:click={() => switchStatus(id)}>{done ? '×' : '√'}</button>
    </div>
  </div>
</div>

<style>
  .todo-item {
    position: relative;
    width: 400px;
    height: 80px;
    padding: 8px;
    border: 2px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }

  .todo-item:nth-child(n + 2) {
    margin-top: 10px;
  }
  .container {
    max-width: calc(100% - 100px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .info {
    text-align: left;
    height: 100%;
    max-width: 100%;
    display: inline-flex;
    flex-direction: column;
  }

  .operation {
    flex: 1;
    text-align: right;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
  }

  button {
    margin-bottom: 0;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
  }

  .desc {
    font-size: 14px;
    word-wrap: break-word;
    text-overflow: ellipsis;
  }

  .btn-del {
    color: red;
  }
</style>