<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
</script>

<ModeWatcher></ModeWatcher>
<div class="flex h-screen max-h-screen flex-col dark:bg-gray-950">
	<slot></slot>
</div>
