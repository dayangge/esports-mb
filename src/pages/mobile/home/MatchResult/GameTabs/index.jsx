import React, { PureComponent } from 'react';
import styles from './index.scss';
import { connect } from 'dva';
import ScrollWrap from '../../../../../components/ScrollWrap/index';

@connect(({ gameList }) => ({
  gameList,
}))
class GameTabs extends PureComponent {

  state = {
    gameActive: 0,
  };

  componentDidMount() {
    this.showResultDetail()
  }

  showResultDetail = () => {
    const { dispatch} = this.props;
    dispatch({
      type: 'gameList/fetchGameList',
    });
  };

  getGameResultList = (index) => {
    this.setState({
      gameActive: index
    });
    console.log(index)
  };

  render() {
    const { gameList:{gameList}} = this.props;
    const {ids ,list} = gameList;
    const len  = ids.length * 20 + 20;
    const { gameActive } = this.state;
    return (
      <aside id="game-tabs-list">
        <ul className={styles['game-tabs-list']}>
          <ScrollWrap wrapId="tabs-wrap"
                      wrapClass="wrapper"
                      height="6vh"
                      width="100%"
                      wrapWidth={`${len}vw`}
                      isY={false}
                      isX={true}
                      key='scroll2'
                      isShowBar={false}
          >
            {
              ids.map((val,i)=>(
                <div
                  className={styles['category-item']}
                  key={val}
                  onClick={() => this.getGameResultList(i)}
                  style={gameActive === i ? {borderBottomWidth: 4}:{borderBottomWidth: 0}}
                >
                  {list[val].name_cn}
                  </div>
              ))
            }
          </ScrollWrap>
          </ul>
      </aside>
    );
  }
}

export default GameTabs
