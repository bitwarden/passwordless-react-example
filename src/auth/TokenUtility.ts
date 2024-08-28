import JwtToken from "./JwtToken.ts";

export function decodeJwt(jwtToken: string): JwtToken {
    const base64Url: string = jwtToken.split('.')[1];
    const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload: string = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function isTokenExpired(token: string): boolean {
    try {
        const decodedToken = decodeJwt(token);
        if (decodedToken.exp) {
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        }
        return false;
    } catch (error) {
        // Handle error if token is invalid
        console.error('Invalid token:', error);
        return true;
    }
}