import React, { Component } from "react";
import styles from "./index.less";
import ShowSearch from "./components/ShowSearch";
import { pushRoute } from "../../util/util";

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: null,
      player2: null
    };
  }

  /**
   * 搜索框返回
   * @param {*} num
   * @param {*} res
   */
  handleSearched = (num, res) => {
    this.setState({
      [`player${num}`]: res
    });
  };

  toResult = () => {
    const { player1, player2 } = this.state;
    pushRoute({
      page: "result",
      query: {
        player1,
        player2
      }
    });
  };

  render() {
    const { player1, player2 } = this.state;

    return (
      <div className={styles.main}>
        {/* 组件 1 图片展示 */}
        {/* 组价不一定要抽出来，单独放在components */}
        <div className={styles.showImg}>图片展示</div>

        {/* 第二部分，展示两个输入框 */}
        <div className={styles.showWrapper}>
          <ShowSearch
            title="Player One"
            placeholder="Player One"
            onSearched={res => this.handleSearched(1, res)}
            otherVal={player2}
          />
          <ShowSearch
            title="Player Two"
            placeholder="Player Two"
            onSearched={res => this.handleSearched(2, res)}
            otherVal={player1}
          />
        </div>
        {/* 按钮 */}
        <p style={{ textAlign: "center", marginTop: 30 }}>
          <button
            type="button"
            primary="primary"
            disabled={!player1 || !player2}
            onClick={this.toResult}
          >
            对比
          </button>
        </p>
      </div>
    );
  }
}

export default Battle;
