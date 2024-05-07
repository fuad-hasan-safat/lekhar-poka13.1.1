import React from 'react';
import Head from 'next/head';
import OtpPage from '../../components/otp/otppage';

const otp = () => {
    return (
        <div>
            <Head>
                <title>ওটিপি</title>
            </Head>
            <div className="items-center justify-center ">
                <OtpPage />
            </div>
        </div>
    );
};

export default otp;