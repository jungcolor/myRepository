import React, { Component } from "react";
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';

class App extends Component {
	// component초기화 할때 사용
	constructor(props) {
		super(props);
		this.state = {
			mode: "read",
			selected_contents_id: 2,
			subject: {title: "WEB", sub: "World Wid Web!!"},
			welcome: {title: "Welcom", desc: "Hello, React!!"},
			contents: [
				{id: 1, title: "HTML", desc: "HTML is for information"},
				{id: 2, title: "CSS", desc: "CSS is for design"},
				{id: 3, title: "JavaScript", desc: "JavaScript is for interactive"},
			]
		};
	}

	render() {
		var _title,
			_desc,
			_article = null;

		if (this.state.mode === "welcome") {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc}></ReadContent>;
		} else if (this.state.mode === "read") {
			for (var i = 0; i < this.state.contents.length; i++) {
				var data = this.state.contents[i];

				if (data.id === this.state.selected_contents_id) {
					_title = data.title;
					_desc = data.desc;
					break;
				}
			}
			_article = <ReadContent title={_title} desc={_desc}></ReadContent>;
		} else if (this.state.mode === "create") {
			_article = <CreateContent onSubmit={function(_title, _desc) {
				debugger;
				this.setState({
					// add to contents lists
				})
			}.bind(this)}></CreateContent>
		}

		return (
			<div className="App">
				<Subject title={this.state.subject.title} sub={this.state.subject.sub} 
				onChangePage={function(){
					this.setState({
						mode: "welcome"
					});
				}.bind(this)}></Subject>
				<TOC onChangePage={function(id) {
					this.setState({
						mode: "read",
						selected_contents_id: +id
					});
				}.bind(this)} data={this.state.contents}></TOC>
				<Control onChangeMode={function(_mode) {
					this.setState({
						mode: _mode
					})
				}.bind(this)}></Control>
				{_article}
			</div>
		);
	}
}

export default App;