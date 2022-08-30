import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import Action from "./Action";

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.clearItems = this.clearItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const json = localStorage.getItem("items");
    const items = JSON.parse(json);
    if (items) {
      this.setState({
        items: items,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items.length !== this.state.items.length) {
      const json = JSON.stringify(this.state.items);
      localStorage.setItem("items", json);
    }
  }

  componentWillUnmount() {
    console.log("component silindi");
  }

  clearItems() {
    this.setState({
      items: [],
    });
  }

  addItem(item) {
    if (!item) {
      return "Enter the task you want to add";
    } else if (this.state.items.indexOf(item) > -1) {
      return "You cannot add the same task";
    }
    this.setState((prevState) => {
      return { items: prevState.items.concat(item) };
    });
  }

  deleteItem(item) {
    this.setState((prevState) => {
      const arr = prevState.items.filter((i) => {
        return item != i;
      });
      return {
        items: arr,
      };
    });
  }

  render() {
    const app = {
      title: "Todo Application",
      description: "Lorem, ipsum dolor.",
    };
    return (
      <div className="container my-5">
        <div className="card">
          <div className="card-header">
            <Header title={app.title} description={app.description} />
          </div>
          <div className="card-body">
            <TodoList
              items={this.state.items}
              deleteItem={this.deleteItem}
              clearItems={this.clearItems}
            />
          </div>
          <div className="card-footer">
            <Action addItem={this.addItem} />
          </div>
        </div>
      </div>
    );
  }
}
