import React from "react";
import { router } from "../util/util";
import styles from "./app.less";
import Popular from "./Popular";
import Battle from "./Battle";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: {
        page: "",
        param: ""
      },
      theme: "light"
    };
  }

  componentDidMount() {
    this.hashchange();

    // 添加hash变化的监听事件
    window.addEventListener("hashchange", this.hashchange);
  }

  hashchange = () => {
    const route = router();

    this.setState({
      route
    });
  };

  changeTheme = () => {
    console.log("切换背景");
    const { theme } = this.state;

    this.setState({
      theme: theme === "light" ? "dark" : "light"
    });
  };

  render() {
    const {
      route: { page },
      theme
    } = this.state;
    return (
      <div className={theme === "light" ? styles.light : styles.dark}>
        <div className={styles.header}>
          <div className={styles.headerNav}>
            <span className={page === "" ? styles.active : ""}>
              <a href="#/">Popular</a>
            </span>
            <span className={page === "battle" ? styles.active : ""}>
              <a href="#/battle">Battle</a>
            </span>
          </div>

          <div className={styles.change} style={{ flex: 1 }}>
            <a
              role="button"
              tabIndex="0"
              onClick={this.changeTheme}
              onKeyDown={this.handleKeyDown}
            >
              <i className="fa fa-lightbulb-o" />
            </a>
          </div>
        </div>

        <div className={styles.container}>
          {page === "" && <Popular />}

          {page === "battle" && <Battle />}
        </div>
      </div>
    );
  }
}

export default App;
