import React, {useEffect, useState} from 'react';
import axios from 'axios';

type Props = {
	authorName: string,
};

export default function PlaceDisplay(props: Props) {
	const [birthPlace, setBirthPlace] = useState<string>();
	useEffect(() => {
		fetchBirthPlace(props.authorName)
			.then((p: string | null) => {
				if (p) {
					setBirthPlace(p);
				} else {
					setBirthPlace('');
				}
			})
			.catch((e) => console.log(e));
	}, [props.authorName]);
	return (
		<div>
			{birthPlace}
		</div>
	);
}

async function fetchData(url: string) {
	const res = await axios.get(url);
	return res.data.d.results;
}

async function fetchBirthPlace(author: string) {
	if (!author) {
		return null;
	}
	const birthplaceObj = await getData(generateUri(author), 'birthPlace');
	if (!birthplaceObj) {
		return null;
	}
	if (!(birthplaceObj instanceof Object)) {
		return birthplaceObj;
	}
	return birthplaceObj['__deferred']['uri']
		.split('/')
		.pop()
		.replaceAll('_', ' ');
}

async function getData(uri: string, property: string) {
	const birthPlaceData = await fetchData(uri);
	if (!birthPlaceData || birthPlaceData.length === 0) {
		return null;
	}
	const birthplaceObj = birthPlaceData[0][`http://dbpedia.org/property/${property}`];
	return birthplaceObj;
}

function generateUri(str: string) {
	const name = str.replaceAll(' ', '_');
	return `https://dbpedia.org/data/${name}.jsod`;
}
