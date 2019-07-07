import React, {PureComponent} from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { Drawer, Icon } from 'antd-mobile';
import  GameTabs  from './GameTabs/index'
import ScrollWrap from '../../../../components/ScrollWrap';
import MatchResult from './MatchResult';

@connect(({ gameList,matchResult,loading }) => ({
  gameList,
  matchResult,
  gameLoading: loading.models.gameList,
  resultLoading: loading.models.matchResult,
}))
class GameResult extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameList/fetchGameList',
    });
    dispatch({
      type: 'matchResult/fetchMatchResult',
    });
  }

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  getGameResultList = (id) => {
    const { dispatch, } = this.props;
    dispatch({
      type: 'MatchResult/fetchMatchResult',
      payload: id
    });
  };

  render() {
    const { matchResult: {matchResult} } =  this.props;
    const { ids , list} = matchResult.list;
    return (
      <div className={styles['game-result']}>
        <div className={styles['top-fixed']}>
          <div className={styles['top-header']}>
            <div className={styles.back}>
              <Icon type="left" onClick={this.goBack} />
            </div>
            <div className={styles['top-header-main']}>
              <div className={styles['header-main-name']}>赛果</div>
            </div>
            <div className={styles.info}>
            </div>
          </div>
          <div className={styles['game-tabs']}>
            <GameTabs />
          </div>
        </div>
          <div className={styles.main} ref={this.mainRef}>
            <ScrollWrap
              ref={this.myRef}
              wrapId="game-wrap"
              wrapClass="game-wrapper"
              height="82vh"
              isX={false}
              isY={true}
              fn={this.scrollLoadGame}
            >
              {ids.map((val) => (
                <MatchResult data={list[val]} key={val}/>
              ))}
            {/*  {
                renderLen === matchList.ids.length? (
                  <div className={styles['event-loading']}>
                    到底了。。。
                  </div>
                ) : ''
              }*/}
            </ScrollWrap>
          </div>
      </div>
    );
  }
}

export default GameResult;
