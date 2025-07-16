import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 bg-white text-center text-gray-500 text-sm border-t">
      &copy; {new Date().getFullYear()} Feedbacker.io — All rights reserved.
    </footer>
  );
};

export default Footer;
