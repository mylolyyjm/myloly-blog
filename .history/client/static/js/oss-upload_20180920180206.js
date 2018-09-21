import axios from 'axios';
export default () => {
    axios.post('/api/getOssSign').then(res => {
        console.log(res.data);
        
    })
}