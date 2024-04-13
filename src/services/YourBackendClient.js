import {BACKEND_URL} from "../configuration/PasswordlessOptions";

export default class YourBackendClient {
    async register(user, alias) {
        const request = {
            username: user,
            alias: alias
        };

        const response = await fetch(`${BACKEND_URL}/auth/register`, {
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
      const request = {
          token: token
      };

      const response = await fetch(`${BACKEND_URL}/auth/login`, {
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
}
