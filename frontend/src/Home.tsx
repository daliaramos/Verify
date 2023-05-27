import {useEffect, useState} from "react";
import axios from "axios";

export const Home = () => {
    return (
        <div>
            <h1>Verify</h1>
            <h3>Share you experience with others about the interview process at a company.</h3>
        </div>
    );
};


/*

export const Button = () => {
    return(
        <button onClick={() => {
            alert("clicked")
        }
        }>
            Review a Company
        </button>
    )
}


export const UsersList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async() => {
            const usersRes = await axios.get("http://localhost:8080/users");
            return usersRes.data;
        };

        getUsers().then(setUsers);
    }, []);

    return (
        <div>
            <h2>Users:</h2>
            {
                users ?
                    <ul>
                        {users.map((user: {email: string, name: string, occupation:string }) =>
                            <li key={user.email.toString()}> {user.name} - {user.email} - {user.occupation}</li>)
                        }
                    </ul>
                    :
                    null
            }
        </div>
    )
}
*/
