import React, { PureComponent } from 'react';
import GameItem from './gameItem'
import styles from './index.scss';
import ScrollWrap from '../../../../../components/ScrollWrap/index';

class Aside extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  render() {
    const { ids ,list } =  this.props;
    const len  = ids.length * 14+14;
    return (
      <aside id="game-category-list">
        <ul className={styles['game-category-list']}>
          <ScrollWrap wrapId="tabs-wrap"
                      wrapClass="wrapper"
                      height="8vh"
                      width="100%"
                      wrapWidth={`${len}vw`}
                      isY={false}
                      isX={true}
                      key='scroll1'
                      isShowBar={false}
          >
            {
              ids.map((val)=>(<GameItem key={val}  data={list[val]}/>
              ))
            }
          </ScrollWrap>
          </ul>
      </aside>
    );
  }
}

export default Aside