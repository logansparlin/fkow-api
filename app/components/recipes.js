import React, { Component } from 'react';

export default class Recipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };

  }

  componentDidMount() {
    this.serverRequest = $.get('http://localhost:3000/api/recipes', function (result) {
      this.setState({
        recipes: result
      });
    }.bind(this));
  }
  
  render() {
    return (
      <div className="recipes">
        <h1>Recipes</h1>
        {this.state.recipes.map(recipe => {
          return (
            <h4>{recipe.name}</h4>
          )
        })}
      </div>
    )
  }
}
