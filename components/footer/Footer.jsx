"use client";
import React, { useState } from "react";
import Link from "next/link";

import Logo from "../common/Logo";
import FooterLink from "./FooterLink";
import SocialLink from "./SocialLink";

const MyFooter = () => {

  return (
    <div className={`bg-black pt-[65px]`}>

      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ftr__main__content">

                <ul className="reset-list clearfix">

                  <li>

                    <div className="ftr__logo">
                      <Logo
                        icon="/images/image.png"
                        width={202}
                        height={70}
                        alt="footer logo"
                      />
                    </div>

                  </li>

                  <li>

                    <div className="text-white font-kongsa-Mj ">
                      <FooterLink
                        title="গুরুত্বপূর্ণ লিঙ্ক"
                        links={[
                          { url: "/golpo", label: "গল্প" },
                          { url: "/kobita", label: "কবিতা" },
                          { url: "/probondho", label: "প্রবন্ধ" },
                        ]}
                      />
                    </div>

                  </li>

                  <li>

                    <div className="text-white">
                      <FooterLink
                        title="গুরুত্বপূর্ণ লিঙ্ক"
                        links={[
                          { url: "/privacypolicy", label: "প্রাইভেসি" },
                          { url: "/termsandconditions", label: "শর্তাবলি" },
                          { url: "/aboutus", label: "আমাদের সম্পর্কে" },
                        ]}
                      />
                    </div>

                  </li>

                  <li>

                    <div className="text-white">
                      <FooterLink
                        title="যোগাযোগ"
                        links={[
                          { url: "", label: "ফোনঃ +৮৮০ ১৩৬৫৪৭৬৫৪" },
                          { url: "", label: "ইমেইলঃ info@live-technologies.net" },
                          { url: "", label: "ঠিকানাঃ ধানমন্ডি, ঢাকা"},
                        ]}
                      />
                    </div>

                  </li>

                  <li>

                    <div className="ftr__socail__icon text-white lg:pl-[90px] md:pl-0 sm:pl-0 xs:pl-0">
                      <SocialLink
                        title="Social"
                        links={[
                          { label: "/images/footer/fb.svg", url: 'https://www.facebook.com/lekharpoka' }
                        ]}
                      />
                    </div>

                  </li>

                </ul>

              </div>

              <div className="ftr__btm text-white text-center">
                <p>© ২০২৪ লেখারপোকা | সমস্ত অধিকার সংরক্ষিত</p>
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default MyFooter;
