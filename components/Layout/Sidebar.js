import Link from 'next/link';
import React, { useState } from 'react'

const Sidebar = () => {

    const [activelead, setActivelead] = useState(0);

    const leadType = [
        { id: 1, title: "All Employees", goto: '/leads/all' },
        { id: 2, title: "All Leads", goto: '/leads/all' },
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
                                    className={` ${activelead == Ele.id ? "bg-prime-red text-white" : ""
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