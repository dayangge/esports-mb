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
import ScrollWrap from '../../../../components/ScrollWrap';
import EventInfoLine from './MatchInfoLine';

@connect(({ gameList,matchList, matchHandicap, loading }) => ({
  gameList,
  matchList,
  matchHandicap,
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
      payload: {MatchID}
    })
  }

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  render() {
    const {matchHandicap: {matchHandicap}} = this.props;

    return (
        <div className={styles.detail}>
          <div className={styles['top-fixed']}>
            <div className={styles['top-header']}>
              <div className={styles.back}>
                <Icon type="left" onClick={this.goBack} />
              </div>
              <div className={styles['top-header-main']}>
                <div className={styles['header-main-name']}>RMB0.12</div>
              </div>
              <div className={styles.info}>
              </div>
            </div>
          </div>
          <div className={styles['live-box']}></div>
          <div className={styles['handicap-tabs-box']}>
            <div className={styles['handicap-tabs']}>
              <div className={styles.viewData}>
                <span>查看数据</span>
              </div>
              <div className={styles.betsLog}>投注记录</div>
              <div className={styles.handicapGroup}>盘口</div>
            </div>
          </div>
          <div className={styles.main}>
             <ScrollWrap wrapId="bet-wrap" wrapClass="wraper" height="58vh"  isX={false} isY={true}>
               <EventInfoLine data={matchHandicap.data} list={matchHandicap.list} />
             </ScrollWrap>
          </div>
        </div>
    );
  }
}

export default Detail;
