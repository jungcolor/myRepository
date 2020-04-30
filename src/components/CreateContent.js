import React, { Component } from "react";

class CreateContent extends Component {
	render() {
		return (
			<article>
				<h2>Create</h2>
				<form action="/create_process" method="post" onSubmit={function(e) {
					e.preventDefault();
					var title = e.target.title.value,
						desc = e.target.desc.value;

					this.props.onSubmit(title, desc);
				}.bind(this)}>
					<p>
						<input type="text" name="title" placeholder="title" />
					</p>
					<p>
						<textarea name="desc" placeholder="description"></textarea>
					</p>
					<p>
						<input type="submit" />
					</p>
				</form>
			</article>
		);
	}
}

export default CreateContent;