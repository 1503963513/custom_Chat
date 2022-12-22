import React, { Fragment, useCallback, useMemo, useEffect, useState } from 'react';
import renderRoutes from '../utils/render-routes';
import { Layout, Nav, Button, Breadcrumb, Dropdown, Avatar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconWrench, IconPuzzle, IconLive, IconSetting } from '@douyinfe/semi-icons';
// import './frameLayout.less'
import { useHistory } from 'react-router';
import { useSelector, useDispatch, connect, useStore } from 'react-redux'
import matchRoutes from '../utils/match-routes'
import { UserLoginerrorAction } from '../actions/user'
import { SocketSuccessAction, SocketSuccessMsgAction } from '../actions/socket'
import { io } from 'socket.io-client';
export const MyContext = React.createContext('socket');
const { Header, Footer, Sider, Content } = Layout;

const FrameLayout = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [selectedKey, setSelectedKeys] = useState([])
  const [socketValues, setsocketValues] = useState([])

  const unRenderPath = useCallback(({itemKey, selectedKeys}) => {
    history.push(itemKey)
    setSelectedKeys(selectedKeys)
  }, [])

  // matchRoutes匹配路由，当页面刷新的时候，对路由做对应匹配
  useEffect(() => {
    const path = props.location.pathname
    const matches = matchRoutes(props.route.children, path)
    if (matches.length === 0) {
      return null
    }
    // // 删掉最后一个元素，返回删除之后的元素，没有数组就不返回
    setSelectedKeys([matches.pop()?.route.path])

    // // 当前展开的 SubMenu 菜单项 key 数组
  }, [])

  const { user, socket } = useSelector((state) => state)
  if (!Object.keys(user.userInfo || {})?.length) {
    setTimeout(() => {
      history.push('/login')
    }, 1000)
  }


  useEffect(() => {
    if (Object.keys(user.userInfo).length) {
      let params = {
        name: '客服1',
        identity: 1,
        source: 1,
        phone: user.userInfo.phone,
      }
      let socket = io('http://localhost:5001')
      dispatch(props.Upsocket(new Map().set('socket', socket)))
      socket.emit('conconnect', params)
    }
    // return () => {
    //   if (Object.keys(userInfo).length) {
    //     io.socket.disconnect()
    //   }
    // }
  }, [])

  useEffect(() => {
    if (socket.$Socket.size) {
      socket.$Socket.get('socket').on('onmessage', function(msg) {
        console.log(msg)
        setsocketValues(msg)
      });
    }
  }, [socket.$Socket])

  const exitLoginOut = useCallback(() => {
    dispatch(UserLoginerrorAction())
  }, [])

  const unSiderNavitemns = useMemo(() => {
    const unNavitems = (route) => route.map((item) => {
      if (item.meta?.exHide) {
        return null
      }
      if (item.children) {
        return (
          <Nav.Sub key={item.path} itemKey={item.path} text={item.meta.title} icon={<item.meta.icon />}>
            {unNavitems(item.children)}
          </Nav.Sub>
        )
      }
      return <Nav.Item key={item.path} itemKey={item.path} text={item.meta.title} icon={<item.meta.icon />} />
    })
    return (
      <Nav
        selectedKeys={selectedKey}
        bodyStyle={{ height: 320 }}
        defaultIsCollapsed
        onSelect={unRenderPath}
      >
        {unNavitems(props.route.children)}
      </Nav>
    )
  }, [selectedKey])

  return (
    <Fragment>
      <Layout style={{ border: '1px solid var(--semi-color-border)', minHeight: '100%' }}>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <div>
            <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
              <Nav.Header>
                <IconSemiLogo style={{ width: '96px', height: '36px', fontSize: 36 }} />
              </Nav.Header>
              <span style={{ color: 'var(--semi-color-text-2)'}}>
                <span style={{marginRight: '24px', color: 'var(--semi-color-text-0)', fontWeight: '600' }}>
                    卓卓在线聊天
                </span>
              </span>
              <Nav.Footer>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={exitLoginOut}>退出登录</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    theme="borderless"
                    icon={<IconPuzzle size="large" />}
                    style={{
                      color: 'var(--semi-color-text-2)',
                      marginRight: '12px',
                    }}
                  />
                </Dropdown>

                <Avatar color="orange" size="small">
                  zuo
                </Avatar>
              </Nav.Footer>
            </Nav>
          </div>
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            {unSiderNavitemns}
          </Sider>
          <Content
            style={{
              padding: '24px',
              backgroundColor: 'var(--semi-color-bg-0)',
            }}
          >
            <MyContext.Provider value={socketValues}>
              {renderRoutes(props.route.children)}
            </MyContext.Provider>
          </Content>
        </Layout>
        <Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: 'var(--semi-color-text-2)',
            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} />
            <span>2022.12.01 </span>
          </span>
          <span>
            <span style={{ marginRight: '24px' }}>测试</span>
            <span>测试</span>
          </span>
        </Footer>
      </Layout>
    </Fragment>
  )
}
const mapStateToProps = (state) => ({
  $Socket: state.socket.$Socket,
  $siderMsgs: state.socket.siderMsgs,
})
const mapDispatchToProps = {
  Upsocket: SocketSuccessAction,
  Upsider: SocketSuccessMsgAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(FrameLayout)
