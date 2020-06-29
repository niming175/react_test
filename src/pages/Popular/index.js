import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./index.less";
import { get } from "../../servier/api";
import Card from "./components/Card";
import { formatNumber } from "../../util/util";

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabList: [
        {
          key: "all",
          value: "All"
        },
        {
          key: "javaScript",
          value: "JavaScript"
        },
        {
          key: "Ruby",
          value: "Ruby"
        },
        {
          key: "java",
          value: "Java"
        },
        {
          key: "css",
          value: "Css"
        },
        {
          key: "python",
          value: "Python"
        }
      ],
      tabIndex: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      data: {
        list: [],
        total: 0
      },
      error: {}
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async (params = {}, type = "fetch") => {
    const {
      page,
      pageSize,
      tabIndex,
      tabList,
      data: { list }
    } = this.state;

    const language = tabList[tabIndex].key;

    this.setState({
      loading: true
    });
    try {
      const res = await get("search/repositories", {
        q: `stars:>1 language:${language}`,
        sort: "stars",
        order: "desc",
        type: "Repositories",
        page,
        per_page: pageSize,
        ...params
      });

      let listData = [];
      if (type === "more") {
        listData = list.concat(res.data.items);
      } else {
        listData = res.data.items;
      }

      if (listData && listData.length) {
        this.setState({
          data: {
            list: listData,
            total: res.data.total_count || 0
          }
        });
      }
    } catch (e) {
      this.setState({
        error: e.response,
        loading: false
      });
    }

    this.setState({
      loading: false
    });
  };

  changeTab = index => {
    const { tabList } = this.state;
    this.setState({
      tabIndex: index,
      data: {
        list: [],
        total: 0,
        error: {}
      }
    });

    const lang = tabList[index].key;

    this.fetch({ q: `stars:>1 language:${lang}` }, "fatch");
  };

  loadFunc = () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.setState({
      page: newPage,
      error: {}
    });

    this.fetch({ page: newPage }, "more");
  };

  render() {
    const {
      tabList,
      loading,
      data: { list, total },
      tabIndex,
      error
    } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.tabs}>
          {tabList.map((item, index) => (
            <a
              key={item.key}
              role="button"
              tabIndex="0"
              onClick={() => this.changeTab(index)}
              onKeyDown={this.handleKeyDown}
              className={tabIndex === index ? styles.active : ""}
            >
              {item.value}
            </a>
          ))}
        </div>
        <div>
          <p>
            <b>total:</b>
            <span>{formatNumber(total)}</span>
          </p>

          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={this.loadFunc}
            hasMore={!loading && !error.data}
            threshold={0}
            loader="loading"
          >
            <div className={styles.cardContent}>
              {list.length > 0 &&
                list.map(item => (
                  <div key={item.id} className={styles.card}>
                    <Card data={item} />
                  </div>
                ))}
            </div>
          </InfiniteScroll>

          {loading && (
            <p
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                margin: "20px, 0"
              }}
            >
              Loading。。。
            </p>
          )}
          {error && error.data && (
            <p
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                margin: "20px, 0",
                color: "red"
              }}
            >
              {error.data.message}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Popular;
