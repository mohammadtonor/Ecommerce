export const getCustomerfromStorage = localStorage.getItem('customer') 
    ? JSON.parse(localStorage.getItem('customer'))
    : null;

export const getTokenfromStorage = localStorage.getItem('customer') 
    ? JSON.parse(localStorage.getItem('customer'))?.token
    : null;

export const config = {
    headers: {
        Authorization: `Bearer ${getTokenfromStorage}`
    }
} 