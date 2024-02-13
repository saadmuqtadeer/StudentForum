import React from 'react'
import Layout from '../components/Layouts/Layout'

const Policy = () => {
  return (
    <Layout title={'Privacy AND Policy - Ecommerce Website'}>
      <div className='row contactus'>
          <div className='col-md-6'>
            <img src='/images/contactus.jpeg' alt='contact us' style={{width:'100%'}} />
          </div>
          <div className='col-md-4'>
            <h1 className='text-justify mt-2'> Terms And Conditions</h1>
            <ul>
              <li>Policy 1</li>
              <li>Policy 2</li>
              <li>Policy 3</li>
              <li>Policy 4</li>
              <li>Policy 5</li>
            </ul>
          </div>
        </div>
    </Layout>
  )
}

export default Policy