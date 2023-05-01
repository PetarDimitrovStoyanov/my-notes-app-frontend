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
        getSingleNote: (state) => (noteId) => {
            return state.notes.find(note => note.id === noteId)
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
        updateSingleNote({commit}, payload) {
            commit(`changeSingleNote`, payload)
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
        changeSingleNote(state, payload) {
            state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload
                }
                return note;
            })
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
