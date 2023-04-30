import axios from "../config/axiosConfig";

const uri = "http://localhost:8080/backend";


export function updateNoteOnDrag(updatedNote) {
    return axios.patch(`${uri}/notes/update-on-drag`, updatedNote)
}

export function updateNote(updatedNote) {
    return axios.patch(`${uri}/notes/update`, updatedNote)
}

export function deleteNode(id, ownerId) {
    return axios.delete(`${uri}/notes/${id}/delete/${ownerId}/owner`)
}

export function createNote(note) {
    return axios.post(`${uri}/notes/create`, note)
}

export function fetchNodes(id) {
    return axios.get(`${uri}/notes/by-user/${id}`)
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

