import {useEffect, useRef, useState} from "react";
import * as Passwordless from "@passwordlessdev/passwordless-client";
import {PASSWORDLESS_API_KEY, PASSWORDLESS_API_URL} from "../configuration/PasswordlessOptions";
import { ToastContainer, toast } from 'react-toastify';
import YourBackendClient from "../services/YourBackendClient";

export default function RegisterPage() {
    const usernameRef = useRef();
    const aliasRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [alias, setAlias] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        usernameRef.current.focus();
    }, []);


    useEffect(() => {
        setErrMsg("");
    }, [username]);

    const handleSubmit = async (e) => {
        let registerToken = null;
        try {
            const yourBackendClient = new YourBackendClient();
            registerToken = await yourBackendClient.register(username, alias);
        }
        catch (error)
        {
            toast(error.message, {
                className: 'toast-error'
            });
        }

        // If an error previously happened, 'registerToken' will be null, so you don't want to register a token.
        if (registerToken) {
            const p = new Passwordless.Client({
                apiKey: PASSWORDLESS_API_KEY,
                apiUrl: PASSWORDLESS_API_URL
            });
            const finalResponse = await p.register(registerToken.token);

            if (finalResponse) {
                toast(`Registered '${username}'!`);
            }
        }
    };

    return (
        <>
            <section>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Register</h1>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    aria-describedby="uidnote"
                />
                <label htmlFor="alias">Alias:</label>
                <input
                    type="text"
                    id="alias"
                    ref={aliasRef}
                    autoComplete="off"
                    onChange={(e) => setAlias(e.target.value)}
                    value={alias}
                    required
                    aria-describedby="uidnote"
                />
                <button onClick={handleSubmit}>Register</button>
                <p>Already registered?</p>
                <ToastContainer />
            </section>
        </>
    );
}
