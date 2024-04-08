import axios from "axios"
import { BASE_URL } from "../../utils/baseUrl"
import { config } from "../../utils/configToken";

const createContact = async (contactData) => {
    console.log(config);
    const response = await axios.post(`${BASE_URL}contacts`, contactData, config)
    return response.data;
}

const contactService = {
    createContact
}

export default contactService;