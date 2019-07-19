import React, { PureComponent } from 'react';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import moment from 'moment';
import SessionStorage from 'esports-core/utils/sessionStorage';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '@/layouts/nprogress.less';
import {LocaleProvider} from "antd-mobile";
import zh_CN from "antd/lib/locale-provider/zh_CN";

NProgress.configure({ showSpinner: false });

// 底部有bar菜单
let currHref = '';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back'
};

@connect(({ oddsList, login, loading }) => ({
  oddsList,
  login,
  handicapLoading:loading.models.oddsList,
}))
class BasicLayout extends PureComponent {

  state = {
    isLogin: true
  };

  timer = null;
  timer1 = null;
  setRefreshToken = () => {
    const expire = SessionStorage.get('expire');
    const expireTimestamp = moment(expire).valueOf();
    const now = moment().valueOf();
    const setTime = (expireTimestamp - now + 1000 * 60 * 5) > 1000 * 60 *5 ? expireTimestamp - now + 1000 * 60 * 5 : 10000 ;
    if(this.timer !== null) {
      this.timer = setTimeout(this.refreshToken,
        setTime)
    }
  };

  refreshToken = () => {
    const { dispatch, } = this.props;
    const token = SessionStorage.get('token');
    dispatch({
      type: 'login/refreshToken',
      payload: {token},
      callback: (res) => {
        SessionStorage.add('token',res.token);
        SessionStorage.add('expire',res.expire);
        this.setRefreshToken()
      }
    });
  };

  componentDidMount() {
    const { dispatch, location } = this.props;
    if(SessionStorage.get('token') !== undefined && SessionStorage.get('token') !== null  ){
      this.setRefreshToken();
      this.setState({
        isLogin: true
      })
    }else{
      const token = location.query.token;
      dispatch({
        type: 'login/login',
        payload: {token},
        callback: (res) => {
          SessionStorage.add('token',res.token);
          SessionStorage.add('expire',res.expire);
          this.setRefreshToken();
          this.setState({
            isLogin: true
          })
        }
      });
    }
    this.timer1 = setInterval(() => {
      this.getOddsList()
    },10000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer1)
  }

  getOddsList = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'oddsList/fetchOddsList',
    });
  };

  render() {
    const { children, location, loading, history } = this.props;
    const { href } = window.location; // 浏览器地址栏中地址
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }
    return (
      <LocaleProvider locale={zh_CN}>
        <TransitionGroup
          className={'router-wrapper'}
          childFactory={child => React.cloneElement(
            child,
            {classNames: ANIMATION_MAP[history.action]}
          )}
        >
          <CSSTransition key={location.pathname} timeout={300}>
            <div style={{ overflowX: 'hidden',height: '100%' }}>
              {children}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </LocaleProvider>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(BasicLayout));
