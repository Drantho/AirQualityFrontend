<template>
	<div class="controls">
		<Inputs @citySearch="citySearch" :city="city" :state="state"/>
		<div>
			<i class="fas fa-search-plus fa-4x" @click="zoomIn"></i>
			<i class="fas fa-search-minus fa-4x" @click="zoomOut"></i>
		</div>
		<Compass @pan="pan"/>
	</div>
</template>

<script>
import Compass from './Compass.vue';
import Inputs from './Inputs.vue';

export default {
  components: {
		Compass,
		Inputs
	},
	props: {
		city: String,
		state: String
	},
	name: 'Controls',
	methods: {
		pan(direction) {
			this.$emit('pan', direction);
		},
		zoomIn() {
			this.$emit('zoomIn');
		},
		zoomOut() {
			this.$emit('zoomOut')
		},
		citySearch(city, state) {
			this.$emit('citySearch', city, state)
		}
	}
};
</script>

<style scoped>

	.controls {
		grid-area: b;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 30px 25px 0 30px;
	}

	i {
		cursor: pointer;
		margin: 0 15px;
	}

</style>
