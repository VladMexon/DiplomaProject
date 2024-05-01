import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
        comments: [],
        notificationsToUpdate: [],
        commentsCount: [],
        last_id: 0,
    },
    getters: {
        getCommentsByNotifId: (state) => (notifId) => {
            return state.comments.filter(item => item.id_notification == notifId);
        },
        getUpdateIds(state){
            return state.notificationsToUpdate;
        },
        getLastId(state){
            return state.last_id;
        },
        getCommentsCountById: (state) => (id) => {
            let count = state.commentsCount.find(item => item.id_notification === id);
            if(count){
                return count.comments_count;
            }else{
                return 0;
            }
        }
    },
    mutations: {
        SET_COMMENTS(state, payload) {
            state.comments = payload;
        },
        ADD_COMMENTS(state, payload) {
            payload.forEach(item => {
                if(!state.comments.map(comment=>comment.id_comment).includes(item.id_comment))
                    state.comments.push(item);
            })
        },
        ADD_UPDATE_ID(state, payload){
            state.notificationsToUpdate.push(payload);
        },
        DELETE_UPDATE_ID(state, payload){
            state.notificationsToUpdate = state.notificationsToUpdate.filter(id => id != payload);
        },
        SET_LAST_ID(state, payload){
            state.last_id = payload;
        },
        UPDATE_COMMENTS_COUNT(state, payload){
            payload.forEach(item => {
                state.commentsCount = state.commentsCount.filter(item2 => item2.id_notification != item.id_notification);

                state.commentsCount.push(item);
            });
            
        },
    },
    actions: {
        async sendComment({ commit }, payload){
            try {
                const response = await api.notification.newComment(payload);
                if(response.status === 200){
                    commit('ADD_COMMENTS', [{id_notification: payload.id_notification, id_comment: response.data.id_comment, text: payload.text, id_author: payload.id_author, time: Date.now()}]);
                    commit('SET_LAST_ID', response.data.id_comment);
                    return true;
                }else{
                    return false;
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getNewComments({ commit, getters }){
            try {
                const response = await api.notification.getNewComments({last_id: getters.getLastId, commentIds: getters.getUpdateIds});
                if(response.data.length > 0){
                    commit('SET_LAST_ID', response.data[response.data.length - 1].id_comment);
                    commit('ADD_COMMENTS', response.data);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getCommentsCount({ commit }, payload){
            try {
                const response = await api.notification.getCommentsCount(payload);
                console.log(response.data);
                commit('UPDATE_COMMENTS_COUNT', response.data);
            } catch (e) {
                console.log(e);
            }
        },
        async getComments({ commit }, payload){
            try {
                const response = await api.notification.getComments(payload);
                commit('ADD_COMMENTS', response.data);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

