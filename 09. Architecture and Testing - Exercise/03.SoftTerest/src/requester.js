import { userUtils } from "./userData.js";

async function requester(method, url, body) {
    let options = {
        method: method,
        headers: {}
    }

    let accessToken = userUtils.getUserAccessToken();

    if (body != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    if (accessToken != undefined) {
        options.headers['X-Authorization'] = accessToken;
    }

    let response = await fetch(url, options);

    if (!response.ok || response.status != 200) {
        let error = response.json();
        throw new Error(error);
    }

    return response.json();
}

async function getAsync(url) {
    return await requester('GET', url);
}

async function postAsync(url, body) {
    return await requester('POST', url, body);
}

async function putAsync(url, body) {
    return await requester('PUT', url, body);
}

async function deleteAsync(url) {
    return await requester('DELETE', url);
}

export const request = {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
}