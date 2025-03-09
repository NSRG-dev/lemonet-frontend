import axios from 'axios'

export const getBanner = async () => {
	const response = await axios.get('http://localhost:3000/api/banners')
	console.log('Banner:', response.data)
	const data = await response.data
	return data
}
