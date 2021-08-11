<template>
	<div class="svg-wrapper">
		<svg id="map" />
		<div v-bind:class="{ overlay: true, loaded: loaded }">
			<h2>Loading...</h2>
		</div>
	</div>
</template>

<script>
import * as d3 from 'd3';
import * as USMap from "../../utils/us";
export default {
	name : 'Map',
	props : {
		zoom: Number,
		xPosition: Number,
		yPosition: Number,
		boxData: Object,
		city: String,
		state: String,
		loaded: Boolean
	},
	methods : {
		async drawMap() {

			const g = d3;

			let projection = g
				.geoEquirectangular()
				.center([this.$props.xPosition, this.$props.yPosition])
				.scale(this.$props.zoom);

			let geoGenerator = g.geoPath().projection(projection);

			g.select("#map")
				.selectAll("path")
				.data(USMap.default.features)
				.join("path")
				.attr("d", geoGenerator)
				.style("stroke", "white")
				.style("fill", "rgba(255,255,255,0.2)");

			g.select("#map").selectAll("circle").remove();

			const self = this;

			var div = g.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

			g.select("#map")
				.selectAll(".pin")
				.data(this.$props.boxData.data)
				.enter()
				.append("circle", ".pin")
				.attr("r", 5)
				.attr("transform", function (d) {
					return (`translate(${projection([d.coordinates.longitude,d.coordinates.latitude])})`);
				})
				.style("stroke", "white")
				.style("fill", function(d){return self.getColor(d.aqi)})
				.attr('opacity', '0.5')
				.on("mouseover", function(event, d) {
					d3.select(this).style("opacity", "1");

					div.transition()
						.duration(500)
						.style("opacity", .9)

					div.html(`<h4>${d.name}</h4><h4>AQI: ${d.aqi}</h4>`)
						.style("left", (event.pageX) + "px")
						.style("top", (event.pageY) + "px");
				})
				.on("mouseout", function(d) {
					d3.select(this).style("opacity", "0.5");

					div.transition()
						.duration(200)
						.style("opacity", 0);
				});

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
	},
	mounted() {
		this.drawMap();
	},
	updated() {
		this.drawMap();
	}
}
</script>

<style scoped>

</style>