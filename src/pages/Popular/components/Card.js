import React, { Component } from 'react'
import styles from './card.less'
import { formatNumber } from '../../../util/util';

class Card extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { data } = this.props
    return (
      <div className={styles.card}>
        <div className={styles.cardArchive}>
          <img src={data.owner.avatar_url} alt="" />
        </div>
        <p className={styles.cardName}>{data.name}</p>
        <div className={styles.info}>
          <p>
            <span>
              <i style={{ color: 'rgb(255, 191, 116)'}} className="fa fa-user" />
            </span>
            <span>
              {data.owner.login}
            </span>
          </p>
          <p>
            <span>
              <i style={{ color: 'rgb(255, 215, 0)'}} className="fa fa-star" aria-hidden="true" />
            </span>
            <span>
              {formatNumber(data.stargazers_count, 0)}
            </span>
            <span>stars</span>
          </p>
          <p>
            <span>
              <i style={{color: 'rgb(129, 195, 245)'}} className="fa fa-code-fork" aria-hidden="true" />
            </span>
            <span>
              {formatNumber(data.forks_count)}
            </span>
            <span>
              forks
            </span>
          </p>
          <p>
            <span>
              <i style={{color: 'rgb(241, 138, 147)'}} className="fa fa-exclamation-triangle" aria-hidden="true" />
            </span>
            <span>
              {formatNumber(data.open_issues)}
            </span>
            <span>
              issue
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default  Card
