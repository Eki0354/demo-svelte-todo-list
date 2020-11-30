<script>
  export let id;
  export let title;
  export let desc;
  export let ok;
  export let close;

  function descInputHandle(e) {
    desc = desc.trim();
  }
</script>

<div class="dialog">
  <div class="mask"></div>
  <div class="dialog-container">
    <div class="body">
      <span><b>Title: </b>{title}</span><br><br>
      <label for="desc"><b>Description: </b></label>
      <input type="text" bind:value={desc} on:input={descInputHandle}><br><br>
    </div>
    <div class="footer">
      <button disabled={!desc} on:click={() => ok(id, desc)}>Ok</button>
      <button on:click={close}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
  }
  .dialog-container {
    position: absolute;
    top: 80px;
    left: 50%;
    z-index: 1;
    padding: 20px;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 2px 8px 16px rgba(0, 0, 0, 0.4)
  }

  .body {
    text-align: left;
  }
</style>