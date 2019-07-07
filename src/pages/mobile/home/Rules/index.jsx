import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Icon,
} from 'antd';
import styles from './index.scss';


@connect(({ ruleDescription, loading }) => ({
  ruleDescription,
  loading: loading.models.ruleDescription,
}))
class RunningAccountTable extends Component {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ruleDescription/fetchRuleDescription',
    });
  }

  goBack = () => {
    const{ history } = this.props;
    history.go(-1)
  };

  render() {
    const { ruleDescription: { content }, loading } = this.props;
    return (
      <div className={styles.rules}>
        <div className={styles['top-fixed']}>
          <div className={styles['top-header']}>
            <div className={styles.back}>
              <Icon type="left" onClick={this.goBack} />
            </div>
            <div className={styles['top-header-main']}>
              <div className={styles['header-main-name']}>电竞规则</div>
            </div>
            <div className={styles.info}>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.ruleDesc} dangerouslySetInnerHTML={{ __html: content.Content }} />
        </div>
      </div>

    );
  }
}

export default RunningAccountTable;
