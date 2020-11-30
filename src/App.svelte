<script>
	import TodoItem from './TodoItem.svelte';
	import EditItem from './EditItem.svelte';
	import { TODO_KEY } from './utils/constant';
	export let todoList = getTodoList();
	export let todoTitle = '';
	export let switchStatus = false;
	export let editItem = null;
	export let editVisible = false;

	$: filteredTodoList = todoList.filter(i => !todoTitle || (~i.title.indexOf(todoTitle) || ~i.desc.indexOf(todoTitle)));
	$: todos = filteredTodoList.filter(i => !i.done);
	$: dones = filteredTodoList.filter(i => i.done);

	// 从本地储存读取数据记录
	function getTodoList() {
		try {
			return localStorage.$get(TODO_KEY);
		} catch(e) {
			return [];
		}
	}

	// 保存到本地储存
	function saveTodoList() {
		localStorage.$set(TODO_KEY, todoList);
	}

	// 输入框键盘按下
	function todoKeyPressHandle(e) {
		// 仅在显示未完成列表时按下回车键可以新增未完成条目
		if (!switchStatus && todoTitle && e.key.toLowerCase() === 'enter') {
			todoList = todoList.concat({
				id: Math.random(),
				title: todoTitle,
				desc: '',
				done: false,
				created: Date.now(),
			});
			saveTodoList();
			todoTitle = '';
		}
	}

	// 输入框Input事件，用户清除前后空格
	function todoInputHandle(e) {
		todoTitle = todoTitle.trim();
	}

	// 完成未完成事件
	function finish(id) {
		todoList.some(i => i.id === id && (i.done = true));
		todoList = todoList.slice();
		saveTodoList();
	}

	// 重做已完成事件
	function unfinish(id) {
		todoList.some(i => i.id === id && !(i.done = false));
		todoList = todoList.slice();
		saveTodoList();
	}

	// 显示列表切换事件
	function switchChangeHandle(status) {
		switchStatus = status;
	}

	// 打开编辑模态框
	function openEditDialog(id) {
		editItem = todoList.find(i => i.id === id);
		editVisible = true;
	}

	// 修改内容
	function commitEdit(id, desc) {
		todoList.some(i => i.id === id && (i.desc = desc));
		todoList = todoList.slice();
		saveTodoList();
		closeEdit();
	}

	// 关闭编辑模态框
	function closeEdit() {
		editVisible = false;
		editItem = null;
	}
</script>

<main>
	<h1>Todo List</h1>
	<input type="text" bind:value={todoTitle} on:keydown={todoKeyPressHandle} on:input={todoInputHandle} >
	<!-- 未做/已做 切换 -->
	<div class="switch">
		<input type="radio" name="status" checked={!switchStatus} value={false} on:change={() => switchChangeHandle(false)} >undo
		<input type="radio" name="status" checked={switchStatus} value={true} on:change={() => switchChangeHandle(true)} >done
	</div>
	{#if !switchStatus}
		<!-- 未完成列表 -->
		<div class="todos">
			{#each todos as { id, title, desc, done, created }}
				<TodoItem {id} {title} {desc} {done} {created} edit={openEditDialog} switchStatus={finish} />
			{/each}
		</div>
	{:else}
		<!-- 已完成列表 -->
		<div class="dones">
			{#each dones as { id, title, desc, done, created }}
				<TodoItem {id} {title} {desc} {done} {created} switchStatus={unfinish} />
			{/each}
		</div>
	{/if}
	<!-- 编辑模态框 -->
	{#if editVisible}
		<EditItem id={editItem.id} title={editItem.title} desc={editItem.desc} ok={commitEdit} close={closeEdit}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #113e66;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>