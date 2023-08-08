import {BACKEND_URL} from "../configuration/PasswordlessOptions";

export default class YourBackendClient {
    async register(user, firstName, lastName, deviceName) {
        const request = {
            username: user,
            firstName: firstName,
            lastName: lastName,
            deviceName: deviceName
        };

        const response = await fetch(`${BACKEND_URL}/signup`, {
            method: 'post',
            body: JSON.stringify(request),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const problemDetails = await response.json();
            if (problemDetails && problemDetails.detail) {
                throw new Error(problemDetails.detail);
            } else {
                throw new Error(`An unknown error prevented us from obtaining a registration token.`);
            }
        }

        return await response.json();
    }

    async signIn(token) {
        return await fetch(`${BACKEND_URL}/signin?token=${token}`).then(r => r.json());
    }
}