import axios from '../../interceptor/axios.config'
export const fetchProducts = async () => {
    const data = await axios.get('/products');
    console.log(data.data)

    return data.data
}