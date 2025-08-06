import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      
      <div className="contact-info">
        <p><strong>Email:</strong> support@studentms.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
      </div>

      <p className="typing-text">
         Reach out to us for any issues or support.
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
