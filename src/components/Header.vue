<template>
		<div class="title">
			<h1>AIR QUALITY MAP</h1>
		</div>
</template>

<script>
export default({
	name: 'Header'
})
</script>

<style scoped>

	.title {
		grid-area: a;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		background-color: rgba(0,30,255,0.1);
		border-top-right-radius: 25px;
		border-top-left-radius: 25px;
		border-bottom: 2px solid white;
		width: 100%;
	}

	.title h1 {
		font-size: 45px;
	}

</style>