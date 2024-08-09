import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
               <img src={assets.logo} alt=''/>
               <p>Whether you have questions, feedback, or just want to say hello, we're here for you. Connect with us through our social media channels or drop us a message anytime!</p>
               <div className="footer-social-icons">
                <a href='https://www.facebook.com/satu.mandalemula/' target='blank'><img src={assets.facebook_icon} alt=''/></a>
                <a href='https://x.com/Satwikm08' target='blank'><img src={assets.twitter_icon} alt=''/></a>
                <a href='https://www.linkedin.com/in/msatwik/' target='blank'><img src={assets.linkedin_icon} alt=''/></a>
               </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>8008297122</li>
                    <li>contact@QuickEats.com</li>
                </ul>
            </div>

        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 &copy; QuickEats.com - All Rights Resesrved </p>
      
    </div>
  )
}

export default Footer
