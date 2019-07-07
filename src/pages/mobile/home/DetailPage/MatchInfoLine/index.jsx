import React, { PureComponent,Fragment } from 'react';
import { Icon, } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';
import ScrollWrap from '../../../../../components/ScrollWrap';

@connect(({  matchHandicap,oddsList, loading }) => ({
  matchHandicap,
  oddsList,
  Loading: loading.effects.showMatchHandicapInfo,
}))
class MatchInfoLine extends PureComponent {
  state = {
    show: false,
    isShowNum: 0,
  };

  showTabs = (val) => {
    this.setState({
      isShowNum: val,
    });
  };


  render() {
    const { matchHandicapData,  oddsList:{ oddsList } } = this.props;
    console.log(matchHandicapData);
    const { list ,round } = matchHandicapData;
    const { isShowNum } = this.state;
    return (
      <Fragment>
        <div className={styles.bet} >
          <div className={styles.round}>
            <div className={styles['handicap-tabs-box']}>
              {
                round.map((val, index) => (
                  <div key={val.id}
                       className={isShowNum === index ? `${styles.round} ${styles.active}` : `${styles.round}`}
                       onClick={() => this.showTabs(index)}

                  >
                    <span >{val.name}</span></div>
                ))
              }
            </div>
            <ScrollWrap wrapId="bet-wrap" wrapClass="wraper" height="58vh"  isX={false} isY={true}>
            {
              round.map((val, index) => (
                  <ul className={styles.list}
                        style={isShowNum === index ? { display: 'block' } : { display: 'none' }}
                        key={val.id}
                    >
                      {
                        list[val.id].map((item) => (
                          <li className={styles.item} key={ item.handicaps_id } >
                            <div className={styles['table-item']}>
                              <div className={styles['bet-name']}>
                                <div className={styles.line} />
                                  <div className={styles.name}>
                                    { item.handicap_name}
                                  </div>
                                <div className={styles.line} />
                              </div>
                              <div className={styles['bet-content']}>
                                {
                                  item.handicap_items.map((v) => (
                                    <div className={styles['pankou-row']} key={v.handicap_items_id}>

                                      <span className={styles['pankou-result']}>
                                             { v.handicap_name}
                                          </span>
                                      <span className={styles['pankou-name']}>

                                        {oddsList[v.handicap_items_id]? oddsList[v.handicap_items_id].odds: ''}
                                          </span>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  )
              )
            }
            </ScrollWrap>
          </div>
       </div>
        <div>

        </div>
      </Fragment>
    );
  }
}
export default MatchInfoLine
