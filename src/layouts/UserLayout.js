import React from 'react';
import Link from 'umi/link';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'react-antd-admin';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - react-antd-admin`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>React Antd Admin</span>
              </Link>
            </div>
            <div className={styles.desc}>兴趣使然的后台管理系统</div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
