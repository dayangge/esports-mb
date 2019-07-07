import React, {PureComponent} from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { Drawer, Icon } from 'antd-mobile';

@connect(({ gameList,matchResult,loading }) => ({
  gameList,
  matchResult,
  gameLoading: loading.models.gameList,
  resultLoading: loading.models.matchResult,
}))

@connect(({ matchResultDB }) => ({
  matchResultDB,
}))
class GameResult extends PureComponent {

  state = {
    show: false,
    isShowNum: 0,
  };

  showTabs = (val) => {
    this.setState({
      isShowNum: val,
    });
  };

  componentDidMount() {

    const { dispatch, location } = this.props;
    const { query } = location;
    const { matchID } = query;
    dispatch({
      type: 'matchResultDB/fetchMatchDetail',
      payload: { match_id: matchID }
    });

  }

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };


  render() {
    const { matchResultDB: {matchResultDB} } =  this.props;
    console.log(matchResultDB);
    const { isShowNum } = this.state;
    const data = matchResultDB.list;
    const round = matchResultDB.list.round;
    return (
      <div className={styles['result-detail']}>
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
        <div className={styles['match-info']}>
          <div className={styles.left}>
            <div className={styles.logo}><img src='https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/a4a7d3db-6768-43ce-8a50-8d3c3244f3cd.png' /></div>
            <div className={styles.name}>GRG-DD</div>
          </div>
          <div className={styles.center}>
            <div className={styles.name}>韩国英雄联盟次级联赛</div>
            <div className={styles.time}>2019-07-02 15:34</div>
            <div className={styles.live}>
              <div className={styles.host}>
                2
              </div>
              <div className={styles.text}>
                :
              </div>
              <div className={styles.guest}>
                0
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.logo}><img src='https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/a4a7d3db-6768-43ce-8a50-8d3c3244f3cd.png' /></div>

            <div className={styles.name}>IIF</div>
          </div>
        </div>
        <div className={styles.main} ref={this.mainRef}>
          <div className={styles['round-tab']}>
            {
              round.map((val, index) => (
                <div key={val.id}
                     className={isShowNum === index ? `${styles.item} ${styles.active}` : `${styles.item}`}
                     onClick={() => this.showTabs(index)}>
                  <span className={styles.text}>{val.name}</span></div>
              ))
            }
          </div>
          {
            data === undefined ? 'loading' :(
              <ul className={styles.round}>
                {
                  data.list.map((item, index) => (
                    <li className={styles.item}
                        style={isShowNum === index ? { display: 'block' } : { display: 'none' }}
                        key={ data.round[index].id } >
                      <div className={styles['round-name']}>
                        { data.round[index].name }
                      </div>
                      <div>
                        {
                          item.map((v) => (
                            <div className={styles['detail-item']} key={v.handicaps_id}>
                           <span className={styles.name}>
                             { v.handicaps_name}
                           </span>
                              <span className={styles.result}>
                             { v.result}
                           </span>
                            </div>
                          ))
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>

            )
          }
        </div>
      </div>
    );
  }
}

export default GameResult;
