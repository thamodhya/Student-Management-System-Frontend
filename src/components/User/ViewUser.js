import React, { useEffect, useState } from 'react';
 
import Delete from './DeleteUser';
import Appbar from '../AppBar';

 

export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/user/users")
        .then(res => res.json())
        .then((result) => {
            setUsers(result);
        });
    }, []);

     
    return (
        <div>
            <Appbar />
            <div className="container">
                 
                <h1>Users</h1>
                {users.map(user => (
                    <div className="card" style={paperStyle} key={user.id}>
                        <div className="card-body">
                            <p>Id: {user.userId}</p>
                            <p>Name: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Country: {user.country}</p>
                            <p>Address: {user.useraddress}</p>
                            <p>Gender: {user.gender}</p>
                            <div class='col-lg-12'>
                                 
                                <div>
                                    <Delete key={user.id} user={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}