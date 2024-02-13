import React from 'react'
import Layout from '../components/Layouts/Layout'

const About = () => {
  return (
    <Layout title={'About Us - Ecommerce Wensite'}>
        <div className='row contactus'>
          <div className='col-md-6'>
            <img src='/images/contactus.jpeg' alt='contact us' style={{width:'100%'}} />
          </div>
          <div className='col-md-4'>
            <h1 className='text-center mt-2'> All About Us</h1>
            <p className='mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis itaque quae in, ex, veniam error optio necessitatibus voluptatem sunt, fugiat doloremque blanditiis reprehenderit. Maxime alias magni sit et neque molestiae ad, sed corrupti, sint optio praesentium illo possimus ducimus a provident ea deleniti eos!</p>
          </div>
        </div>
    </Layout>
  )
}

export default About