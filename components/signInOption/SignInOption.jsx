

export default function SignInOption({ title, icon1, icon2, icon3, lowermessege1, lowermessege2, classProperty, signLogLink }) {
    return (
        <>

            {icon1?.length && <div
                className=" w-[270px] my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p
                    className="mx-4 mb-0 text-center text-xs">
                    {title}
                </p>
            </div>
            }


            {icon1?.length &&
                <div className="flex place-content-center justify-center">
                    <button
                        // className="mb-3 flex  w-[67px] h-[43px] items-center justify-center rounded leading-normal  shadow-primary-3 transition duration-150 ease-in-out hover:bg-yellow-400 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        className="flex border border-solid rounded-md shadow-md p-1 py-[9px] px-[5px]"
                    // onClick={() => signIn('google')}
                    >
                        <img
                            src={icon1}
                            width={300}
                            height={300}
                            alt="fac"
                            className="w-[44px] h-[22px]"
                        />

                    </button>
                </div>
                // <div className="pt-4 flex space-x-6 pl-6">


                //      <a
                //         className={`${classProperty} `} href="#!"
                //         role="button"
                //         data-twe-ripple-init
                //         data-twe-ripple-color="light">
                //         <img
                //             src={icon2}
                //             width={300}
                //             height={300}
                //             alt="fac"
                //             className="w-[44px] h-[22px]"
                //         />
                //     </a>

                //     <a
                //         className={`${classProperty} `} href="#!"
                //         role="button"
                //         data-twe-ripple-init
                //         data-twe-ripple-color="light">
                //         <img
                //             src={icon3}
                //             width={300}
                //             height={300}
                //             alt="fac"
                //             className="w-[44px] h-[22px]"
                //         />
                //     </a> 
                //  </div> 
            }
            <div className="flex space-x-3 pt-5 items-center justify-center">
                <p className=" text-gray-500">{lowermessege1}</p> <a className=" text-black font-semibold text-lg" href={signLogLink}>{lowermessege2}</a>
            </div>
        </>

    );
}