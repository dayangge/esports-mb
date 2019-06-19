/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:37
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ScrollWrap from '../../../../components/ScrollWrap';
import MbPageLoading from '../../../../components/MbPageLoading';
import Link from 'umi/link';
import styles from './index.scss';
import TopTabs from './TopTabs';
import EventInfo from './MatchInfo';
import { Icon } from 'antd-mobile';

@connect(({ gameList, matchList, matchHandicap, oddsList, loading }) => ({
  gameList,
  matchList,
  matchHandicap,
  oddsList,
  gameLoading: loading.models.gameList,
  matchLoading: loading.models.matchList,
  handicapLoading: loading.models.matchHandicap,
}))
class Home extends PureComponent {
  timer = null;
  mainHeight = 0;

  state = {
    renderLen: 14,
    matchLen: 0
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props);
    dispatch({
      type: 'gameList/fetchGameList',
    });
    dispatch({
      type: 'matchList/fetchMatchList',
      payload: {
        id: 123,
      },
    });
    dispatch({
      type: 'oddsList/fetchOddsList',
    });
    this.mainHeight = this.mainRef.current.clientHeight;
    if(!this.timer) {
      this.timer = setInterval(() => {
        dispatch({
          type: 'matchList/fetchMatchList',
          payload: {
            id: 123,
          },
        });
        dispatch({
          type: 'gameList/fetchGameList',
        });
      }, 60000)
    }
  }

  static getDerivedStateFromProps(props,state){
    const  {matchList: { matchList }} = props;
    if(matchList.length !== state.matchLen) {
      return {
        matchLen: matchList.length
      }
    }
    return null
  }

  scrollLoadGame = (pos)=> {
    const contentHeight = this.myRef=== null ? 0 : this.myRef.current.myRef.clientHeight;
    const offset = contentHeight - this.mainHeight + pos.y;
    const { renderLen, eventLen } = this.state;
    console.log(offset,pos.y,contentHeight)
    if(offset <= 200){
      const downPulling =  renderLen + 7 > eventLen ? eventLen : renderLen + 7;
      this.setState({
        renderLen: downPulling
      })
    }
  };

  // 处理屏幕滚动事件，实现加载更多的效果
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { gameList: { gameList }, matchList: { matchList } } = this.props;
    const gameListIds = gameList.ids;
    const gameListList = gameList.list;
    const { renderLen } = this.state;
    return (
      <div className={styles.index} key='home'>
        <div className={styles['top-fixed']}>
          <div className={styles['top-header']}>
            <div className={styles.back}>
            </div>
            <div className={styles['top-header-main']}>
              <div className={styles['header-main-name']}>RMB0.12</div>
            </div>
            <div className={styles.info}>
            </div>
          </div>
        </div>
        <div className={styles['game-tab']}>
          <div className={styles['game-tab-main']}>
            <TopTabs ids={gameListIds} list={gameListList}/>
          </div>
        </div>
        <div className={styles['game-result']}>
          <Link to={`/matchResult`}>
            <div className={styles['result-button']}><span className={styles.text}>查看赛果</span></div>
          </Link>
        </div>

        <div className={styles.main} ref={this.mainRef}>
          <ScrollWrap
            ref={this.myRef}
            wrapId="game-wrap"
            wrapClass="game-wrapper"
            height="75vh"
            isX={false}
            isY={true}
            fn={this.scrollLoadGame}
          >
            {matchList.slice(0,renderLen).map((val) => (
              <div>
                <EventInfo data={val} key={val.MatchID}/>
              </div>
            ))}
            {
              renderLen === matchList.length? (
                <div className={styles['event-loading']}>
                  到底了。。。
                </div>
                ) : ''
            }
          </ScrollWrap>
        </div>
      </div>

    );
  }
}

export default Home;
