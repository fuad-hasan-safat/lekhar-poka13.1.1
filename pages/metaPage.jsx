import Head from 'next/head'
import React from 'react'

export default function MetaPage() {
  return (

    <>
      <Head>
        <meta property="og:title" content="মেটা পেইজ" />
        <meta property="og:description" key="og:description" content=" লেখার পোকা  হলো কবিতা, গান, প্রবন্ধ গল্প এবং জীবনী লেখা প্রকাশের একটি ওয়েব সাইট। যেটা অভিব্যক্তির একটি সুন্দর রূপ যা ব্যক্তিদের তাদের চিন্তাভাবনা, আবেগ এবং অভিজ্ঞতা সৃজনশীল এবং শৈল্পিক উপায়ে প্রকাশ করতে দেয়। " />
        <meta property="og:image" content='https://lekharpoka.com/lekharPokaPreviewImage/lekharpokabanner.jpg' />
        <meta property="og:url" content="https://lekharpoka.com/" key="og:url" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="https://lekharpoka.com/lekharPokaPreviewImage/lekharpokabanner.jpg" />
        <meta name="twitter:title" content="লেখার পোকা" />
        <meta name="twitter:description" content=" লেখার পোকা  হলো কবিতা, গান, প্রবন্ধ গল্প এবং জীবনী লেখা প্রকাশের একটি ওয়েব সাইট। যেটা অভিব্যক্তির একটি সুন্দর রূপ যা ব্যক্তিদের তাদের চিন্তাভাবনা, আবেগ এবং অভিজ্ঞতা সৃজনশীল এবং শৈল্পিক উপায়ে প্রকাশ করতে দেয়। " />
        <meta name="twitter:image" content='https://lekharpoka.com/lekharPokaPreviewImage/lekharpokabanner.jpg' />
      </Head>
      <div>
        <p className='text-black pt-[100px]'>Hello</p>
      </div>
    </>

  )
}
export async function getServerSideProps() {
  return { props: {} };
}