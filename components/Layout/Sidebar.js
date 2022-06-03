import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router';

const Sidebar = () => {

    const router = useRouter()
    const [activelead, setActivelead] = useState(0);
    const path = router.pathname
    const leadType = [
        { id: 1, title: "All Employees", goto: '/dashboard' },
        { id: 2, title: "Pending Leads", goto: '/leads/all' },
        { id: 3, title: "Rejected leads", goto: '/leads/rejected' },
        { id: 4, title: "Accepted leads", goto: '/leads/accepted' },
    ];

    return (
        <div className="w-2/12 bg-white diff_lead">
            <ul className="w-full">
                {leadType.map((Ele) => {
                    return (
                        <Link
                            key={Ele.id}
                            href={Ele.goto}
                        >
                            <li
                                className="cursor-pointer"
                                onClick={() => setActivelead(Ele.id)}
                            >
                                <h3
                                    className={` ${path === Ele.goto ? "bg-prime-red text-white" : ""
                                        } `}
                                >
                                    {Ele.title}
                                </h3>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    )
}

export default Sidebar