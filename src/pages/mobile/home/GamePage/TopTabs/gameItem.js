import React, { PureComponent } from 'react';
import styles from './index.scss';

export default class Aside extends PureComponent {
  state = {

  };

  render() {
    const { data } = this.props;
    return (
      <li className={styles['category-item']} key={data.ID}>
        <img alt=''
             src={data.Cover}
             className={styles['game-logo']} />
        <div className={styles.text}>
          <span className={styles.num}>
            {data.Count}
            </span>
        </div>
      </li>

    );
  }
}
