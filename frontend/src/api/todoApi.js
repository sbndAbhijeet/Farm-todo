import apiClient from "./client";

export const getLists = async () => {
    const response = await apiClient.get('/api/lists');
    // console.log(response.data)
    return response.data
}

export const createList = async (name) => {
    const response = await apiClient.post('/api/lists', {name});
    return response.data;
}

export const deleteList = async (listId) => {
    const response = await apiClient.delete(`/api/lists/${listId}`);
    return response.data;
}

export const getListDetails = async (listId) => {
    const response = await apiClient.get(`/api/lists/${listId}`);
    return response.data
}

export const createItem = async (label, listId) => {
    const response = await apiClient.post(`/api/lists/${listId}/items/`, {label: label,})
    return response.data
}

export const deleteItems = async (itemId, listId) => {
    const response = await apiClient.delete(`/api/lists/${listId}/items/${itemId}`)
    return response.data;
}

export const updateToggle = async (listId, itemId, newState) => {
    const response = await apiClient.patch(`/api/lists/${listId}/checked_state`,{
        item_id: itemId,
        checked_state: newState,
    })
    return response.data;
}