import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Nav/Navbar'
import TaskList from '../components/tasks/TaskList'

function Home() {
  return (
   <Layout>
     <Navbar />
     <TaskList />
   </Layout>
  )
}

export default Home