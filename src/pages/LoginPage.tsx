import {useEffect, useRef, useState} from "react";
import * as Passwordless from "@passwordlessdev/passwordless-client";
import YourBackendClient from "../services/your-backend/YourBackendClient.ts";
import UserLoginRequest from "../services/your-backend/contracts/UserLoginRequest.ts";

export default function LoginPage() {
    const aliasRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);
    const [errMsg, setErrMsg] = useState("");
    const [alias, setAlias] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [alias]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const passwordless = new Passwordless.Client({
            apiUrl: import.meta.env.VITE_PASSWORDLESS_API_URL!,
            apiKey: import.meta.env.VITE_PASSWORDLESS_API_KEY!
        });
        const yourBackendClient = new YourBackendClient()
        let token = null;
        if (alias !== "") {
            token = await passwordless.signinWithAlias(alias);
        } else {
            token = await passwordless.signinWithDiscoverable();
        }
        if (!token) {
            return;
        }
        const loginRequest: UserLoginRequest = {
            token: token.token!
        }

        // Pass the token to your backend to verify the user's identity
        const verifiedToken = await yourBackendClient.login(loginRequest);

        // Your backend should return a token that is familiar to your frontend. For example, if you were previously
        // using JWT, you could return a JWT token here.
        localStorage.setItem('token', verifiedToken.jwtToken);

        // We successfully logged in, so redirect to the profile page
        window.location.href = "/profile";
    }

    return (
        <section>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1>Sign In</h1>
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
            <button onClick={handleSubmit}>Sign In</button>
        </section>
    );
}