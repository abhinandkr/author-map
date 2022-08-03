import React from 'react';

type NameFormProps = {
	onSubmit: (value: string) => void,
}
type NameFormState = {
	value: string,
}
export class NameForm extends React.Component<NameFormProps, NameFormState> {
	constructor(props: NameFormProps) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		this.props.onSubmit(this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input
						type={'text'}
						value={this.state.value}
						onChange={this.handleChange}/>
				</label>
				<input type="submit" value="Submit"/>
			</form>
		);
	}
}
