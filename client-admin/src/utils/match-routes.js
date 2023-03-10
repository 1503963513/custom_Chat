// 这是一个根据我们访问的地址，对应匹配到路由信息路径等
import { matchPath, Router } from 'react-router-dom';

function matchRoutes(routes, pathname, /* not public API*/ branch = []) {
  routes.some((route) => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : Router.computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({ route, match });

      if (route.children) {
        matchRoutes(route.children, pathname, branch);
      }
    }

    return match;
  });

  return branch;
}

export default matchRoutes
