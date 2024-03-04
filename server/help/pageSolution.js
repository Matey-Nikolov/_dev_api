
const sleep = async (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const pageSolution = async (api) => {
    const listJSONArray = [];

    while (true) {
        const response = await api.get();
        
        while ([429, 500, 502, 503].includes(response.status)) {
            await sleep(2);
            response = await api.get();
        };

        if ([400, 401, 403, 404, 405, 409, 413, 414, 451].includes(response.status)) {
            break;
        };

        const responseData = response.data;

        listJSONArray.push(...responseData.items);

        if ("nextKey" in responseData.pages) {
            api.defaults.params["pageFromKey"] = responseData.pages.nextKey;
        } else {
            break;
        };
    };

    return listJSONArray;
};