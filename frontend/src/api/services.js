import api from '.'

const ENDPOINT = {
    ACCOUNT: '/accounts'
}

const getAllAccount = async () => {
    try {
        const res = await api.get("/accounts")
        // console.log(res)
        return res
    } catch (error) {
        console.error(error)
        throw Error(error)
    }
}

const getSelectedAccount = async (slug) => {
    try {
        // console.log(`${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`)
        const res = await api.get(`${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`)
        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
        throw Error(error)
    }
}

export {getAllAccount, getSelectedAccount}