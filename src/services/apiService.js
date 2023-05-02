import axios from "../config/axiosConfig";

export function updateNoteOnDrag(updatedNote) {
    return axios.patch(`/notes/update-on-drag`, updatedNote)
}

export function updateNote(updatedNote) {
    return axios.patch(`/notes/update`, updatedNote)
}

export function deleteNote(id, ownerId) {
    return axios.delete(`/notes/${id}/delete/${ownerId}/owner`)
}

export function createNote(note) {
    return axios.post(`/notes/create`, note)
}

export function fetchCategories() {
    return axios.get(`/categories`)
}

export function login(data) {
    return axios.post(`/users/login`, data);
}

export function register(user) {
    return axios.post(`/users/register`, user)
}

export function logout() {
    return axios.get(`/users/logout`);
}

export function search(criteria) {
    let requestParams = ``;
    for (const field in criteria) {
        let param = criteria[field] ? `${field}=${criteria[field]}&` : ''
        requestParams += param;
    }
    requestParams = requestParams !== "" ? `?${requestParams}` : '';

    return axios.post(`/notes/search${requestParams}`);
}

