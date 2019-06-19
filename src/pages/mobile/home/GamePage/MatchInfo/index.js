import React, { PureComponent } from 'react';
import { Icon, } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';

@connect(({ matchHandicap,oddsList, loading }) => ({
  matchHandicap,
  oddsList,
  loading: loading.models.matchHandicap
}))
class Index extends PureComponent {
  state = {
    isShow: false
  };

  render() {
    const { data, oddsList: {oddsList} } = this.props;

    const handicapIds = data.Bet[0].Items.ids;
    const {MatchID} = data;
    return (
      <Link to={`/detail?MatchID=${MatchID}`} key={MatchID}>
        <li className={styles['event-item']} >
          <div className={styles['event-header']}>
            <div className={styles.title}>
              <img
                src={data.CateLogo}
                className={styles['game-logo']}
              />
              <div>{data.StartAt}</div>
            </div>
            <div className={styles.rules}>{data.Title.substring(0,5)}</div>
            <div className={styles.league}>{data.League}</div>
          </div>
          <div className={styles['event-content']}>
            <div className={styles['event-content-left']}>
              <div className={styles['group-left']}>
                <div className={styles['group-team']}>
                  <div className={styles.name}>{data.Player[0].Name.substring(0,5)}</div>
                  <div className={styles.icon}>
                    <img src={data.Player[0].Logo} alt="" />
                  </div>
                </div>
                <div className={styles.odds}>
                  <div className={styles['odds-item']}>
                    <div className={styles['odds-num']}>
                      {oddsList[handicapIds[0]] ? oddsList[handicapIds[0]].Odds :''}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['group-right']}>
                <div className={styles.odds}>
                  <div className={styles['odds-item']}>
                    <div className={styles['odds-num']}>
                      {oddsList[handicapIds[1]] ? oddsList[handicapIds[1]].Odds :''}
                    </div>
                  </div>
                </div>
                <div className={styles['group-team']}>
                  <div className={styles.icon}>
                    <img src={data.Player[1].Logo} alt="" />
                  </div>
                  <div className={styles.name}>{data.Player[1].Name.substring(0,5)}</div>
                </div>
              </div>
            </div>

            <div className={styles['event-content-right']}>
              <div className={styles.handicapInfo}>
                <div className={styles.num}>+{data.BetCount}</div>
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
