import axios from 'axios';

const URL = process.env.URL || 'https://api.github.com/'
const userToken = process.env.token || 'b4e08ac9cb742964f4740eaced1747a61c14d24b'

const axiosInstance = axios.create({
	baseURL: URL,
	timeout: 10000,
})

const setToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `token ${userToken}`
}

const clearToken = () => {
    delete axiosInstance.defaults.headers['Authorization']
}

const getGithubAPI = async (token: string) => {
    try {
        return axios.get(URL, {
            headers: {
                Authorization: `token ${token}`
            }
        })
    } catch (e) {
        throw e
    }
}

const getUsers = async (since: number) => {
    try {
        return await axiosInstance.get(`users?since=${since}`)
    } catch (e) {
        throw e
    }
}

const getUserDetail = async (username: string) => {
    try {
        return await axiosInstance.get(`/users/${username}`)
    } catch (e) {
        throw e
    }
}

const getUserRepos = async (username: string) => {
    try {
        return await axiosInstance.get(`/users/${username}/repos`)
    } catch (e) {
        throw e
    }
}

export {
    setToken,
    clearToken,
    getGithubAPI,
    getUsers,
    getUserDetail,
    getUserRepos
}
