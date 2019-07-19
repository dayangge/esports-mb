import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ScrollWrap from '../../../../components/ScrollWrap/index';
import MbPageLoading from '../../../../components/MbPageLoading/index';
import Link from 'umi/link';
import styles from './index.scss';
import TopTabs from './TopTabs/index';
import EventInfo from './MatchInfo/index';
import { Icon, Drawer, List, Modal } from 'antd-mobile';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

@connect(({ gameList, matchList, matchHandicap,gameAndMatchRequestParams, oddsList, loading }) => ({
  gameList,
  matchList,
  matchHandicap,
  oddsList,
  gameAndMatchRequestParams,
  gameLoading: loading.models.gameList,
  matchLoading: loading.models.matchList,
  handicapLoading: loading.models.matchHandicap,
}))
class Home extends PureComponent {
  timer = null;
  mainHeight = 0;
  state = {
    modal1:false,
    renderLen: 14,
    matchLen: 0,
    openUser: false
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    const { dispatch, gameAndMatchRequestParams: {game_id}} = this.props;
    dispatch({
      type: 'gameList/fetchGameList',
    });
    dispatch({
      type: 'matchList/fetchMatchList',
      payload: {game_id}
    });
    dispatch({
      type: 'oddsList/fetchOddsList',
    });
    this.mainHeight = this.mainRef.current.clientHeight;
    if(!this.timer) {
      this.timer = setInterval(() => {
        this.fetchMatchListData();
        dispatch({
          type: 'gameList/fetchGameList',
        });
      }, 60000)
    }
  }

  static getDerivedStateFromProps(props,state){
    const  {matchList: { matchList }} = props;
    if(matchList.ids.length !== state.matchLen) {
      return {
        matchLen: matchList.ids.length
      }
    }
    return null
  }

  // 处理屏幕滚动事件，实现加载更多的效果
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  fetchMatchListData = () => {
    const { dispatch,gameAndMatchRequestParams: {game_id} } = this.props;
    dispatch({
      type: 'matchList/fetchMatchList',
      payload: {
        game_id
      },
    });
  };

  handleGameIDChangeScrollToTop = () => {
    this.scrollWrapChild.scrollToTop()
  };

  scrollLoadGame = (pos)=> {
    const contentHeight = this.myRef=== null ? 0 : this.myRef.current.myRef.clientHeight;
    const offset = contentHeight - this.mainHeight + pos.y;
    const { renderLen, eventLen } = this.state;
    if(offset <= 200){
      const downPulling =  renderLen + 7 > eventLen ? eventLen : renderLen + 7;
      this.setState({
        renderLen: downPulling
      })
    }
  };

  onOpenChange = (...args) => {
    this.setState({ openUser: !this.state.openUser });
  };

