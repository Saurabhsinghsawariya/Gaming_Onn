import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
import { Logo } from "../assets/Images/Image";
import { footerLinks } from "../constant/Constant";

const Footer: React.FC = () => {
  return (
    <section className="w-full pt-16 bg-[#070B1D] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <img
            src={Logo}
            alt="logo"
            className="object-contain w-32 sm:w-40"
          />
          <div className="flex items-center justify-between bg-[#292945] rounded-2xl px-3 py-3 w-full sm:w-96">
            <input
              type="text"
              className="rounded-lg bg-transparent focus:outline-none text-white w-full"
              placeholder="Email address"
            />
            <span className="bg-[#596AFE] p-2 rounded-full cursor-pointer">
              <FiChevronRight className="text-lg text-white" />
            </span>
          </div>
        </div>

        <hr className="border border-[#21232e] my-8" />

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex flex-col flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold max-w-sm">
              Get updates on your favourite games
            </h1>
            <div className="flex items-center space-x-4 py-6">
              <h1 className="text-base sm:text-lg font-medium">
                Ready to explore?
              </h1>
              <button className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white text-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-10">
            {footerLinks.map((link, index) => (
              <div key={index} className="w-40">
                <h4 className="text-xl font-medium mb-4">{link.title}</h4>
                <ul>
                  {link.links.map((section, index) => (
                    <li
                      key={index}
                      className="mt-2 text-base hover:text-gray-400 cursor-pointer"
                    >
                      {section.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="border border-[#21232e] my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <h3 className="text-base font-medium cursor-pointer hover:text-gray-400">
              Terms & Conditions
            </h3>
            <h3 className="text-base font-medium cursor-pointer hover:text-gray-400">
              Privacy Policy
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <FaFacebookF
              className="text-[#5F627E] text-xl cursor-pointer hover:text-white"
              aria-label="Facebook"
            />
            <FaTwitter
              className="text-[#5F627E] text-xl cursor-pointer hover:text-white"
              aria-label="Twitter"
            />
            <FaInstagram
              className="text-[#5F627E] text-xl cursor-pointer hover:text-white"
              aria-label="Instagram"
            />
          </div>
        </div>

        {/* Developer Section */}
        <div className="text-center mt-8">
          <a
            className="text-lg font-semibold hover:underline"
                    >
            Developed By:
          </a>
          <p>Saurabh Singh, Sahil Sharma, Pushpender, Salman Khan</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;