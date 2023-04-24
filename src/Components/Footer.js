import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
  <footer>
      <p>
          Copyright &copy; 2021
      </p>
      <Link to='/about'>About</Link>
      <h4><Link to='/'>Home</Link></h4>

  </footer>
  )
}

export default Footer