import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'test'
    };
  }

  handleClick = () => {
    console.log('test');
    this.setState({
      a: 'hello world',
    });
  }

  render() {
    const { a } = this.state;

    return (
      <div>
        <h2>{a}</h2>
        <button type="button" onClick={this.handleClick}>
          点击
        </button>
      </div>
    );
  }
}

export default Test;
