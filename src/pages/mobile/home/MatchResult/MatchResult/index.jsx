import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';
import Link from 'umi/link';

@connect(({ matchHandicap, gameDB,  loading }) => ({
  matchHandicap,
  gameDB,
  loading: loading.models.matchHandicap,
}))
class MatchResult extends PureComponent {

  render() {
    const { data, gameDB: { gameDB }, } = this.props;
    return (
      <div className={styles['result-item']}>
        <Link to={`/matchResult/detail?matchID=${data.match_id}`} key={data.match_id} className={styles['result-header']} >
          <div className={styles.left}>
            <div className={styles['game-logo']}>
              <img src={data.game_logo}/>
            </div>
            {data.match_name}
          </div>
          <div className={styles.right}>
            <div className={styles.date}>
              {data.start_time}
            </div>
            <span className={styles.sign}>
              <Icon type='right' />
            </span>
          </div>
        </Link>
        <div className={styles['result-content']}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.logo}>
                <img src={data.host_logo}/>
              </div>
              <div className={styles.name}>{data.host_name}</div>
              <div className={styles.score}>{data.host_score}</div>
            </div>
            <div className={styles.center}>
              :
            </div>
            <div className={styles.right}>
              <div className={styles.score}>{data.guest_score}</div>
              <div className={styles.name}>{data.guest_name}</div>
              <div className={styles.logo}>
                <img src={data.guest_logo}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchResult;
