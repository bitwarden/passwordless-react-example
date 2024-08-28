import UserLoginRequest from "./contracts/UserLoginRequest.ts";
import UserRegisterRequest from "./contracts/UserRegisterRequest.ts";
import VerifiedUserResponse from "./contracts/VerifiedUserResponse.ts";
import RegisterTokenResponse from "./contracts/RegisterTokenResponse.ts";
import CredentialResponse from "./contracts/CredentialResponse.ts";

export default class YourBackendClient {
    private readonly backendUrl: string;

    constructor() {
        this.backendUrl = import.meta.env.VITE_BACKEND_URL!
    }

    async login(request: UserLoginRequest): Promise<VerifiedUserResponse> {
        const response = await fetch(`${this.backendUrl}/auth/login`, {
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

    async register(request: UserRegisterRequest): Promise<RegisterTokenResponse> {
        const response = await fetch(`${this.backendUrl}/auth/register`, {
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

    async getCredentials(userId: string): Promise<CredentialResponse[]> {
      const token: string = localStorage.getItem('token')!;
      const response = await fetch(`${this.backendUrl}/users/${userId}/credentials`, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
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

      const data = await response.json();

      const credentials: CredentialResponse[] = data.map((item: any) => {
        return {
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt + 'Z') : undefined,
        };
      });

      return credentials;
    }
}
