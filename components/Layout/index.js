import React from 'react'
import { useRouter } from 'next/router'
import Navbar from './Navbar'

const Layout = ({ children }) => {

    const router = useRouter()
    const path = router.pathname

    return (
        <div>
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