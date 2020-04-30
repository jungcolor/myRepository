import React, { Component } from "react";
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';

class App extends Component {
	// component초기화 할때 사용
	constructor(props) {
		super(props);
		this.max_contents_id = 3;
		this.state = {
			mode: "welcome",
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
	getReadContent() {
		for (var i = 0; i < this.state.contents.length; i++) {
			var data = this.state.contents[i];

			if (data.id === this.state.selected_contents_id) {
				return data;
			}
		}
	}
	getContent() {
		var _title,
			_desc,
			_article = null;

		if (this.state.mode === "welcome") {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc}></ReadContent>;
		} else if (this.state.mode === "read") {
			var _content = this.getReadContent();
			_article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
		} else if (this.state.mode === "create") {
			_article = <CreateContent onSubmit={function(_title, _desc) {
				this.max_contents_id = this.max_contents_id + 1;

				var _contents = Array.from(this.state.contents);
				_contents.push(
					{id: this.max_contents_id, title: _title, desc: _desc}
				)
				this.setState({
					contents: _contents,
					mode: "read",
					selected_contents_id: this.max_contents_id
				});
			}.bind(this)}></CreateContent>
		} else if (this.state.mode === "update") {
			_content = this.getReadContent();
			_article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
				var _contents = Array.from(this.state.contents);

				for (var i = 0; i < _contents.length; i++) {
					if (_contents[i].id === _id) {
						_contents[i] = {id: _id, title: _title, desc: _desc};
						break;
					}
				}
				this.setState({
					contents: _contents
				});
				this.setState({
					mode: "read"
				})
			}.bind(this)}></UpdateContent>
		}

		return _article;
	}
	render() {
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
					if (_mode === "delete") {
						if (window.confirm("진짜?")) {
							var _contents = Array.from(this.state.contents);
							for (var i = 0; i < _contents.length; i++) {
								if (_contents[i].id === this.state.selected_contents_id) {
									_contents.splice(i, 1);
									break;
								}
							}
							this.setState({
								mode: "welcome",
								contents: _contents
							});
							alert("삭제완료!!");
						}
					} else {
						this.setState({
							mode: _mode
						});
					}
				}.bind(this)}></Control>
				{this.getContent()}
			</div>
		);
	}
}

export default App;