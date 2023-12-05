import { delay, http, HttpResponse } from 'msw';
import data from './data.json'
import { useParams } from 'react-router-dom';

const newProduct = http.post('/newproduct', () => {

})

const products = http.get('/products', async () => {
    await delay(1000)

    return HttpResponse.json(data)
})

const product = http.get('/product/:id', async () => {

    const { id } = useParams
    const dataById = data.filter((data) => data.id === id )

    return HttpResponse.json(dataById)
})

export default [
    newProduct,
    products,
    product
]