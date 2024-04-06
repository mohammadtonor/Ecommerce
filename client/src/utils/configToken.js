export const getCustomerfromStorage = localStorage.getItem('customer') 
    ? JSON.parse(localStorage.getItem('customer'))
    : null;

const getTokenfromStorage = localStorage.getItem('customer') 
    ? JSON.parse(localStorage.getItem('customer'))?.token
    : null;

export const config = {
    headers: {
        Authorization: `Bearer ${getTokenfromStorage}`
    }
}