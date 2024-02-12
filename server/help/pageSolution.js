import { axios } from '../globalImports.js';

//const listJSONArray = [];
//let index = 0;

const sleep = async (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const pageSolution = async (url, params, axiosConfig) => {
    const listJSONArray = [];

    while (true) {
        //index  = 0;
        const response = await axios.get(url, {
            params: params,
            ...axiosConfig 
        });

        //console.log(`No: ${index + 1} :: Customer Name: ${item['name'].padEnd(30)}Name ShowAs: ${item['showAs'].padEnd(35)}result:${response.status}`);

        // Handle retryable status codes
        while ([429, 500, 502, 503].includes(response.status)) {
            await sleep(2);

            response = await axios.get(url, {
                params: params,
                ...axiosConfig 
            });
    
           // console.log("Again :: ");
           // console.log(`No: ${index + 1} :: Customer Name: ${item['name'].padEnd(30)}Name ShowAs: ${item['showAs'].padEnd(35)}result:${response.status}`);
        };

        // Handle other status codes
        if ([400, 401, 403, 404, 405, 409, 413, 414, 451].includes(response.status)) {
          //  console.log("ERROR :: ");
          //  console.log(`No: ${index + 1} :: Customer Name: ${item['name'].padEnd(30)}Name ShowAs: ${item['showAs'].padEnd(35)}result:${response.status}`);
            break;
        };

        const responseData = response.data;

        // Spread the axiosConfig object
        listJSONArray.push(...responseData.items);

        if ("nextKey" in responseData.pages) {
            params["pageFromKey"] = responseData.pages.nextKey;
        } else {
            params.pageFromKey = null;
            break;
        };
    };

    //console.log(listJSONArray);
    return listJSONArray;
};