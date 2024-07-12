import React from 'react'
import {Link} from 'react-router-dom'
import CreateProductForm from './CreateProductForm';

const AdminDashboard = () => {
  return (
    <div className=' justify-center flex align-middle p-8  gap-36'>
        <div>
            <Link className='text-red-800 hover:text-red-600 '> Add a Product</Link>
        </div>
        <div>
            <Link className='text-red-800 hover:text-red-600'> View Your Product</Link>
        </div>
        <div>
            <Link className='text-red-800 hover:text-red-600'> Update/Delete Product</Link>
        </div>
        <CreateProductForm/>
    </div>
  )
}

export default AdminDashboard;