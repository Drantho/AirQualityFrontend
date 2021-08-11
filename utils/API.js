import axios from 'axios';

// const url = 'http://localhost:8080/api';
const url = 'https://adm-airqualitybackend.herokuapp.com/api';

const getZoomScale = zoom => {
	const zoomObj = {}
	zoomObj.y = (1/zoom) * 12000;
	zoomObj.x = (1/zoom) * 23500;
	return zoomObj;
}

export default {
	gps: (lat, long, zoomLevel) => {
    	return axios.get (`${url}/gps?lat=${lat}&long=${long}`);
	},
	city: (city, state) => {
		return axios.get(`${url}/city?city=${city}&state=${state}`);
	},
	box: (lat, long, zoom) => {
		const northernBound = lat + getZoomScale(zoom).y;
		const southernBound = lat - getZoomScale(zoom).y;
		const easternBound = long + getZoomScale(zoom).x;
		const westernBound = long - getZoomScale(zoom).x;
		return axios.get (`${url}/box?northernBound=${northernBound}&southernBound=${southernBound}&easternBound=${easternBound}&westernBound=${westernBound}&zoom=${zoom}`);
	}
};
