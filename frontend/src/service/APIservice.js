import axios from 'axios'
export default class APIservice  {

    // static updateUser = (user_id, body) => {
    //     return fetch(`http://127.0.0.1:8000/api/users/${user_id}`,{
    //         'method': 'PUT',
    //         headers: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': 'Token'
	// 		},
    //         body:JSON.stringify(body)

    //     }).then(res => res.json())
    // }

    static login= (body)=>{
        return axios.post('api/auth/login',body)
        // .then(res => res.json)
        
    }

    static logout = (body) => {
        return axios.post('api/auth/logout',body)
    }

    static register = (body) => {

    }

    static homeUser = (body) => {
        return axios.get('api/users',body)

    }

    
}

