import {useContext, useEffect, useRef, useState} from "react";
import authContext from "../context/AuthProvider";
import * as Passwordless from "@passwordlessdev/passwordless-client";
import YourBackendClient from "../services/YourBackendClient";
import {PASSWORDLESS_API_KEY, PASSWORDLESS_API_URL} from "../configuration/PasswordlessOptions";


export default function LoginPage() {
    const aliasRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const { setAuth }  = useContext(authContext);
    const [alias, setAlias] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [alias]);

    const decodeJwt = (jwtToken) => {
        let base64Url = jwtToken.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordless = new Passwordless.Client({
            apiUrl: PASSWORDLESS_API_URL,
            apiKey: PASSWORDLESS_API_KEY
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
        const verifiedToken = await yourBackendClient.signIn(token.token);
        localStorage.setItem('jwt', verifiedToken.jwtToken);
        const decoded = decodeJwt(verifiedToken.jwtToken);
        setAuth({
            jwt: verifiedToken.jwtToken,
            userid: decoded.nameid,
            username: decoded.unique_name});
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>{/* <a href="#">Go to Home</a> */}</p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
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
                    <button onClick={handleSubmit}>Sign In</button>
                </section>
            )}
        </>
    );
}
