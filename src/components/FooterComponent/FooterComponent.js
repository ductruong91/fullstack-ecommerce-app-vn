import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"; // Import các icon từ react-icons

// Component FooterComponent
const FooterComponent = () => {
  return (
    <footer className="footer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        //   backgroundColor: "black",
        //   color: "white",
          alignItems: "center",
        }}
      >
        <div className="footer-column">
          <h3>Thông tin liên hệ</h3>
          <div className="social-icons">
            {/* Sử dụng các icon từ react-icons */}
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={30} className="social-icon" />
            </a>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} className="social-icon" />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} className="social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Thông tin cơ bản</h3>
          <p>Duc Truong</p>
          <p>ITE6</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