  showModal1 = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      modal1: true,
    });
  };

  onCloseModal1 = () => {
    this.setState({
      modal1: false,
    });
  };

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };

  onScrollWrapRef = (ref) => {
    this.scrollWrapChild= ref
  };


  render() {
    const { gameList: { gameList }, matchList: { matchList } } = this.props;
    const gameListIds = gameList.ids;
    const gameListList = gameList.list;
    const { renderLen } = this.state;
    const sidebar = (
      <ul className={styles['user-center']}>
      <li className={styles.name}>liucaihua</li>
      <li className={styles.log}>
        <div className={styles.left}>
          <span className={styles.balance} />
          账户余额
        </div>
        <div className={styles.right} style={{color:'#ff8a00'}}>
          90
        </div>
      </li>
      <Link to={`/runningAccount`} className={styles.log}>
        <div className={styles.left}>
          <span className={styles.zhangbian} />
          账变记录</div>
        <div className={styles.right}>
          <Icon type='right'/>
        </div>
      </Link>
      <Link to={`/betLog`} key='betLog' className={styles.log}>
        <div className={styles.left}>
          <span className={styles['game-log']} />
          游戏记录</div>
        <div className={styles.right}>
          <Icon type='right'/>
        </div>
      </Link>
      <Link to={`/rules`}  className={styles.log}>
        <div className={styles.left}>
          <span className={styles.rules} />
          规则说明
        </div>
        <div className={styles.right}>
          <Icon type='right'/>
        </div>
      </Link>
      <Link to={`/matchResult`}  className={styles.log}>
        <div className={styles.left}>
          <span className={styles.rules} />
          查看赛果
        </div>
        <div className={styles.right}>
          <Icon type='right'/>
        </div>
      </Link>
    </ul>);
    return (
      <div className={styles.index} key='home'>
        <div className={styles['top-fixed']}>
          <div className={styles['top-header']}>
            <div className={styles.user} onClick={this.onOpenChange}>
              <div className={styles['user-icon']} />
            </div>
            <div className={styles['top-header-main']}>
              <div className={styles['header-main-name']}>亚冠电竞</div>
            </div>
            <Link to={`/betLog`} className={styles.info}>
                <div className={styles['bet-info']} />
            </Link>
          </div>
        </div>
        <Drawer
          className="my-drawer"
          enableDragHandle
          style={{ minHeight: document.documentElement.clientHeight }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          open={this.state.openUser}
          onOpenChange={this.onOpenChange}
          sidebar={sidebar}
        >
          <div className={styles['game-tab']}>
            <div className={styles['game-tab-main']}>
              <TopTabs ids={gameListIds} list={gameListList} handleGameIDChange={this.handleGameIDChangeScrollToTop}/>
            </div>
          </div>
          <div className={styles['game-result']}>
            <div className={styles['select-event']} onClick={this.showModal1}>
              <div className={styles.left}>
                <span className={styles.icon} />
              </div>
              <div className={styles.text}>
                所有lol赛事
              </div>
              <div className={styles.arrow}>
                <div className={styles.icon} />
              </div>
            </div>
            <div className={styles.balance}>账户余额：90.00</div>
          </div>
          <div className={styles.main} ref={this.mainRef}>
            <ScrollWrap
              onScrollWrapRef={this.onScrollWrapRef}
              ref={this.myRef}
              wrapId="game-wrap"
              wrapClass="game-wrapper"
              height="78vh"
              isX={false}
              isY={true}
              fn={this.scrollLoadGame}
              scrollTo={false}
            >
              {
                matchList.ids.length !== 0 ?
                matchList.ids.slice(0,renderLen).map((val) => (
                <EventInfo data={matchList.list[val]} key={val}/>
                )) :'暂无数据'
                }
            </ScrollWrap>
          </div>
        </Drawer>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onCloseModal1}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: '62vh',width: '80vw', overflow: 'scroll' }} >
            <div className={styles['modal-game-header']}>
              <div className={styles['game-name']}>
                <div className={styles.left}>英雄联盟 73/73</div>
                <div className={styles.right}    onClick={this.onCloseModal1}><Icon type='cross'/></div>
              </div>
              <div className={styles['game-button']}>
                <div className={styles.left}>查看所有联赛</div>
                <div className={styles.right}>滚球盘</div>
              </div>
              <div className={styles['game-select']}>
                <div className={styles.left}>清空选项</div>
                <div className={styles.right}>全选</div>
              </div>
            </div>
            <div className={styles['modal-all-select']}>
              <div className={styles.line}>
                <div className={styles.left}>
                  <span className={styles.selected} />
                  CBDL 巴西职业联赛</div>
                <div className={styles.right}>8</div>
              </div>
              <div className={styles.line}>
                <div className={styles.left}>
                  <span className={`${styles.selected} ${styles.active}`} />
                  CBDL 巴西职业联赛</div>
                <div className={styles.right}>8</div>
              </div>
              <div className={styles.line}>
                <div className={styles.left}>CBDL 巴西职业联赛</div>
                <div className={styles.right}>8</div>
              </div>
            </div>
            <div className={styles['modal-ok']}>
              <div className={styles.button}  onClick={this.onCloseModal1}>确定</div>
            </div>
          </div>

        </Modal>

      </div>

    );
  }
}

export default Home;
