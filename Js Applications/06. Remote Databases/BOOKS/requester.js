const username = 'Kiril';
const password = 'Kiro';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_ry10jhRsr';
const appSecret = '3b2f2451f8fa4ec6bfc713d927a26952';

function makeHeaders(httpMethod, data){
    const headers = {
        method: httpMethod,
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        }
    };
    if(httpMethod==='POST'|| httpMethod === 'PUT'){
        headers.body = JSON.stringify(data);
    }
    return headers;

}
function handleError(e){
    if(!e.ok){
        throw new Error(e.statusText);
    }
    return e;
}
function serializeData(x){
    x.json();
}
function fetchData(kinveyModule, endpoint, headers){
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;
    return fetch(url, headers)
    .then(handleError)
    .then(serializeData);
}

export function get(kinveyModule, endpoint){
    const headers = makeHeaders('GET');
    
    return fetchData(kinveyModule,endpoint,headers);
}

export function post(kinveyModule,endpoint,data){
    const headers = makeHeaders('POST', data);
    return fetchData(kinveyModule, endpoint,headers);
}

export function put(kinveyModule,endpoint,data){
    const headers = makeHeaders('PUT', data);
    return fetchData(kinveyModule,endpoint,headers);
}

export function del(kinveyModule,endpoint){
    const headers = makeHeaders('DELETE');

    return fetchData(kinveyModule,endpoint,headers);

}