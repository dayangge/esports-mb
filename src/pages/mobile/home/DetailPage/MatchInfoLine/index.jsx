import React, { PureComponent, Fragment } from 'react';
import { Icon,Toast } from 'antd-mobile';
import styles from './index.scss';
import { connect } from 'dva';
import ScrollWrap from '../../../../../components/ScrollWrap';
import Slide from '../../../../../components/slideAnimate';
import PageLoading from '../../../../../components/MbPageLoading';


@connect(({ matchHandicap, matchHandicapDB, oddsList, loading }) => ({
  matchHandicap,
  matchHandicapDB,
  oddsList,
  Loading: loading.effects.matchHandicap,
}))
class MatchInfoLine extends PureComponent {
  state = {
    show: false,
    isShowNum: 0,
    money: '',
    showOrder: false,
    betData:{},
    isSendOrder: false,
    betInfoModal: false
  };

  constructor(props) {
    super(props);
    this.numRef = React.createRef();
    this.oddsRef = React.createRef();
  }

  showTabs = (val) => {
    this.setState({
      isShowNum: val,
    });
  };

  closeGuessOrder = () => {
    this.setState({
      showOrder: false,
      money: ''
    });
  };

  showGuessOrder = (data) => {
    this.setState({
      showOrder: true,
      betData: data
    });
  };

  inputNum = (num) => {
    let { money } = this.state;
    if (money.length >= 6) {
      return false;
    }
    money = money + num;
    this.setState({
      money,
    });
  };

  inputNumFixed = (num) => {
    this.setState({
      money: num,
    });
  };

  deleteNum = () => {
    let { money } = this.state;
    if (money === '') {
      return false;
    }
    money = money.substring(0, money.length - 1);
    this.setState({
      money,
    });
  };

  showBetSuccessInfo = (text) => {
    Toast.info(text, 2, null, false);
  };

  betOrder = () => {
    const { betData } = this.state;
    const { dispatch } = this.props;
    if(this.numRef.current === null){return}
    const amount = +this.numRef.current.innerHTML;
    const odds = +this.oddsRef.current.innerHTML;
    const handicap_item_id = betData.handicap_item_id;
    if(typeof amount !== 'number' ){return}
    if(odds === 0 ){return}
    if(handicap_item_id === undefined){return}
    const params = [
      {
        amount,
        odds,
        handicap_item_id,
        id:'xxx'
      }
    ];

    dispatch({
      type: 'betOrders/postBetOrder',
      payload: {
        orders:params
      },
      callback: response => {
        if(response[0].err === false ){
          this.setState({
            showOrder: false,
            isSendOrder: false,
            money: '',
          });
          this.showBetSuccessInfo('投注成功')
        }
        if(response[0].err === true ) {
          this.setState({
            isSendOrder: false,
          });
          this.showBetSuccessInfo('response[0].msg')
        }
      },
    });

  };

