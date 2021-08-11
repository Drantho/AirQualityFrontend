<template>
	<div class="compass">
			<div></div>
			<div><i class="fas fa-chevron-up fa-4x" @click="pan('North')"></i></div>
			<div></div>
			<div><i class="fas fa-chevron-left fa-4x" @click="pan('West')"></i></div>
			<div class="center"></div>
			<div><i class="fas fa-chevron-right fa-4x" @click="pan('East')"></i></div>
			<div></div>
			<div><i class="fas fa-chevron-down fa-4x" @click="pan('South')"></i></div>
			<div></div>
		</div>
</template>

<script>
export default {
	name: 'Compass',
	methods: {
		pan(direction) {
			this.$emit('pan', direction)
		}
	}
}
</script>

<style scoped>

	.compass {
		width: 210px;
		height: 210px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.compass div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 12px solid white;
		box-sizing: border-box;
	}

	i {
		cursor: pointer;
	}
</style>