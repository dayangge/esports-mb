/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:37
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, {PureComponent} from 'react';
import { connect } from 'dva';

import styles from './index.scss';
import { Icon } from 'antd-mobile';
import ScrollWrap from '../../../../components/ScrollWrap/index';
import MatchInfoLine from './MatchInfoLine/index';
import { gameBgColor } from 'esports-core/utils/util';
import { getStorage } from 'esports-core/utils/localStoragePloyfill';


@connect(({ gameList,matchList,matchDB,gameDB,matchInfo, matchHandicap, loading }) => ({
  gameList,
  matchList,
  matchHandicap,
  matchDB,
  gameDB,
  matchInfo,
  gameLoading: loading.models.gameList,
  eventLoading:loading.models.matchList,
  handicapLoading:loading.models.matchHandicap,
}))
class Detail extends PureComponent {

  componentDidMount() {
    const { dispatch,location } = this.props;
    const { query } = location;
    const {MatchID} = query;
    dispatch({
      type: 'matchHandicap/fetchMatchHandicap',
      payload: {match_id: MatchID}
    });
    dispatch({
      type: 'matchInfo/fetchMatchInfo',
      payload: {match_id: MatchID}
    })
  }

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  render() {
    const {matchHandicap: {matchHandicap}, matchDB:{ matchDB }, matchInfo: {matchInfo}} = this.props;
    const { location } = this.props;
    const { query } = location;
    const {MatchID, GameID} = query;
    const gameDB = getStorage('gameDB');
    const nameCode =  matchInfo.game_id === undefined ? 'default' : gameDB[matchInfo.game_id].name_code;
    return (
        <div className={styles.detail}>
          <div className={styles['top-fixed']}>
            <div className={styles['top-header']}>
              <div className={styles.back}>
                <Icon type="left" onClick={this.goBack} />
              </div>
              <div className={styles['top-header-main']}>
                <div className={styles['header-main-name']}>竞猜列表</div>
              </div>
                <div className={styles.info}>
                </div>
            </div>
          </div>
          <div className={styles['live-box']}>
            <div className={styles.left}>
              <div className={styles.logo}>
                <img src={gameBgColor[nameCode].logo} />
              </div>
              <div className={styles.name}>
                {matchInfo.host_player.name}
              </div>
            </div>
            <div className={styles.center}>
              <div className={styles.logo}>
                <img src={gameBgColor[nameCode].logo} />
              </div>
              <div className={styles.name}>
                {matchInfo.event_name}
                </div>
              <div className={styles.time}>
                {matchInfo.match_time}
                </div>
              <div className={styles.live}>
                暂无直播
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.logo}><img src='https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/a4a7d3db-6768-43ce-8a50-8d3c3244f3cd.png' /></div>

              <div className={styles.name}>{matchInfo.guest_player.name}</div>
            </div>
          </div>
          <div className={styles.main}>
            <MatchInfoLine matchHandicapData={matchHandicap}  />
          </div>
        </div>
    );
  }
}

export default Detail;
