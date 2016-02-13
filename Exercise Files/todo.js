/**
 * @jsx React.DOM
 */

 var Todo = React.createClass({
 		getInitialState: function(){
 			return {
 				todos: this.props.todos
 			};
 		},
 		handleAdd: function(item){
 			var todos= this.state.todos;
 			todos.unshift({label: item});
 			this.setState({
 				todos: todos
 			});
 		},
 		handleRemove: function(item, index){
 			var todos = this.state.todos;
 			todos.splice(index, 1);
 			this.setState({
 				todos: todos
 			});
 		},
 		render: function() {
 			return (
 				<div>
 					<h1>Todos ({this.state.todos.length})</h1>
 					<TodoInput addTodo={this.handleAdd} />
 					<TodoList todos={this.state.todos} removeTodo={this.handleRemove} />
 					</div>
 			);
 		}, 	
 });

var TodoInput = React.createClass({
	getInitialState: function(){
		return {
			value: ''
		};
	},
	handleSubmit: function(event){
		event.preventDefault();
		this.props.addTodo(this.state.value);
		this.setState({
			value: ''
		})
	},
	handleChange: function(event){
		this.setState({
			value: event.target.value
		});

	},
	render: function(){
		return(
				<form onSubmit={this.handleSubmit}>
				<input type="text" required="required" onChange={this.handleChange} value={this.state.value} />
				<button type="submit">Add</button>
				</form>
			);
	}
});

var TodoList = React.createClass({
	removeTodo: function(item, index){
		this.props.removeTodo(item,index);
	},
	render: function() {
		var _this = this;
		var todoList = function(item, index)
		{
			return (
				<li key={index}>
				{item}
				<span onClick={_this.removeTodo.bind(_this, item, index)}> [Remove]</span>
				</li>
				);
		};

		return (
			<ul> {this.props.todos.map(todoList)} </ul>
			);
	}
})
 var App = React.createClass({
 	getDefaultProps: function(){
 		return {
 			todos: [{
 				label: 'Task 1'
 			}, {
 				label: 'Task 2'
 			}]
 		};
 	},

 	render: function() {
 		return (
 			<Todo todos={this.props.todos} />
 		);
 	}
 });

 React.renderComponent(<App />, document.getElementById('app'));