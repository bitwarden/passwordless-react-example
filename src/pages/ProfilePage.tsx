import {useEffect, useState} from "react";
import useAuth from "../hooks/UseAuth";
import CredentialResponse from "../services/your-backend/contracts/CredentialResponse.ts";
import YourBackendClient from "../services/your-backend/YourBackendClient.ts";

export default function ProfilePage() {
    const auth = useAuth();
    const [username, setUsername] = useState<string>();
    const [credentials, setCredentials] = useState<CredentialResponse[]>();

    useEffect(() => {
        const fetchUsername = async () => {
            setUsername(auth.session?.username);
        };

        const fetchCredentials = async () => {
            const backend = new YourBackendClient();
            try {
                const response = await backend.getCredentials(auth.session!.userId!);
                setCredentials(response);
            } catch (e) {
                console.error(e);
            }
        }

        fetchUsername();
        fetchCredentials();
    }, [auth]);

    return (
        <section>
            <p>Hi {username}!</p>
            <h1>Credentials</h1>
            <ul>
                {credentials?.map((credential, index) => (
                    <li key={index}>
                        <p>Country: {credential.country}</p>
                        <p>Device: {credential.device}</p>
                        <p>Created at: {credential.createdAt?.toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </section>)
}
