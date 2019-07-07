
export default [
  {
    path: '/',
    component: '../layouts/MBLayout',
    routes: [
      { path: '/', redirect: '/GamePage' },
      { path: '/GamePage', component: './mobile/home/GamePage', title: '首页' },
      { path: '/detail', component: './mobile/home/DetailPage', title: '投注页' },
      { path: '/MatchResult', component: './mobile/home/MatchResult', title: '赛果页' },
      { path: '/MatchResult/detail', component: './mobile/home/MatchResult/MatchDetail', title: '赛果详情' },
      { path: '/betLog', component: './mobile/home/BetLog', title: '投注记录' },
      { path: '/runningAccount', component: './mobile/home/RunningAccountLog', title: '账变记录' },
      { path: '/rules', component: './mobile/home/Rules', title: '电竞规则' },

    ]
}]
