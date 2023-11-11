import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#181818] text-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-2">Logo</h5>
            <p className="text-sm">
              The proper Footer on proper time can preserve you protection. We assist you make sure everybody forward.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-2">Quick Link</h5>
            <ul>
              <li className="mb-1"><a href="#" className="text-sm hover:underline">Home</a></li>
              <li className="mb-1"><a href="#" className="text-sm hover:underline">About Us</a></li>
              <li className="mb-1"><a href="#" className="text-sm hover:underline">Services</a></li>
              <li className="mb-1"><a href="#" className="text-sm hover:underline">Product</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-2">Blog</h5>
            <ul>
              <li className="mb-1"><a href="#" className="text-sm hover:underline">People Saying About Footer</a></li>
              <li className="mb-1"><a href="#" className="text-sm hover:underline">People Saying About Footer</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-2">Contact</h5>
            <p className="text-sm mb-1">44 Derry St, City, USA, 70-102</p>
            <p className="text-sm">[email protected]</p>
            <p className="text-sm">+1-555-655-6568</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;