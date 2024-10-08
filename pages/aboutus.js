import Image from "next/image";
import Head from 'next/head';



export default function Home() {
  return (
    <>
      {/* <div>
        <head>
          <title>আমাদের সম্পর্কে</title>
        </head>
      </div> */}
      {/* lg:pt-[95px] md:pt-[90px] sm:pt-[85px] xs:pt-[80px] */}
      <div className=" text-black">
        <Head>
          <title>আমাদের সম্পর্কে</title>
        </Head>

        <section className="banner-sec-wrap">
          <div className="banner__bg__wrap relative w-full xl:h-[380px] lg:h-[380px] md:h-[360px] sm:h-[280px] xs:h-[250px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
            <h2 className=" absolute top-[50%] left-[50%] lg:text-[40px] md:text-[35px] sm:text-[33px] xs:text-[30px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">আমাদের কথা</h2>
          </div>
        </section>

        <section className="about__text__tp lg:py-[54px] md:py-[40px] sm:py-[40px] xs:py-[40px]">
          <div className="container">
            <div>
              <p className=" text-center text-gray-700 [word-spacing:8px] lg:text-[28px] xs:text-[20px]">
                লেখার পোকা  হলো কবিতা, গান, প্রবন্ধ গল্প এবং জীবনী লেখা প্রকাশের একটি ওয়েব <br />
                সাইট। যেটা অভিব্যক্তির একটি সুন্দর রূপ যা ব্যক্তিদের তাদের চিন্তাভাবনা, আবেগ এবং <br />
                অভিজ্ঞতা সৃজনশীল এবং শৈল্পিক উপায়ে প্রকাশ করতে দেয়। </p>
            </div>
          </div>
        </section>

        <section className="">
          <div className="container">
              <div className="about__content__wrap">
                <div className="about__img">
                  <img
                    // className="lg:h-[800px] md:h-[400px] sm:h-[400px] xs:h-[400px] "
                    alt="mission side image"
                    src="/images/aboutuspage/missionSideImage.png"
                  />
                </div>
                <div className="about__dsc">
                  <h3 className="text-[#F9A106] text-[48px]">মিশন</h3>
                  <div>
                    <hr className={` w-full  h-[0.5px] border-0 bg-[#F9A106]`} />
                  </div>
                  <p className="text-[#484848]  pt-[20px]">
                    লেখার পোকার &apos;কবিতা গল্প জীবনী নিয়ে মিশন&apos; হলো একটি আদর্শ,
                    একাংশিক বা পূর্ণসংখ্যানে কবিতা, গল্প, এবং জীবনী নিয়ে নির্ধারিত উদ্দেশ্য বা লক্ষ্য বা ধারণা।
                    এই মিশনের পেছনের উদ্দেশ্য মূলত কবিতা, গল্প, এবং জীবনীর মাধ্যমে নিম্নলিখিত
                    কিছু অংশে লক্ষ দেওয়া হয়:
                  </p>
                  <p className="text-[#484848] pt-1"><span className="text-[#F9A106]">সংস্কৃতি ও বৈচিত্র্য বিষয়ে চিন্তার অনুষ্ঠান:</span> কবিতা, গল্প, এবং জীবনী পড়ে সামাজিক এবং সাংস্কৃতিক সমস্যার উপর চিন্তা নিতে পারেন
                      এবং সমাধানের দিকে ভাবতে পারেন।</p>
                  <p className="text-[#484848] pt-1"><span className="text-[#F9A106]">ব্যক্তিগত বা সামাজিক পরিবর্তনে সাহায্য করা:</span> কবিতা, গল্প, এবং জীবনী ব্যক্তিগত ও সামাজিক পরিবর্তনে সাহায্য করতে পারে।।</p>
                  <p className="text-[#484848] pt-1"><span className="text-[#F9A106]">বিভিন্ন ভূমিকার সামনে আসা:</span>কবিতা, গল্প, এবং জীবনী মাধ্যমে বিভিন্ন ভূমিকার সামনে আসা যায়, যেমন পরিবার, সমাজ, রাষ্ট্র, সাংস্কৃতিক পরিবর্তন, সাহিত্য ইত্যাদি।</p>
                  <p className="text-[#484848] pt-1"><span className="text-[#F9A106]">উদ্দীপনা এবং প্রেরণা সৃষ্টি করা: </span>কবিতা, গল্প, এবং জীবনী মাধ্যমে অন্যের মধ্যে উদ্দীপনা এবং প্রেরণা সৃষ্টি করা যেতে পারে।।</p>
                  <p className="text-[#484848] pt-1"><span className="text-[#F9A106]">সাহিত্যিক উন্নতি: </span> কবিতা, গল্প, এবং জীবনী লেখার মাধ্যমে সাহিত্যিক উন্নতি করা যেতে পারে।।</p>
                  <p>কোনও কবিতা, গল্প, এবং জীবনীর মিশন সাধারণত কবির নিজস্ব পছন্দ এবং ধারণা অনুযায়ী পরিবর্তন করা যেতে পারে। এই মিশনের মাধ্যমে তারা তাদের লেখা বা সৃষ্টির মাধ্যমে সামাজিক ও সাংস্কৃতিক পরিবর্তনে সাহায্য করতে চান এবং আত্মপ্রকাশ করতে চান।
                    এবং আমাদের মিশন হচ্ছে এই লেখাগুলি প্রতি বছর বইমেলায় প্রদর্শন করা হবে</p>
                </div>
              </div>
          </div>
        </section>

        <section className="lg:my-[80px]">
          <div className="container">
            <div className="about__btm__wrap">

              <div className="about__btm__dsc">
                <div className="text-[#F9A106] text-[48px]">ভিশন</div>
                <div>
                  <hr className={` w-full  h-[0.5px] border-0 bg-[#F9A106]`} />
                </div>
                <p className="text-[#484848]  pt-[20px]">
                  লেখার পোকার &apos;কবিতা, গল্প, এবং জীবনী নিয়ে ভিশন&apos; হলো একটি প্রস্তাবনা বা ধারণা যেখানে এই তিনটি চরিত্রিত শৃঙ্খলা বা জীবনের আংশ নিয়ে নির্ধারিত উদ্দেশ্য বা
                  লক্ষ্য সেট করা হয়। এই ভিশনের মাধ্যমে প্রতিটি উপাদান কবিতা, গল্প, এবং জীবনীর মধ্যে নির্ধারিত উদ্দেশ্যের দিকে ধারণা করা হয়।
                </p>
                <p className="text-[#484848]  pt-1">
                  কবিতা, গল্প, এবং জীবনী নিয়ে ভিশন সম্পর্কে মাধ্যমে মনোনিবেশ করা হয় যে কবি বা লেখক যে ধরণের প্রভাব প্রত্যাশা করেন তা নিয়ে প্রকাশ করতে পারেন।
                  এটি তাদের লেখা বা সৃষ্টির মাধ্যমে সামাজিক, সাংস্কৃতিক বা ব্যক্তিগত পরিবর্তন সৃষ্টি করার উদ্দেশ্যে তাদের ধারণা এবং মূল্যায়ন প্রকাশ করা।
                </p>
                <p className="text-[#484848]  pt-1">
                  কবিতা নিয়ে ভিশন হতে পারে সমাজের বিভিন্ন দুর্গতি, দুঃখ, ক্ষোভ, মৌনতা ইত্যাদি নিয়ে সচেতন করা, সাহিত্যিক প্রচেষ্টা করা, এবং
                  প্রজন্মের মাঝে সাহিত্যিক সংস্কৃতির প্রচার ও বিকাশ করা।
                </p>
                <p className="text-[#484848]  pt-1">
                  গল্প নিয়ে ভিশন হতে পারে মানুষের মন জয় করে নেওয়া, অসাধারণ অভিজ্ঞতা বা অবদান নিয়ে মানুষকে ভাববে এবং প্রেরণা দিতে পারবে।
                </p>
                <p className="text-[#484848]  pt-1">
                  জীবনী নিয়ে ভিশন হতে পারে নিজের জীবনের অভিজ্ঞতা ও উদ্দেশ্য নিয়ে আলোচনা করা, আত্মবিশ্বাস বা মূল্যবান অভিজ্ঞতা সংগ্রহ করা।
                </p>
                <p className="text-[#484848]  pt-1">
                  এই মিশনের মাধ্যমে লেখক বা কবিরা তাদের লেখা বা সৃষ্টির মাধ্যমে মানুষের জীবনের একটি পরিবর্তন সৃষ্টি করতে চান। এটি অনেকের মধ্যে প্রেরণা এবং আত্মবিশ্বাস উত্পন্ন করতে পারে
                  এবং তাদের জীবনের মাধ্যমে সামাজিক ও সাংস্কৃতিক পরিবর্তন সৃষ্টি করতে সাহায্য করতে পারে।
                </p>
                <p className="text-[#484848]  pt-1">
                  আপনি একজন পাকা কবি হন বা সবেমাত্র শুরু করেন, কবিতা লেখা একটি পুরস্কৃত এবং সমৃদ্ধ সৃজনশীল অনুশীলন হতে পারে। এটি আপনাকে ভাষা এবং আবেগের গভীরতা অন্বেষণ করতে
                  দেয় যখন আপনার এবং আপনার পাঠক উভয়ের উপর একটি স্থায়ী ছাপ রেখে যায়।
                </p>
              </div>

              <div className="about__btm__img">
                <img
                      // className="lg:h-[700px] md:h-[400px] sm:h-[400px] xs:h-[400px]"
                      alt="mission side image"
                      src="/images/aboutuspage/vissionSideImage.png"
                    />
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
