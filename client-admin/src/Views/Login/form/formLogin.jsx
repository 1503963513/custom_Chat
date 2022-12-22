import React, { useCallback } from 'react';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { useHistory } from 'react-router';
import './formLogin.less'

const Logined = ({ change, submit }) => {
  const history = useHistory()

  return (
    <main className='login_main'>
      <div className='login_main_box'>
        <div className='login_main_form'>
          <section className='login_main_title'>登录</section>
          <Form onSubmit={(values) => submit(values)} style={{ width: 400 }} labelPosition='inset' autoComplete='off'>
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field='phone'
                  label='账户'
                  style={{ width: '100%' }}
                  placeholder='账户'
                ></Form.Input>
                <Form.Input
                  field='password'
                  label='密码'
                  style={{ width: '100%' }}
                  placeholder='密码'
                ></Form.Input>
                <Button style={{marginTop: 15}} disabled={!(values.phone && values.password)} theme='solid' type='primary' htmlType='submit'
                  block>登录</Button>
                <div className='login_settings' >
                  <p>
                    <span>如果没有账户请先</span>
                    <span className='login_btn' onClick={change.bind(null, 1)}>注册账户</span>
                  </p>
                  <p>
                    <span>无法登录</span>
                    <span className='login_btn'>找回密码</span>
                  </p>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Logined
