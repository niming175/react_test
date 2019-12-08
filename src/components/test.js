import React from 'react';
import styles from './test.less'

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
        <h2 className={styles.test}>{a}</h2>
        <i className="fa fa-camera-retro" />
        <div className={styles.box}>test</div>
        <button type="button" onClick={this.handleClick}>
          点击
        </button>
      </div>
    );
  }
}

export default Test;
