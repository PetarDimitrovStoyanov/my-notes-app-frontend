import axios from "../config/axiosConfig";

const uri = "http://localhost:8080/backend";


export function updateNoteOnDrag(updatedNote) {
    return axios.patch(`${uri}/notes/update-on-drag`, updatedNote)
}

export function updateNote(updatedNote) {
    return axios.patch(`${uri}/notes/update`, updatedNote)
}

export function deleteNote(id, ownerId) {
    return axios.delete(`${uri}/notes/${id}/delete/${ownerId}/owner`)
}

export function createNote(note) {
    return axios.post(`${uri}/notes/create`, note)
}

export function fetchCategories() {
    return axios.get(`${uri}/categories`)
}

export function login(data) {
    return axios.post(`${uri}/users/login`, data);
}

export function logout() {
    return axios.get(`${uri}/users/logout`);
}

export function search(criteria) {
    let requestParams = ``;
    for (const field in criteria) {
        let param = criteria[field] ? `${field}=${criteria[field]}&` : ''
        requestParams += param;
    }
    requestParams = requestParams !== "" ? `?${requestParams}` : '';

    return axios.post(`${uri}/notes/search${requestParams}`);
}

