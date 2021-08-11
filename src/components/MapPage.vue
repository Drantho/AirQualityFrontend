<template>
  <div class="map-page">
    <Header />
    <controls
      @pan="pan"
      @zoomIn="zoomIn"
      @zoomOut="zoomOut"
      @citySearch="citySearch"
      :city="city"
      :state="state"
    />
    <div v-if="!isFetchingAirQuality">
      <Map
        :boxData="this.boxData"
        :xPosition="this.xPosition"
        :yPosition="this.yPosition"
        :zoom="this.zoom"
        :loaded="loaded"
      />
    </div>
  </div>
</template>

<script>
	import API from "../../utils/API";
	import * as d3 from "d3";
	// import * as Map from '../../utils/custom.geo'
	import * as USMap from "../../utils/us";
	// import * as Map from "../../utils/northamerica";
	import Header from './Header.vue';
	import Controls from './Controls.vue';
	import Map from './Map.vue';

	export default {
		name: "MapPage",
		data() {
			return {
				airQuality: null,
				isFetchingAirQuality: true,
				zoom: 35000,
				xPosition: null,
				yPosition: null,
				boxData: null,
				city: null,//'Sequim',
				state: null,//'Washington',
				loaded: false
			};
		},
		mounted() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.success, this.err);
			} else {
				this.err()
			}
		},
		methods: {
			async success(location){
				this.airQuality = await API.gps(location.coords.latitude, location.coords.longitude);
				// this.airQuality = await API.gps(48.0795, -123.1018);//sequim
				// this.airQuality = await API.gps(47.6588, -117.4260);//spokane
				// this.airQuality = await API.gps(43.4927, -112.0408);//idaho falls
				// this.airQuality = await API.gps(40.6377, -112.2961);//utah

				this.xPosition = this.airQuality.data.data.location.coordinates[0];
				this.yPosition = this.airQuality.data.data.location.coordinates[1];

				this.city = this.airQuality.data.data.city;
				this.state = this.airQuality.data.data.state;

				await this.getBoxData();

				this.isFetchingAirQuality = false;
				this.loaded = true;
			},
			async err(){
				this.airQuality = await API.gps();
				// this.airQuality = await API.gps(48.0795, -123.1018);//sequim
				// this.airQuality = await API.gps(47.6588, -117.4260);//spokane
				// this.airQuality = await API.gps(43.4927, -112.0408);//idaho falls
				// this.airQuality = await API.gps(40.6377, -112.2961);//utah

				this.xPosition = this.airQuality.data.data.location.coordinates[0];
				this.yPosition = this.airQuality.data.data.location.coordinates[1];

				this.city = this.airQuality.data.data.city;
				this.state = this.airQuality.data.data.state;

				await this.getBoxData();

				this.isFetchingAirQuality = false;
				this.loaded = true;
			},
			async citySearch(city, state) {
				this.loaded = false;
				this.zoom = 35000;
				this.airQuality = await API.city(city, state)

				this.xPosition = this.airQuality.data.data.location.coordinates[0];
				this.yPosition = this.airQuality.data.data.location.coordinates[1];

				await this.getBoxData();

				this.isFetchingAirQuality = false;

				this.loaded = true;
			},
			async zoomIn() {
				this.loaded = false;
				this.zoom *= 1.5;
				await this.getBoxData();
				this.loaded = true;
			},
			async zoomOut() {
				this.loaded = false;
				this.zoom *= 0.75;
				await this.getBoxData();
				this.loaded = true;
			},
			async pan(direction){
				this.loaded = false;
				switch(direction){
					case 'North' :
						this.yPosition += this.getPanAmount();
						break;
					case 'South' :
						this.yPosition -= this.getPanAmount();
						break;
					case 'East' :
						this.xPosition +=  this.getPanAmount();
						break;
					case 'West' :
						this.xPosition -= this.getPanAmount();
						break;
				}
				await this.getBoxData();
				this.loaded = true;
			},
			getColor(aqi) {
				switch(true){
					case (+aqi < 50) :
						return "#02E301";
					case (+aqi < 100) :
						return "#FFFF01";
					case (+aqi < 150) :
						return "#FF7E00";
					case (+aqi < 200) :
						return "#FE0000";
					case (+aqi < 300) :
						return "#9A0046";
					default :
						return "#7E0123"
				}
			},
			async getBoxData(){
				this.boxData = await API.box(this.yPosition, this.xPosition, this.zoom);
			},
			getPanAmount(){
				return (1/this.zoom) * 14000;
			},
			setLoaded(isLoaded) {
				this.loaded = isLoaded;
			}
		},
		components: {
			Header,
			Controls,
			Map
		}
	};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
body {
  background-image: url("../assets/airbg.png");
  background-size: cover;
  color: white;
  font-family: "Montserrat";
  padding-top: 25px;
}
svg {
  max-width: 800px;
  height: 500px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
}

.map-page {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "a" "c" "b";
  border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  width: 100%;
  max-width: 1200px;
  margin: auto;
  backdrop-filter: blur(40px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.svg-wrapper {
  position: relative;
  max-width: 800px;
  width: 100%;
  height: 500px;
  grid-area: c;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.loaded {
  display: none;
}

.pin {
}

.tooltip {
  position: absolute;
  text-align: center;
  padding: 10px 60px;
  font: 12px;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid white;
  border-radius: 25px;
  pointer-events: none;
  color: black;
}

@media only screen and (min-width: 1215px) {
	svg {
  		border-bottom-right-radius: 25px;
	}
	.overlay {
  		border-bottom-right-radius: 25px;
	}
	.map-page {
		grid-template-areas: "a a" "b c";
		grid-template-columns: auto 800px;
	}
}
</style>
