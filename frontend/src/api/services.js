import api from '.'

const ENDPOINT = {
    ACCOUNT: '/account'
}

const getAllAccount = async () => {
    try {
        const res = await api.get(ENDPOINT.ACCOUNT)
        return res
    } catch (error) {
        throw Error(error)
    }
}

export {getAllAccount}