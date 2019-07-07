import React, { PureComponent } from 'react';
import { Icon, } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';

@connect(({ matchHandicap,gameDB,oddsList, loading }) => ({
  matchHandicap,
  oddsList,
  gameDB,
  loading: loading.models.matchHandicap
}))
class Index extends PureComponent {


  render() {
    const { data, gameDB: { gameDB },oddsList: {oddsList} } = this.props;
    return (
      <Link to={`/detail?MatchId=${data.match_id}&GameID=${data.game_id}`} key={data.match_id}>
        <li className={styles['event-item']} >
          <div className={styles['event-header']}>
            <div className={styles.title}>
              {
                gameDB[data.game_id] ?
                <img
                  src={gameDB[data.game_id].logo}
                  className={styles['game-logo']}
                />: ''
              }

              <div>{data.match_time}</div>
            </div>
            <div className={styles.league}>{data.event_name}</div>
          </div>
          <div className={styles['event-content']}>
            <div className={styles['event-content-left']}>
              <div className={styles['group-left']}>
                <div className={styles['group-team']}>
                  <div className={styles.name}>{data.host_player.name}</div>
                  <div className={styles.icon}>
                    <img src={data.host_player.logo} alt="" />
                  </div>
                </div>
                <div className={styles.odds}>
                  <div className={styles['odds-item']}>
                    <div className={styles['odds-num']}>
                      {oddsList[data.main_handicap[0]] ? oddsList[data.main_handicap[0].handicap_item_id].odds :''}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['group-right']}>
                <div className={styles.odds}>
                  <div className={styles['odds-item']}>
                    <div className={styles['odds-num']}>
                      {oddsList[data.main_handicap[1]] ? oddsList[data.main_handicap[1].handicap_item_id].odds :''}
                    </div>
                  </div>
                </div>
                <div className={styles['group-team']}>
                  <div className={styles.icon}>
                    <img src={data.guest_player.logo} alt="" />
                  </div>
                  <div className={styles.name}>{data.guest_player.name.substring(0,5)}</div>
                </div>
              </div>
            </div>

            <div className={styles['event-content-right']}>
              <div className={styles.handicapInfo}>
                <div className={styles.num}>+{data.handicap_count}</div>
                <div className={styles.text}>盘口</div>
              </div>
            </div>

          </div>
        </li>
      </Link>
    );
  }
}
export default Index
