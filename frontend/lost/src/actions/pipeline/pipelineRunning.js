import { API_URL } from '../../settings'
import axios from 'axios'
import TYPES from '../../types/index'
import { http } from 'l3p-frontend'

console.log('----------API_URLAPI_URL--------------------------');
console.log(API_URL);
console.log('------------------------------------');
const verifyTab = (tabId, verified) => {
    return {
        type: 'PIPELINE_RUNNING_VERIFY_TAB',
        payload: {
            tabId, verified
        }
    }
}

const selectTab = (tabId) => {
    return {
        type: 'PIPELINE_RUNNING_SELECT_TAB',
        payload: {
            tabId
        }
    }
}


const getPipelines = () => async dispatch => {
    const response = await axios.get(`${API_URL}/pipeline`)
    dispatch({ type: 'PIPELINE_RUNNING_GET_PIPELINES', payload: response.data })
}

const getPipeline = (id) => async dispatch => {
    const response = await axios.get(`${API_URL}/pipeline/${id}`)
    dispatch({ type: 'PIPELINE_RUNNING_GET_PIPELINE', payload: response.data })
}

const deletePipeline = (id) => async dispatch => {
    const response = await axios.delete(`${API_URL}/pipeline/${id}`)
    if (response.data === 'success') {
        if (typeof window !== 'undefined') {
            window.location.href = `${window.location.origin}/dashboard`;
        }
    }
    dispatch({ type: 'PIPELINE_RUNNING_DELETE', payload: response.data })
}

const pausePipeline = (id) => async dispatch => {
    const response = await axios.post(`${API_URL}/pipeline/pause/${id}`)
    dispatch({ type: 'PIPELINE_RUNNING_PAUSE', payload: response.data })
}

const playPipeline = (id) => async dispatch => {
    const response = await axios.post(`${API_URL}/pipeline/play/${id}`)
    dispatch({ type: 'PIPELINE_RUNNING_PLAY', payload: response.data })
}

const regeneratePipeline = (id) => async dispatch => {

}
const downloadLogfile = (path, id) => async  dispatch => {
    const token = localStorage.getItem('token')
    const response = await http.get({
        url: `${API_URL}/${path}?nocache=${Math.random()}`,
        token,
        type: 'image'
    })
    const objectURL = window.URL.createObjectURL(response)
    const link = document.createElement('a');
    link.href = objectURL;
    link.download=`p-${id}.log`
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectURL);
}






// fetch("http://localhost/api/pipeline/api/data/logs/pipes/p-13.log?nocache=0.9217589871654794", {"credentials":"omit","referrer":"http://localhost:3000/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"OPTIONS","mode":"cors"});


const reset = () => {
    return {
        type: 'PIPELINE_RUNNNING_RESET',
        payload: null
    }
}

const toggleModal = (id) => {
    return {
        type: 'PIPELINE_RUNNING_TOGGLE_MODAL',
        payload: {
            id: id
        }
    }
}

export default { verifyTab, selectTab, getPipelines, getPipeline, toggleModal, reset, deletePipeline, pausePipeline, playPipeline, regeneratePipeline, downloadLogfile }