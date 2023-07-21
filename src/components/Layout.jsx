import React from 'react'
import './Layout.css'

function Layout({children}) {
  return (
    <main className='container'>{children}</main>
  )
}

export default Layout