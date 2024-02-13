import React from 'react'
import Layout from '../components/Layouts/Layout'
import { BiMailSend, BiPhoneCall, BiSupport} from "react-icons/bi"

const Contact = () => {
  return (
    <Layout title={'Contact Us - Ecommerce Wensite'}>
        <div className='row contactus'>
          <div className='col-md-6'>
            <img src='/images/contact.jpeg' alt='contact us' style={{width:'100%'}} />
          </div>
          <div className='col-md-4'>
            <h1 className='text-justify mt-2'> Any Query and info about the product feel free to vaialible</h1>
            <p className='mt-3'><BiMailSend/> : www.help@commerceApp.com </p>
            <p className='mt-3'><BiPhoneCall/> : 012-34567-98</p>
            <p className='mt-3'><BiSupport/> : 1800-0000-0000 (toll free)</p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact