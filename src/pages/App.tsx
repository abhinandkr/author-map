import React, {useState} from 'react';
import '../css/App.css';
import {NameForm} from './NameForm';
import PlaceDisplay from './PlaceDisplay';

function App() {
	const [authorName, setAuthorName] = useState<string>('');

	return (
		<>
			<NameForm onSubmit={(name: string) => setAuthorName(name)}/>
			<PlaceDisplay authorName={authorName}/>
		</>
	);
}

export default App;
