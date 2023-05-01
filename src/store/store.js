import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        user: {
            id: null,
            email: "",
            fullName: "",
            roles: []
        },
        token: null,
        notes: [],
        selectedNote: null,
        categories: []
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
        getUserField: (state) => (field) => {
            return state.user[`${field}`];
        },
        getToken: (state) => {
            return state.token;
        },
        getNotes: (state) => {
            return state.notes;
        },
        getSelectedNote: (state) => {
            return state.selectedNote
        },
        getCategories: (state) => {
            return state.categories;
        },
        getCategoryByName: (state) => (name) => {
            return state.categories.find(category => category.name === name);
        }
    },
    actions: {
        setUser({commit}, payload) {
            commit('changeUser', payload)
        },
        setToken({commit}, payload) {
            commit('changeToken', payload)
        },
        setNotes({commit}, payload) {
            commit('changeNotes', payload);
        },
        addNote({commit}, payload) {
            commit(`pushNote`, payload)
        },
        setSelectedNote({commit}, payload) {
            commit(`changeSelectedNote`, payload)
        },
        setCategories({commit}, payload) {
            commit(`changeCategories`, payload)
        }
    },
    mutations: {
        changeUser(state, payload) {
            Object.assign(state.user, payload)
        },
        changeToken(state, payload) {
            state.token = payload
        },
        changeNotes(state, payload) {
            state.notes = payload;
        },
        pushNote(state, payload) {
            state.notes.push(payload)
        },
        changeSelectedNote(state, payload) {
            state.selectedNote = payload
        },
        changeCategories(state, payload) {
            state.categories = payload
        }
    },
    plugins: [
        createPersistedState({
            key: "user-store",
            storage: window.localStorage,
            paths: [`user`, `token`, `notes`, `selectedNote`, `categories`]
        })
    ]
})
