import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { DatePicker, Icon } from 'antd-mobile';
import moment from 'moment';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const startTime = new Date(nowTimeStamp - 1000*60*60*24*7);
const startDate = new Date(startTime);

@connect(({ gameLog, loading }) => ({
  gameLog,
  loading: loading.models.gameLog,
}))
class BetLog extends PureComponent {
  state = {
    startDate: startDate,
    startDateVisible: false,
    endDate: now,
    endDateVisible: false,
    pagination: {
      total:0,
      current: 1,
      pageSize:10
    },
    isShowIndex: -1
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameLog/fetchGameLog',
      callback: response => {
        const {RecordCount, PageIndex, PageSize} = response;
        this.setState({
          pagination: {
            total:RecordCount,
            current: PageIndex,
            PageSize,
          }
        });
      },
    });
  }

  showExpendInfo = (index) => {
    this.setState({
      isShowIndex: index
    })
  };

  closeExpendInfo = (index) => {
    this.setState({
      isShowIndex: -1
    })
  };

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  render() {
    const { gameLog: { gameLog }, loading } = this.props;
    const { list } = gameLog;
    const { isShowIndex } = this.state;
    return (
      <div className={styles.betLog} key='betLog '>
        <div className={styles['top-fixed']}>
          <div className={styles['top-header']}>
            <div className={styles.back}>
              <Icon type="left" onClick={this.goBack} />
            </div>
            <div className={styles['top-header-main']}>
              <div className={styles['header-main-name']}>投注记录</div>
            </div>
            <div className={styles.info}>
            </div>
          </div>
        </div>
        <div className={styles['date-picker']}>
          <div className={styles.start}>
            <span className={styles.icon} />
            <span className={styles.date}
                  onClick={() => this.setState({ startDateVisible: true })}
            >
              {moment(this.state.startDate).format("YYYY-MM-DD")}

            </span>
            <DatePicker
              visible={this.state.startDateVisible}
              mode="date"
              title="选择开始查询日期"
              extra="Optional"
              value={this.state.startDate}
              onOk={date => this.setState({ startDate: date, startDateVisible: false })}
              onDismiss={() => this.setState({ visible: false })}
            />
          </div>
          <div className={styles.text}>至</div>
          <div className={styles.start}>
            <span className={styles.icon} />
            <span className={styles.date}
                  onClick={() => this.setState({ endDateVisible: true })}
            >
              {moment(this.state.endDate).format("YYYY-MM-DD")}

            </span>
            <DatePicker
              visible={this.state.endDateVisible}
              mode="date"
              title="选择结束查询日期"
              extra="Optional"
              value={this.state.satrtDate}
              onOk={date => this.setState({ endDate: date, endDateVisible: false })}
              onDismiss={() => this.setState({ visible: false })}
            />
          </div>
        </div>
        <div className={styles.main}>
          <ul className={styles['list-box']}>
            {
              list.map((val,index) => (
                <li className={styles.item} key={val.id}>
                  <div className={styles['content-box']}>
                    <div className={styles.content}>
                      <div className={styles.title}>
                        <div className={styles.team}>{val.handicap_name}</div>
                        <div className={styles.status}>{val.status}</div>
                      </div>
                      <div className={styles.date}>
                        <div className={styles.time}>{val.start_time}</div>
                        <div className={styles.win}>{val.money}</div>
                      </div>
                    </div>
                    {
                      isShowIndex === index?(
                        <div className={styles.expend} >
                          <Icon type='down' onClick={() => this.closeExpendInfo(index)} />
                        </div>
                      ):(
                        <div className={styles.expend} >
                          <Icon type='right' onClick={() => this.showExpendInfo(index)} />
                        </div>
                      )

                    }

                  </div>
                  <div className={styles['item-detail']} style={isShowIndex === index? {display: 'block'} : {display: 'none'}}>
                    <div className={styles['detail-info']}>
                      <span className={styles.left}>比赛</span>
                      <span className={styles.right}>{val.match_name}</span>
                    </div>
                    <div className={styles['detail-info']}>
                      <span className={styles.left}>盘口</span>
                      <span className={styles.right}>{val.handicap_name}</span>
                    </div>
                    <div className={styles['detail-info']}>
                      <span className={styles.left}>赔率</span>
                      <span className={styles.right}>{val.odds}</span>
                    </div>
                    <div className={styles['detail-info']}>
                      <span className={styles.left}>投注金额</span>
                      <span className={styles.right}>{val.Money}</span>
                    </div>
                    <div className={styles['detail-info']}>
                      <span className={styles.left}>输赢</span>
                      <span className={styles.right}>{val.money}</span>
                    </div>
                    <div className={styles['detail-info']}>
                      <span className={styles.left}>下注时间</span>
                      <span className={styles.right}>{val.start_time}</span>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

    );
  }
}

export default BetLog;