  render() {
    const { matchHandicapData, oddsList: { oddsList }, matchHandicapDB: {matchHandicapDB} } = this.props;
    const { list, round } = matchHandicapData;
    const { isShowNum, money, showOrder, betData, isSendOrder,betInfoModal } = this.state;
    return (
      <Fragment>
        <div className={styles.bet}>
          <div className={styles.round}>
            <div className={styles['handicap-tabs-box']}>
              {
                round.map((val, index) => (
                  <div key={val.id}
                       className={isShowNum === index ? `${styles.round} ${styles.active}` : `${styles.round}`}
                       onClick={() => this.showTabs(index)}
                  >
                    <span>{val.name}</span>
                  </div>
                ))
              }
            </div>
            <ScrollWrap wrapId="bet-wrap" wrapClass="wraper" height="61vh" isX={false} isY={true}>
              {
                round.map((val, index) => (
                    <ul className={styles.list}
                        style={isShowNum === index ? { display: 'block' } : { display: 'none' }}
                        key={val.id}
                    >
                      {
                        list[val.id].map((item) => (
                          <li className={styles.item} key={item.handicap_id}>
                            <div className={styles['table-item']}>
                              <div className={styles['bet-name']}>
                                <div className={styles.line}/>
                                <div className={styles.name}>
                                  {item.handicap_name}
                                </div>
                                <div className={styles.line}/>
                              </div>
                              <div className={styles['bet-content']}>
                                {
                                  item.handicap_items.map((v) => (
                                    <div className={styles['pankou-row']}
                                         key={v.handicap_item_id}
                                         onClick={() => this.showGuessOrder(v)}>
                                      <span className={styles['pankou-result']}>
                                          {v.content}{v.offset ? `(${v.offset})`: ''}
                                          </span>
                                      <span className={styles['pankou-name']}>
                                        {oddsList[v.handicap_item_id] ? oddsList[v.handicap_item_id].odds : ''}
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
                  ),
                )
              }
            </ScrollWrap>
          </div>
        </div>
        {
          showOrder ? (<div className={styles['mask-layer']} />): ''
        }
            <Slide come={showOrder}
                   clsName="downSlides"
            >
            <div className={styles['bet-order']} >
              {
                isSendOrder ? (
                  <div className={styles['bet-order-mask']}>
                    <PageLoading />
                  </div>
                ): ''
              }

              <div className={styles['money-wrap']}>
                <div className={styles.header}>
                  <div className={styles.content}>竞猜单</div>
                  <div className={styles.balance}>
                    余额：90.00
                  </div>
                  <div className={styles.close} onClick={this.closeGuessOrder} >
                    <Icon type='cross'/>
                  </div>
                </div>
                <div className={styles['bet-info']}>
                  <div className={styles.left}>
                    <div className={styles.num}>
                      {
                        money === '' ? (
                          <div className={styles.money1}>
                            输入金额
                          </div>
                        ) : (
                          <div className={styles.money2} ref={this.numRef}>
                            {money}
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className={styles.center} >
                    x <span ref={this.oddsRef}>{oddsList[betData.handicap_item_id] ? oddsList[betData.handicap_item_id].odds : ''}</span>
                  </div>
                  <div className={styles.right}>{betData.content}</div>
                </div>
                <div className={styles['handicap']}>
                  <div className={styles.left}>盘口：{
                    matchHandicapDB[betData.handicap_id] ?
                    matchHandicapDB[betData.handicap_id].handicap_name : ''
                  }</div>
                  <div className={styles.right}>
                    <div className={styles['handicap-name']}>系统将接受下注时的较佳赔率</div>
                  </div>
                </div>
              </div>
              <div className={styles['button-wrap']}>
                <div className={styles['num-box']}>
                  <div className={styles.item} onClick={() => this.inputNum(1)}>1</div>
                  <div className={styles.item} onClick={() => this.inputNum(2)}>2</div>
                  <div className={styles.item} onClick={() => this.inputNum(3)}>3</div>
                  <div className={styles.item} onClick={() => this.inputNum(4)}>4</div>
                  <div className={styles.item} onClick={() => this.inputNum(5)}>5</div>
                  <div className={styles.item} onClick={() => this.inputNum(6)}>6</div>
                  <div className={styles.item} onClick={() => this.inputNum(7)}>7</div>
                  <div className={styles.item} onClick={() => this.inputNum(8)}>8</div>
                  <div className={styles.item} onClick={() => this.inputNum(9)}>9</div>
                  <div className={styles.item} onClick={() => this.inputNum(0)}>0</div>
                </div>
                <div className={styles['nums-box']}>
                  <div className={styles.item} onClick={() => this.inputNumFixed('100')}>100</div>
                  <div className={styles.item} onClick={() => this.inputNumFixed('500')}>500</div>
                  <div className={styles.item} onClick={() => this.inputNumFixed('1000')}>1000</div>
                  <div className={styles.item}>MAX</div>
                  <div className={styles.item} onClick={() => this.deleteNum()}>x</div>
                </div>
              </div>
              <div className={styles['bottom-wrap']}>
                <div className={styles.left}>
                  <div className={styles.text}>
                    预期获利:
                    <span className={styles.rmb}>
                      {betData.handicap_item_id !== undefined && (money * oddsList[betData.handicap_item_id].odds).toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.last}>最低下注金额：5</span>
                    <span className={styles.more}>下注金额上限：400</span>
                  </div>
                </div>
                <div className={styles.right} onClick={this.betOrder}>确认投注</div>
              </div>
            </div>
            </Slide>
      </Fragment>
    );
  }
}

export default MatchInfoLine;
