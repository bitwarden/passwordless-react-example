import {useEffect, useState} from "react";
import useAuth from "../hooks/UseAuth";

export default function ProfilePage() {
    const auth = useAuth();
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const fetchUsername = async () => {
            setUsername(auth.session?.username);
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
