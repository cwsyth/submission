import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then((res) => {
        return res.data;
    });
}

const create = (person) => {
    const req = axios.post(baseUrl, person);
    return req.then((res) => {
        return res.data;
    });
}

const remove = (id) => {
    const req = axios.delete(baseUrl + `/${id}`);
    return req.then((res) => {
        return res.data;
    });
}

const update = (person) => {
    const req = axios.put(baseUrl + `/${person.id}`, person);
    return req.then((res) => {
        return res.data;
    });
}

export default { getAll, create, remove, update }