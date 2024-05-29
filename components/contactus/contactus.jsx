import Image from "next/image";
import ContactForm from "./contactForm";

export default function ContactUs() {

    const locationIcon = '/images/svgs/location.svg';
    const phoneIcon = '/images/svgs/phone.svg';
    const emailIcon = '/images/svgs/email.svg';

    return (
        <div className="flex flex-col pt[115px]">

            <section>
                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">যোগাযোগ</h2>
                </div>
            </section>

            <section>

                <div className="container">

                    <div className="row">

                        <div className="col-md-12">

                            <div className="contect__frm__wrap flex flex-row space-x-5 place-content-center py-[110px]">
                                
                                <div className="contect__frm_left space-y-5">

                                    <div>
                                        <p className="lg:text-[48px] md:text-[44px] sm:text-[40px] xs:text-[36px] text-[#F9A106]">যোগাযোগ করুন</p>
                                    </div>

                                    <div className="flex flex-row space-x-2">

                                        <Image
                                            src={locationIcon}
                                            width={20}
                                            height={20}
                                            alt="location"
                                        />
                                        <p className="text-[18px] text-black">১৩/২ ওয়েস্ট পান্থপথ, ধানমন্ডী, ঢাকা</p>

                                    </div>

                                    <div className="flex flex-row space-x-2">
                                       
                                        <Image
                                            src={phoneIcon}
                                            width={20}
                                            height={20}
                                            alt="phone"
                                        />
                                        <p className="text-[18px] text-black">+৮৮০ ১৩৬৫৪৭৬৫৪</p>

                                    </div>

                                    <div className="flex flex-row space-x-2">
                                      
                                        <Image
                                            src={emailIcon}
                                            width={20}
                                            height={20}
                                            alt="email"
                                        />
                                        <p className="text-[18px] text-black">info@live-technologies.net</p>

                                    </div>

                                    <div>

                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8688026525037!2d90.37671587608591!3d23.752057488711426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ade3e6697b%3A0x28217340a90afceb!2sLive%20Technologies%20Limited!5e0!3m2!1sen!2sbd!4v1710833128537!5m2!1sen!2sbd"
                                            width="100%"
                                            height="293"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="rounded-3xl"
                                        >

                                        </iframe>

                                    </div>

                                </div>

                                <div className="contect__frm_right">
                                    <ContactForm />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
}