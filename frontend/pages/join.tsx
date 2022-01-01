import type { NextPage } from 'next';
import Head from 'next/head';

const Join: NextPage = () => {

    return (
        <>
            <Head>
                <title>Tolfix | Contribution - Join</title>
                <meta name="description" content="Join Tolfix Contribution Program free today at Tolfix!" />
            </Head>

            <div className='flex items-center justify-center h-screen'>
                {/* Form request to join contribution program */}
                {/* Needs email, name and a button to accept ToS or smth */}
                <div className='w-full max-w-md'>
                    <form action='/api/v1/join' method='POST' className='bg-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input name='email' required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' placeholder='Email' />
                        </div>
                        <div className='mb-6'>
                            <label className="flex items-center">
                                <input required type="checkbox" className="rounded shadow" />
                                <span className="ml-2">I agree to the <span className="underline">privacy policy</span></span>
                            </label>
                        </div>
                        {/* Button to accept tos */}
                        <div className='flex items-center justify-between'>
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                Join
                            </button>
                        </div>
                    </form>
                </div>                
            </div>
        
        </>
    )

};

export default Join;