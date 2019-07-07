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
import Link from 'umi/link';

@connect(({ gameList,matchList,matchDB,gameDB, matchHandicap, loading }) => ({
  gameList,
  matchList,
  matchHandicap,
  matchDB,
  gameDB,
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
    })
  }

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  render() {
    const {matchHandicap: {matchHandicap}, matchDB:{ matchDB }, gameDB: {gameDB}} = this.props;
    const { location } = this.props;
    const { query } = location;
    const {MatchID, GameID} = query;
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
              <div className={styles.logo}><img src='https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/a4a7d3db-6768-43ce-8a50-8d3c3244f3cd.png' /></div>
              <div className={styles.name}>GRG-DD</div>
            </div>
            <div className={styles.center}>
              <div className={styles.logo}><img src='https://img.avia01.com/upload/201809/0712370353b5.jpeg' /></div>
              <div className={styles.name}>韩国英雄联盟次级联赛</div>
              <div className={styles.time}>2019-07-02 15:34</div>
              <div className={styles.live}>暂无直播</div>
            </div>
            <div className={styles.right}>
              <div className={styles.logo}><img src='https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/a4a7d3db-6768-43ce-8a50-8d3c3244f3cd.png' /></div>

              <div className={styles.name}>IIF</div>
            </div>
          </div>
          <div className={styles.main}>
            <MatchInfoLine matchHandicapData={matchHandicap}   />
          </div>
        </div>
    );
  }
}

export default Detail;
