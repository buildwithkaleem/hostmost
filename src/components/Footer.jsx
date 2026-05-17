import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              HostMost
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Fast, secure and reliable web hosting for developers,
              freelancers and businesses worldwide.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a className="p-2 bg-gray-800 cursor-pointer rounded hover:bg-indigo-600 transition">
                <FaFacebookF />
              </a>
              <a className="p-2 bg-gray-800 cursor-pointer rounded hover:bg-indigo-600 transition">
                <FaTwitter />
              </a>
              <a className="p-2 bg-gray-800 cursor-pointer rounded hover:bg-indigo-600 transition">
                <FaGithub />
              </a>
              <a className="p-2 bg-gray-800 cursor-pointer rounded hover:bg-indigo-600 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hosting</h3>
            <ul className="space-y-2">
              <li>Shared Hosting</li>
              <li>VPS Hosting</li>
              <li>Cloud Hosting</li>
              <li>WordPress Hosting</li>
              <li>Domain Registration</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to={'/about'}>About Us</Link></li>
              <li>Careers</li>
              <li><Link to={'https://earnify.egrif.online'}target="_blank" >Blog</Link></li>
              <li><Link to={'/contact'}>Contact</Link></li>
              <li>Affiliates</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Live Chat</li>
              <li>Documentation</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">

          <p className="text-gray-400">
            © {new Date().getFullYear()} HostMost. All rights reserved.
          </p>

          <p className="text-gray-500 mt-2 md:mt-0">
            Built with ❤️ for developers
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;