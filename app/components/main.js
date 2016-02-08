import React from 'react';
// import './main.styl'

export default class Main extends React.Component {

  render() {
    return (
      <div className="app-container">
        {this.props.children}
      </div>
    )
  }
}
