import {useEffect, useState} from "react";
import useAuth from "../hooks/useAuth";

export default function UserPage() {
    const auth = useAuth();
    const [username, setUsername] = useState(null); // Initial state for username

    useEffect(() => {
        const fetchUsername = async () => {
            setUsername(auth.auth.username);
        };

        fetchUsername();
    }, [auth]);

    return (
        <section>
            {username ? (
                <p>Congrats, you're a {username}.</p>
            ) : (
                <p>Loading username...</p>
            )}
        </section>)
}
