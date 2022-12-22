import React, { useCallback } from 'react';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { useHistory } from 'react-router';
import './formregister.less'

const LoginRegister = ({ change, submit }) => (
  <main className='login_main'>
    <div className='login_main_box'>
      <div className='login_main_form'>
        <section className='login_main_title'>注册</section>
        <Form onSubmit={(values) => submit(values)} style={{ width: 400 }} labelPosition='inset' autoComplete='off'>
          {({ formState, values, formApi }) => (
            <>
              <Form.Input
                field='phone'
                label='账户'
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: '请输入账户' },
                  { validator: (rule, value) => value.length >= 11 && value.length <= 15, message: '账户名在11位-15位数字之间' },
                ]}
                placeholder='账户'
              ></Form.Input>
              <Form.Input
                field='password'

                label='密码'
                rules={[
                  { required: true, message: '请输入密码' },
                  { validator: (rule, value) => value.length >= 6 && value.length <= 15, message: '密码在6位-15位数字之间' },
                ]}
                style={{ width: '100%' }}
                placeholder='密码'
              ></Form.Input>
              <Form.Checkbox field='agree' noLabel>我已经阅读并同意<span className='login_btn'>用户协议</span>以及<span className='login_btn'>隐私政策</span></Form.Checkbox>
              <Button style={{marginTop: 15}} disabled={!(values.phone && values.password && values.agree)} theme='solid' type='primary' htmlType='submit'
                block>注册</Button>
              <div className='login_footer_o'><span className='login_log' onClick={change.bind(null, 0)}> 去登录 </span></div>
            </>
          )}
        </Form>
      </div>
    </div>
  </main>
)

export default LoginRegister
