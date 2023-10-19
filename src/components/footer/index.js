import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { BiCopyright } from "react-icons/bi";

import "./index.css";

const Footer = () => {
  return (
    <footer className="footer-main-bg-container">
      <div className="container-fluid mt-2 mb-2">
        <div className="row p-2">
          <div className="col-12 col-md-4 mt-3 mb-2">
            <div>
              <h3 className="footer-support-heading">Support</h3>
              <p className="footer-support-side-text">Help Center</p>
              <p className="footer-support-side-text">Terms of Use</p>
              <p className="footer-support-side-text">Privacy Policy</p>
              <p className="footer-support-side-text">Content Complaints</p>
            </div>
          </div>
          <div className="col-12 col-md-4 mt-3 mb-2">
            <h3 className="footer-follow-us-heading">Follow Us</h3>
            <div className="d-flex align-items-center">
              <a
                className="footer-follow-us-icon-container"
                href="https://www.facebook.com/"
                target="__blank"
              >
                <BsFacebook className="footer-follow-us-icon" />
              </a>
              <a
                className="footer-follow-us-icon-container"
                href="https://twitter.com/"
                target="__blank"
              >
                <FaXTwitter className="footer-follow-us-icon" />
              </a>
              <a
                className="footer-follow-us-icon-container"
                href="https://www.instagram.com/"
                target="__blank"
              >
                <BsInstagram className="footer-follow-us-icon" />
              </a>
              <a
                className="footer-follow-us-icon-container"
                href="https://www.youtube.com/"
                target="__blank"
              >
                <BsYoutube className="footer-follow-us-icon" />
              </a>
            </div>
          </div>
          <div className="col-12 col-md-4 mt-3 mb-2">
            <h3 className="footer-download-app-heading">Download the App</h3>
            <div className="d-flex align-items-center">
              <img
                src="https://freepngimg.com/thumb/apple/58663-app-google-play-store-apple-download-hd-png.png"
                alt="playStoreImage"
                className="footer-download-image"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="footer-hr-line" />
      <div className="mt-2 mb-2 container-fluid">
        <div className="row p-2">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <BiCopyright className="footer-copy-right-icon" />
              <p className="footer-copy-right-text">
                Created by Ajay Reddy in 2023. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
