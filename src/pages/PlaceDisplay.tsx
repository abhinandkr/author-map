import React, {useEffect, useState} from 'react';
import axios from 'axios';

type Props = {
	authorName: string,
};

export default function PlaceDisplay(props: Props) {
	const [birthPlace, setBirthPlace] = useState<string>();
	useEffect(() => {
		if (props.authorName) {
			httpGet(`http://localhost:3000/api/authorPlace/author/${props.authorName}`)
				.then((res) => res.data)
				.then((val: string) => {
					console.log(val);
					setBirthPlace(val);
				});
		}
	}, [props.authorName]);
	return (
		<div>
			{birthPlace}
		</div>
	);
}

// function getOptions(verb: string) {
// 	const options = {
// 		dataType: 'json',
// 		method: verb,
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json',
// 		},
// 	};
// 	return options;
// }

function httpGet(path: string) {
	// return fetch(path, getOptions('GET'));
	return axios.get(path);
}
