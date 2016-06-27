const API_NAME = API.create("url goes here");

export default {
    async demo() {
        return await API_NAME.request("/test");
    }
};
