import React, { useState, useEffect } from 'react'
import UserItem from './UserItem';

function Users({user}) {

    const [users, setUsers] = useState([]);
    const [sort, setSort] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/users',
        {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        )
            .then(res => res.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.log("Error fetching users: ", error);
              });
    }, []);

  return (
    <div>
        <h2 className='pb-6 text-[#F9500D] text-2xl font-bold text-center'>Users List</h2>
        {/* Users Table */}
        <div className='px-3 py-4 flex justify-center'>
            <table className="w-full bg-white shadow-md rounded mb-4 text-base">
                <thead>
                    <tr className='border-b'>
                        <th className="text-left p-3 px-5">Username : </th>
                        <th className="text-left p-3 px-5">Email:</th>
                        <th className="text-left p-3 px-5">Role</th>
                        {/* <th className="text-left p-3 px-5">Articles</th> */}
                        <th className="text-left p-3 px-5">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) => (
                            <UserItem  key={index} 
                                username={item.username} 
                                email={item.email}
                                role={item.role}
                                // articles={item.articles} 
                                id={item.id}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users