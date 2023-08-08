import {useContext, useRef, useState} from "react";
import authContext from "../context/AuthProvider";
import * as Passwordless from "@passwordlessdev/passwordless-client";
import YourBackendClient from "../services/YourBackendClient";
import {PASSWORDLESS_API_KEY, PASSWORDLESS_API_URL} from "../configuration/PasswordlessOptions";

export default function LoginPage() {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const { setAuth }  = useContext(authContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordless = new Passwordless.Client({
            apiUrl: PASSWORDLESS_API_URL,
            apiKey: PASSWORDLESS_API_KEY
        });
        const yourBackendClient = new YourBackendClient()
        const token = await passwordless.signinWithDiscoverable();
        if (!token) {
            return;
        }
        const verifiedToken = await yourBackendClient.signIn(token.token);
        localStorage.setItem('jwt', verifiedToken.jwt);
        setAuth({ verifiedToken });
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
                    <button onClick={handleSubmit}>Sign In</button>
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
              <a href="#">Sign Up</a>
            </span>
                    </p>
                </section>
            )}
        </>
    );
}