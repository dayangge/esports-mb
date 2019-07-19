import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import ScrollWrap from '../../../../../components/ScrollWrap/index';
import { gameBgColor } from 'esports-core/utils/util';

@connect(({ gameAndMatchRequestParams }) => ({
  gameAndMatchRequestParams,
}))
class TobTabs extends PureComponent {
  state = {
    isShowItem: 'all',
  };

  fetchMatchList = (id,index) => {
    const { dispatch, handleGameIDChange} = this.props;
    dispatch({
      type: 'matchList/fetchMatchList',
      payload: {
        game_id: id
      },
    });
    dispatch({
      type: 'gameAndMatchRequestParams/modifyGameType',
      payload: {
        game_id: id
      },
    });
    handleGameIDChange();
    this.setState({
      isShowItem: index
    })
  };

  render() {
    const { ids ,list, gameAndMatchRequestParams: {game_id} } =  this.props;
    const len  = (ids.length + 1) * 12 + 12;
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
            <li  className={ game_id === '' ?  `${styles['category-item']} ${styles['active']}` : styles['category-item']}
                key='all'
                onClick={() => this.fetchMatchList('','all' )}>
              <div className={styles['game-logo']}>
                A
              </div>
              <div className={styles.text}>
                <span className={styles.num}>
                 {100}
                </span>
              </div>
            </li>
            {
              ids.map((val,index)=>(
                <li
                  className={ game_id === list[val].game_id ?  `${styles['category-item']} ${styles['active']}` : styles['category-item']}
                    key={list[val].game_id}
                    onClick={() => this.fetchMatchList(list[val].game_id,index)}>
                  {
                    gameBgColor[list[val].name_code] ? (
                      <img alt=''
                           src={gameBgColor[list[val].name_code].logo}
                           className={styles['game-logo']} />
                    ) : ''
                  }
                  <div className={styles.text}>
                  <span className={styles.num}>
                      {list[val].match_count}
                      </span>
                  </div>
                </li>
              ))
            }
          </ScrollWrap>
          </ul>
      </aside>
    );
  }
}

export default TobTabs;
