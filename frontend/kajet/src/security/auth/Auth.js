import axios from 'axios'

const url = 'http://localhost:4000/auth';

export async function logIn({email, password}) {
    let res = new Promise((resolve, reject) => {
        axios.post(`${url}/login`, {
            email, password
        }).then(res => {
            if(res.status === 200 && res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                resolve(true);
            }
            else if (res.data.msg === "DATA IS NOT CORRECT"){
                resolve(false)
            }
        }).catch(err => reject(err))
    });

    return await res.then(data => data)
}


export async function checkIfUserIsLoggedIn() {
    const token = localStorage.getItem('authToken');

    if(token === null) return false;

    return await axios.post(`${url}/tokenvalidity`, {token}).then(res => res.data.status);
}


export async function joinUp({name, email, password}){
    return await axios.post(`${url}/joinup`, {name, email, password})
            .then(res => res)
            .catch(err => alert(err));
}

export async function checkEmail(email){
    return await axios.post(`${url}/checkemail`, {
        data: { email }
    }).then(res => res.data.status ).catch(err => alert(err));
}

export function logOut(){
    localStorage.removeItem('authToken');
}
