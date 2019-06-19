import React, {PureComponent} from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { Icon } from 'antd-mobile';
import  GameTabs  from './GameTabs'

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
      type: 'MatchResult/fetchMatchResult',
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
    const { gameList: {gameList},matchResult: {matchResult} } =  this.props;
    const { ids,list} = gameList;
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
        </div>
        <div className={styles['game-tabs']}>
          <GameTabs gameIds={ids} gameList={list} />
        </div>
        <div className={styles.main}>
          <section className={styles['select-box']}>1</section>
          <section className={styles['result-list']}>
          </section>

        </div>
      </div>
    );
  }
}

export default GameResult;
