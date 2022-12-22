import React, { Fragment } from 'react'
import {
  IconArticle,
  IconQrCode,
  IconGithubLogo,
} from '@douyinfe/semi-icons';
import './nav.less'

const LoginNav = () => (
  <Fragment>
    <header className='login_header'>
      <div className='login_header_left'>
        <IconArticle size='extra-large' className='login_iconone'/>欢迎
      </div>
      <div className='login_header_right'>
        <IconQrCode size='extra-large' className='login_icontwo'/>
        <IconGithubLogo  size='extra-large' className='login_icontwo'/>
      </div>
    </header>
  </Fragment>
)

export default LoginNav
