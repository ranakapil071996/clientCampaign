import Axios from "axios";

const baseUrls = {
    main: "https://servertest071996.herokuapp.com/"
}

const commonHeader = {}

export const axiosClient = Axios.create({
    baseURL: baseUrls.main,
    timeout: 10000,
    headers: commonHeader
})
