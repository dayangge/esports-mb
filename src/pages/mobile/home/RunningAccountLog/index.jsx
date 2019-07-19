import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Icon,
} from 'antd';
import styles from './index.scss';
import moment from 'moment';
import { DatePicker } from 'antd-mobile';
import ScrollWrap from '../../../../components/ScrollWrap';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';
import EventInfo from '../GamePage/MatchInfo';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const startTime = new Date(nowTimeStamp - 1000*60*60*24*7);
const startDate = new Date(startTime);

@connect(({ runningAccountLog, loading }) => ({
  runningAccountLog,
  loading: loading.models.runningAccountLog,
}))
class RunningAccountTable extends Component {
  state = {
    startDate: startDate,
    startDateVisible: false,
    endDate: now,
    endDateVisible: false,
    pagination: {
      total:0,
      current: 1,
      pageSize:20
    },
    isShowIndex: -1
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'runningAccountLog/fetchRunningAccountLog',
      callback: response => {
        const { RecordCount, PageIndex, PageSize } = response;
        this.setState({
          pagination: {
            total: RecordCount,
            current: PageIndex,
            PageSize,
          },
        });
      },
    });
  }

  fetchRunningAccount = () => {
    const {startDate, endDate} = this.state;
    const { dispatch } = this.props;
    console.log(startDate, endDate);
    dispatch({
      type: 'runningAccountLog/fetchRunningAccountLog',
      callback: response => {
        const { RecordCount, PageIndex, PageSize } = response;
        this.setState({
          pagination: {
            total: RecordCount,
            current: PageIndex,
            PageSize,
          },
        });
      },
    });
  };

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  render() {
    const { runningAccountLog: { runningAccountLog } } = this.props;
    const { list } = runningAccountLog;
    return (
      <div className={styles.runningAccount}>
        <div className={styles['top-fixed']}>
          <div className={styles['top-header']}>
            <div className={styles.back}>
              <Icon type="left" onClick={this.goBack} />
            </div>
            <div className={styles['top-header-main']}>
              <div className={styles['header-main-name']}>账变记录</div>
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
              locale={zhCn}
              value={this.state.startDate}
              onOk={date => {this.setState({ startDate: date, startDateVisible: false });
                this.fetchRunningAccount()
              }

              }
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
              locale={zhCn}
              value={this.state.satrtDate}
              onOk={date => {this.setState({ endDate: date, endDateVisible: false });
                this.fetchRunningAccount()
              }}
              onDismiss={() => this.setState({ visible: false })}
            />
          </div>
        </div>
        <div className={styles.main}>
          <ScrollWrap
            ref={this.myRef}
            wrapId="game-wrap"
            wrapClass="log-wrapper"
            height="88vh"
            isX={false}
            isY={true}
            fn={this.scrollLoadGame}
          >
            {list.map((val) => (
              <div className={styles.item} key={val.ID}>
                <div className={styles.title}>
                  <span>{val.Description}</span>
                  <span>{val.Type}</span>
                </div>
                <div className={styles.date}>
                  <span className={styles.time}>{val.CreateAt}</span>
                  <span >盈亏：<span style={val.Money > 0 ? {color:'#e90c0c'} : {color:'#1ece2a'}}>{val.Money}</span></span>
                </div>
              </div>
            ))}
          </ScrollWrap>
        </div>
      </div>

    );
  }
}

export default RunningAccountTable;
