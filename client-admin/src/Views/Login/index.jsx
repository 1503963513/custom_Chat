import React, { Fragment, useCallback, useState } from 'react';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import {
  userLogin,
  userRegister,
} from '../../api/login'
import { loginAsyncActionCreator } from '../../actions/user'
import './index.less'
import LoginNav from './componets/nav'
import LoginFoo from './componets/foo'
import LoginForm from './form/formLogin'
import FormRegister from './form/formregister'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const Login = (props) => {

  const [loginStatus, setLoginStatus] = useState(0) // 0: 登录 1：注册 2：找回

  const StatusChange = useCallback((value) => {
    setLoginStatus(value)
  }, [])

  const handleLoginSubmit = useCallback(async(values) => {
    props.login(values)
  }, [])

  const handleRegisterSubmit = useCallback(async(values) => {
    let resData = await userRegister(values)
    if (resData.code === 200) {
      Toast.info('注册成功');
      setLoginStatus(0)
    }
  }, [])

  return props.userInfo?.phone ? <Redirect to={'/dashboard'}></Redirect> : (
    <Fragment>
      <section className='login_container'>
        <LoginNav></LoginNav>
        {
          loginStatus === 0 ? <LoginForm
            change={StatusChange}
            submit={handleLoginSubmit}
          ></LoginForm> : null
        }
        {
          loginStatus === 1 ? <FormRegister
            change={StatusChange}
            submit={handleRegisterSubmit}
          ></FormRegister> : null
        }
        <LoginFoo></LoginFoo>
      </section>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
})
const mapDispatchToProps = {
  login: loginAsyncActionCreator,
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
