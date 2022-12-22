// 1.1 引入需要的包
import React from 'react'
// 引入 route 注意，这里安装的是6.2.1的版本的router-dom包
import { Route, Switch } from 'react-router-dom'
// 1.2 rotes匹配的路由作为参数传递
const renderRoutes = (routes) => (
  // console.log(routes) => []
  // 1.3 判断routes数组 为家返回null，存在则变量数组
  routes ? (
    <React.Suspense fallback={<div>loading</div>}>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            // 1.4 render属性，回调函数插入子组件，props是匹配路由对象的方法
            render={(props) => {
            // 1.5 Object.assign()复制一个对象，参数1是复制的目标对象
              props = Object.assign({route}, props)
              // 1.6 返回子组件 <route.component /> 并传递参数
              return (
                route.render
                  ? route.render
                  : <route.component {...props} router={route}/>
              )
            }}
          />
        ))}
      </Switch>
    </React.Suspense>
  ) : null
)
export default renderRoutes
