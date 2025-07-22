import { userService } from "./userService.js";

async function requestAsync(method, url, data) {
    let options = {
        method,
        headers: {}
    };

    if (data != undefined && data != null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let accessToken = userService.getUserAccessToken();
    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    let response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`${error.code}: ${error.message}`);
    }

    if (response.status === 204) {
        // This is when we logout
        return response;
    }

    return await response.json();
}

async function getAsync(url) {
    return await requestAsync('GET', url);
}

async function postAsync(url, data) {
    return await requestAsync('POST', url, data);
}

async function putAsync(url, data) {
    return await requestAsync('PUT', url, data);
}

async function deleteAsync(url) {
    return await requestAsync('DELETE', url);
}

export const request = {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
};