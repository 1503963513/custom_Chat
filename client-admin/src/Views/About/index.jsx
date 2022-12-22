import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import React, { Fragment, useEffect, useState, useContext } from 'react';
// import { MyContext } from '../../Layout/frameLayout';// 引入父组件的Consumer容器
import { io } from 'socket.io-client'
import { List, Skeleton, Button, Avatar } from '@douyinfe/semi-ui';
import './index.less'

const About = () => {

  const [socketValues, setSocketValues] = useState(null)
  useEffect(() => {

  }, [])

  const placeholder = (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: 12,
        borderBottom: '1px solid var(--semi-color-border)',
      }}
    >
      <Skeleton.Avatar style={{ marginRight: 12 }} />
      <div>
        <Skeleton.Title style={{ width: 120, marginBottom: 12, marginTop: 12 }} />
        <Skeleton.Paragraph style={{ width: 600 }} rows={2} />
      </div>
    </div>
  );
  return (
    <Fragment>
      <section className='about_container'>
        <div className='about_container_left'>

        </div>
        <div className='about_container_center'>

        </div>
        <div className='about_container_right'>

        </div>
      </section>
    </Fragment>
  )
}

export default About
