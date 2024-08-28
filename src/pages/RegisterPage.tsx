import {useEffect, useRef, useState} from "react";
import * as Passwordless from "@passwordlessdev/passwordless-client";
import { ToastContainer, toast } from 'react-toastify';
import YourBackendClient from "../services/your-backend/YourBackendClient";
import UserRegisterRequest from "../services/your-backend/contracts/UserRegisterRequest.ts";

export default function RegisterPage() {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const aliasRef = useRef<HTMLInputElement>(null);
    const errRef = useRef(null);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [alias, setAlias] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        usernameRef.current!.focus();
    }, []);


    useEffect(() => {
        setErrMsg("");
    }, [username]);

    const handleSubmit = async () => {
        let registerToken = null;
        try {
            const yourBackendClient = new YourBackendClient();
            const registerRequest: UserRegisterRequest = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                alias: alias
            };
            registerToken = await yourBackendClient.register(registerRequest);
        }
        catch (error: unknown)
        {
            if (error instanceof Error) {
                toast(error.message, {
                    className: 'toast-error'
                });
            }
        }

        // If an error previously happened, 'registerToken' will be null, so you don't want to register a token.
        if (registerToken) {
            const p = new Passwordless.Client({
                apiKey: import.meta.env.VITE_PASSWORDLESS_API_KEY!,
                apiUrl: import.meta.env.VITE_PASSWORDLESS_API_URL
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
                <div className="form-control">
                    <label htmlFor="first-name">First Name:</label>
                    <input
                        type="text"
                        id="first-name"
                        ref={firstNameRef}
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                        aria-describedby="uidnote"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="last-name">Last Name:</label>
                    <input
                        type="text"
                        id="last-name"
                        ref={lastNameRef}
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                        aria-describedby="uidnote"
                    />
                </div>
                <div className="form-control">
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
                </div>
                <div className="form-control">
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
                </div>
                <button onClick={handleSubmit}>Register</button>
                <p>Already registered?</p>
                <ToastContainer/>
            </section>
        </>
    );
}
