import React, { PureComponent } from 'react';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
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
}

@connect(({ oddsList, loading }) => ({
  oddsList,
  handicapLoading:loading.models.oddsList,
}))
class BasicLayout extends PureComponent {

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getOddsList()
    },10000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
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
