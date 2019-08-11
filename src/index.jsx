import React from 'react'
import ReactDOM from 'react-dom'
// import { ConfigProvider } from 'antd'
import { ConfigProvider } from 'antd'
import { Provider } from 'mobx-react'
import store from '@/store'

import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import App from './App'
import './index.less'

moment.locale('zh-cn')

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider {...store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
