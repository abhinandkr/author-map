import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MapDisplay from './MapDisplay';

type Props = {
	authorName: string,
};

export default function PlaceDisplay(props: Props) {
	const [birthPlace, setBirthPlace] = useState<string>('');
	useEffect(() => {
		async function get() {
			const res = await axios.get(`http://localhost:3000/api/authorPlace/author/${props.authorName}`);
			console.log(res.data);
			setBirthPlace(res.data);
		}

		if (props.authorName) {
			get().then(() => {});
		}
	}, [props.authorName]);
	return (
		<div>
			<MapDisplay birthPlace={birthPlace}/>
		</div>
	);
}
