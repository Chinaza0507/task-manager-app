import React from 'react';
import {Mail, Lock, ArrowRight} from 'lucide-react';

export default function LoginPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-[#F3EAFA] px-[24px] py-[48px]'>
        <div className='flex w-full max-w-[1100px] min-h-[776px] rounded-[40px] overflow-hidden shadow-2xl'>
            <div className='hidden md:block w-[45%]  bg-[#885AA8]'> {/* FOR THE LEFT SIDE */}
            </div>

            <div className='w-full md:w-[55%] p-20 flex flex-col flex-start justify-center bg-white '>
                <div className='max-w-md w-full mx-auto'>
                    <h1 className='text-[30px] font-normal text-black gap-2'>Welcome back</h1>
                    <p className='text-[16px] font-normal text-[#5A5A5A] mb-10'>Enter your details to access your workspace.</p>
                    <div className=''>

                    </div>





                </div>


            </div>

        </div>

    </main>

);
}