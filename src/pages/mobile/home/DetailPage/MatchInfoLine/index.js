import React, { PureComponent } from 'react';
import { Icon, } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';

@connect(({  matchHandicap,oddsList, loading }) => ({
  matchHandicap,
  oddsList,
  Loading: loading.effects.showMatchHandicapInfo,
}))
class EventInfoLine extends PureComponent {
  state = {
    isShow: false
  };

  render() {
    const { data, list, oddsList:{ oddsList } } = this.props;
    const { Round } = data;
    const { ids } = list;
    const handicapList = list.list;
    return (
      <ul className={styles['bet-placement-box']}>
        {
          Round.map((val) => (
            <li key={val.id} className={styles['bet-placement']}>
              <div className={styles['bet-round']}>
                <div className={styles['round-text']}>{val.Name}</div>
                <div  className={styles['round-text']}>
                  <Icon  type="down" size='xs' />
                </div>
              </div>
                {
                  ids.map((item) => (
                    handicapList[item].Round === val.ID ? (
                      <div className={styles['bet-expand']} key={item}>
                        <div className={styles['bet-expand-info']}>
                          <div className={styles.title}>
                            <div className={styles.handicap}>
                              <div className={styles['handicap-icon']} />
                              <div className={styles['handicap-name']}>{handicapList[item].Name}</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles['bet-item']}>
                          <div className={styles['team-left']}>
                            <div className={styles['team-logo']}>
                              <img />
                            </div>
                            <div className={styles['team-name']}>
                                1111
                            </div>
                            <div className={styles['team-odds']}>
                              <div className={styles.odds}>
                                <span className={styles.num}>{
                                 1111
                                }</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles['team-right']}>
                            <div className={styles['team-odds']}>
                              <div className={styles.odds}>
                                <span className={styles.num}>
                                  222
                                </span>
                              </div>
                            </div>
                            <div className={styles['team-name']}>
                              222
                            </div>
                            <div className={styles['team-logo']}>
                              <img />
                            </div>
                          </div>
                        </div>
                      </div>
                    ): ''
                  ))
                }
            </li>
          ))
        }
      </ul>
    );
  }
}
export default EventInfoLine
