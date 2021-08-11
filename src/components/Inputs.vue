<template>
	<span class="main">
		<div class="inputs">
			<div>
				<label for="state">State</label><br />
				<select name="state" id="state" v-model="state">
					<option value="">-- Select a State --</option>
					<option value="Alabama">Alabama</option>
					<option value="Alaska">Alaska</option>
					<option value="Arizona">Arizona</option>
					<option value="Arkansas">Arkansas</option>
					<option value="California">California</option>
					<option value="Colorado">Colorado</option>
					<option value="Connecticut">Connecticut</option>
					<option value="Delaware">Delaware</option>
					<option value="Florida">Florida</option>
					<option value="Georgia">Georgia</option>
					<option value="Hawaii">Hawaii</option>
					<option value="Idaho">Idaho</option>
					<option value="Illinois">Illinois</option>
					<option value="Indiana">Indiana</option>
					<option value="Iowa">Iowa</option>
					<option value="Kansas">Kansas</option>
					<option value="Kentucky">Kentucky</option>
					<option value="Louisiana">Louisiana</option>
					<option value="Maine">Maine</option>
					<option value="Maryland">Maryland</option>
					<option value="Massachusetts">Massachusetts</option>
					<option value="Michigan">Michigan</option>
					<option value="Minnesota">Minnesota</option>
					<option value="Mississippi">Mississippi</option>
					<option value="Missouri">Missouri</option>
					<option value="Montana">Montana</option>
					<option value="Nebraska">Nebraska</option>
					<option value="Nevada">Nevada</option>
					<option value="New Hampshire">New Hampshire</option>
					<option value="New Jersey">New Jersey</option>
					<option value="New Mexico">New Mexico</option>
					<option value="New York">New York</option>
					<option value="North Carolina">North Carolina</option>
					<option value="North Dakota">North Dakota</option>
					<option value="Ohio">Ohio</option>
					<option value="Oklahoma">Oklahoma</option>
					<option value="Oregon">Oregon</option>
					<option value="Pennsylvania">Pennsylvania</option>
					<option value="Rhode Island">Rhode Island</option>
					<option value="South Carolina">South Carolina</option>
					<option value="South Dakota">South Dakota</option>
					<option value="Tennessee">Tennessee</option>
					<option value="Texas">Texas</option>
					<option value="Utah">Utah</option>
					<option value="Vermont">Vermont</option>
					<option value="Virginia">Virginia</option>
					<option value="Washington">Washington</option>
					<option value="West Virginia">West Virginia</option>
					<option value="Wisconsin">Wisconsin</option>
					<option value="Wyoming">Wyoming</option>
				</select>
			</div>
			<div>
				<label for="city">City</label><br />
				<input type="text" name="city" v-model="city" />
			</div>
		</div>
		<button @click="citySearch">Search</button>
	</span>
</template>

<script>
export default {
	name: "Inputs",
	props: {
		city: String,
		state: String
	},
	methods: {
		citySearch() {
			this.$emit("citySearch", this.city, this.state);
		},
	}
};
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
}
.inputs {
	 display: flex;
	 justify-content: space-between;
	 width: 100%;
}

.inputs div {
  /* margin: 0 8px; */
  width: 170px;
}

[type="text"] {
  border-radius: 15px;
  padding: 10px;
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.3);
  width: 145px;
}

input:focus-visible {
  outline: none;
}

select {
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 15px;
  width: 145px;
}

label {
  color: black;
}

button {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 15px 25px;
  border-radius: 15px;
  border: 2px solid white;
  color: black;
  margin: 25px 0;
  cursor: pointer;
}

button:hover {
	background-color: rgba(255, 255, 255, 0.7);
}
</style>