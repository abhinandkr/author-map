import React, {useEffect, useRef, useState} from 'react';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import {Point} from 'ol/geom';

import './MapDisplay.scss';
import axios from 'axios';

type Props = {
	birthPlace: any,
};

export default function MapDisplay(props: Props) {
	const [map, setMap] = useState<Map | null>(null);
	const [features, setFeatures] = useState<Feature[]>([]);
	// const [featuresLayer, setFeaturesLayer] =
	// 	useState<VectorLayer<any>>(new VectorLayer({
	// 		source: new VectorSource(),
	// 	}));
	const mapElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!map) {
			const map = new Map({
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
				],
				view: new View({
					center: fromLonLat([4.35247, 50.84673]),
					zoom: 4,
				}),
			});
			mapElement.current && map.setTarget(mapElement.current.id);
			setMap(map);
		}
	}, []);

	useEffect(() => {
		if (props.birthPlace) {
			(async function() {
				const {latitude, longitude} = props.birthPlace;
				const feature = new Feature({
					geometry: new Point(fromLonLat([longitude, latitude])),
				});
				feature.setStyle(getMapStyle());
				setFeatures((features) => [...features, feature]);
			})().then(() => {});
		}
	}, [props.birthPlace]);

	useEffect(() => {
		if (map && features.length > 0) {
			const source = new VectorSource({features});
			const vectorLayer = new VectorLayer({source});
			// map?.getView().fit(featuresLayer.getSource().getExtent(), {
			// 	size: map?.getSize(),
			// });
			map.addLayer(vectorLayer);
			// vectorLayer.setZIndex(2);
			setMap(map);
		}
	}, [features]);

	return (
		<div className={'mapContainer'}>
			<div id={'map'} ref={mapElement}>
			</div>
		</div>
	);
}


function getMapStyle() {
	const fill = new Fill({
		color: 'green',
	});
	const stroke = new Stroke({
		color: 'blue',
		width: 1.25,
	});
	return new Style({
		image: new Circle({fill, stroke, radius: 5}),
		fill,
		stroke,
	});
}
