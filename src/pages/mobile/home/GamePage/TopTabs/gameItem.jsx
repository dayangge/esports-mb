import React, { PureComponent } from 'react';
import styles from './index.scss';

export default class Aside extends PureComponent {
  state = {

  };

  render() {
    const { data } = this.props;
    return (
      <li className={styles['category-item']} key={data.game_id}>
        <img alt=''
             src={data.logo}
             className={styles['game-logo']} />
        <div className={styles.text}>
          <span className={styles.num}>
            {data.match_count}
            </span>
        </div>
      </li>

    );
  }
}
