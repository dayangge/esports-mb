import React, { PureComponent } from 'react';
import styles from './index.scss';
import { connect } from 'dva';
import ScrollWrap from '../../../../../components/ScrollWrap/index';

class GameTabs extends PureComponent {

  state = {
    gameActive: 0,
  };

  getGameResultList = (index) => {
    this.setState({
      gameActive: index
    });
    console.log(index)
  };

  render() {
    const { gameIds,gameList} = this.props;
    const len  = gameIds.length * 20;
    const { gameActive } = this.state;
    return (
      <aside id="game-tabs-list">
        <ul className={styles['game-tabs-list']}>
          <ScrollWrap wrapId="tabs-wrap"
                      wrapClass="wrapper"
                      height="7.5vh"
                      width="100%"
                      wrapWidth={`${len}vw`}
                      isY={false}
                      isX={true}
                      key='scroll2'
                      isShowBar={false}
          >
            {
              gameIds.map((val,i)=>(
                <div
                  className={styles['category-item']}
                  key={val}
                  onClick={() => this.getGameResultList(i)}
                  style={gameActive === i ? {borderBottomWidth: 4}:{borderBottomWidth: 0}}
                >
                  {gameList[val].Name}
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
