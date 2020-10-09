import React, { Component } from "react";
import styles from "./ShowSearch.less";
import { get } from "../../../servier/api";

class ShowSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      data: null,
      loading: false,
      error: null
    };
  }

  componentWillUnmount() {
    this.setState = () => {
      return null;
    };
  }

  submit = async e => {
    e.preventDefault();
    const { value, loading } = this.state;
    const { onSearched, otherVal } = this.props;

    // 处于loading状态，返回
    if (loading) return;

    // 提交的值和另外一个值相同，则报错
    if (otherVal === value) {
      this.setState({
        error: "不能和另外一个值相同",
        data: null
      });
      return;
    }

    this.setState({
      loading: true,
      error: null
    });

    // 结果， 如果有搜索到结果，将输入框的value赋值给result, 否者赋值null
    let result = null;

    try {
      const url = `users/${value}`;
      const response = await get(url);
      const { data, status } = response;

      if (status === 200) {
        this.setState({
          data
        });

        result = value;
      } else {
        this.setState({
          data: null,
          error: `请求失败，代码：${status}`
        });
        result = null;
      }
    } catch (error) {
      const { response = {} } = error;
      this.setState({
        error: response.data && response.data.message
      });
      result = null;
    }

    this.setState({
      loading: false
    });

    if (onSearched) onSearched(result);
  };

  // 输入框变化
  handleChange = e => {
    this.setState({
      value: e.target && e.target.value
    });
  };

  // 关闭搜索结果
  close = () => {
    this.setState({
      data: null,
      loading: false
    });

    const { onSearched } = this.props;
    if (onSearched) onSearched(null);
  };

  render() {
    const { title, type, placeholder } = this.props;
    const { value, loading, data, error } = this.state;

    return (
      <div>
        <div className={styles.from}>
          <h3>{title}</h3>
          {/* 利用三元表达式去判断data，来显示搜索框和结果部分 */}
          {data ? (
            // 结果部分
            <div className={styles.show}>
              <img src={data.avatar_url} alt="" />
              <span>{data.login}</span>
              <a
                role="button"
                tabIndex="0"
                onClick={this.close}
                onKeyDown={this.handleKeyDown}
              >
                <i className="fa fa-close" />
              </a>
            </div>
          ) : (
            // 搜索表单部分
            <form onSubmit={this.submit} style={{ marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  placeholder={placeholder}
                  style={{ flex: 1 }}
                  value={value || ""}
                  onChange={this.handleChange}
                />
                <button
                  style={{ marginLeft: 4 }}
                  primary="primary"
                  type="submit"
                  disabled={!value}
                >
                  {loading && (
                    <i
                      className="fa fa-spinner fa-spin"
                      aria-hidden="true"
                      style={{ marginRight: 3, fontSize: 14 }}
                    />
                  )}
                  提交{type}
                </button>
              </div>
            </form>
          )}
          {error && (
            <p
              style={{
                marginTop: 10,
                color: "red",
                fontSize: 13,
                textAlign: "left"
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default ShowSearch;
