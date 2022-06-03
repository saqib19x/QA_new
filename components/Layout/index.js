import React from 'react'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }) => {

    const router = useRouter()
    const path = router.pathname

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            <Toaster />
            {
                path !== '/' && <Navbar />
            }
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout