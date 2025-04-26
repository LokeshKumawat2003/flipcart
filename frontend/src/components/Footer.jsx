import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#172337] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6 lg:p-8 border-b border-gray-700">
          {/* About section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase">ABOUT</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-xs">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about/careers" className="text-gray-300 hover:text-white text-xs">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/about/stories" className="text-gray-300 hover:text-white text-xs">
                  Flipkart Stories
                </Link>
              </li>
              <li>
                <Link to="/about/press" className="text-gray-300 hover:text-white text-xs">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/about/wholesale" className="text-gray-300 hover:text-white text-xs">
                  Flipkart Wholesale
                </Link>
              </li>
              <li>
                <Link to="/about/corporate" className="text-gray-300 hover:text-white text-xs">
                  Corporate Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Help section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help/payments" className="text-gray-300 hover:text-white text-xs">
                  Payments
                </Link>
              </li>
              <li>
                <Link to="/help/shipping" className="text-gray-300 hover:text-white text-xs">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/help/cancellation" className="text-gray-300 hover:text-white text-xs">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link to="/help/faq" className="text-gray-300 hover:text-white text-xs">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help/report" className="text-gray-300 hover:text-white text-xs">
                  Report Infringement
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase">CONSUMER POLICY</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/policy/return" className="text-gray-300 hover:text-white text-xs">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/policy/terms" className="text-gray-300 hover:text-white text-xs">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/policy/security" className="text-gray-300 hover:text-white text-xs">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/policy/privacy" className="text-gray-300 hover:text-white text-xs">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/policy/sitemap" className="text-gray-300 hover:text-white text-xs">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/policy/grievance" className="text-gray-300 hover:text-white text-xs">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase">SOCIAL</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/social/facebook" className="text-gray-300 hover:text-white text-xs">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="/social/twitter" className="text-gray-300 hover:text-white text-xs">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="/social/youtube" className="text-gray-300 hover:text-white text-xs">
                  YouTube
                </Link>
              </li>
            </ul>

            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase">Mail Us:</h3>
              <address className="text-xs text-gray-300 not-italic">
                Flipkart Internet Private Limited,
                <br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,
                <br />
                Outer Ring Road, Devarabeesanahalli Village,
                <br />
                Bengaluru, 560103,
                <br />
                Karnataka, India
              </address>
            </div>
          </div>
        </div>

        {/* Address section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8 border-b border-gray-700">
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-400 uppercase">Registered Office Address:</h3>
            <address className="text-xs text-gray-300 not-italic">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
              <br />
              CIN: U51109KA2012PTC066107
              <br />
              Telephone:{" "}
              <a href="tel:18002089898" className="text-[#2874f0]">
                1800 208 9898
              </a>
            </address>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-400 uppercase">Sell On Flipkart:</h3>
            <p className="text-xs text-gray-300 mb-4">
              <a href="/sell-online" className="text-[#2874f0]">
                Sell Online
              </a>
            </p>

            <h3 className="text-sm font-medium mb-2 text-gray-400 uppercase">Advertise:</h3>
            <p className="text-xs text-gray-300 mb-4">
              <a href="/advertise" className="text-[#2874f0]">
                Advertise on Flipkart
              </a>
            </p>

            <h3 className="text-sm font-medium mb-2 text-gray-400 uppercase">Gift Cards:</h3>
            <p className="text-xs text-gray-300 mb-4">
              <a href="/gift-cards" className="text-[#2874f0]">
                Flipkart Gift Cards
              </a>
            </p>

            <h3 className="text-sm font-medium mb-2 text-gray-400 uppercase">Help Center:</h3>
            <p className="text-xs text-gray-300">
              <a href="/help-center" className="text-[#2874f0]">
                Help Center
              </a>
            </p>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="py-4 px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-400 text-xs mr-4">Payment Methods:</span>
            <div className="flex space-x-2">
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"
                alt="Payment Methods"
                className="h-6"
              />
            </div>
          </div>
          <p className="text-gray-400 text-xs">&copy; {currentYear} Flipkart.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
