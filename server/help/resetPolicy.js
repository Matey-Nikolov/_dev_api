const body = {
    "enabled": false
};

const addParams = {
    "pageSize": 200,
    "pageTotal": true
};

const getPolicies = async (api, pathFromURL) => {
    const apiGet = api.apiGetConfiguration(pathFromURL, addParams);

    apiGet.get()
        .then(async response => {
            let policy_data = response.data;
    
            policy_data = policy_data.items.filter(item => item.priority != 0);
    
            for (let item of policy_data) {
                const url = `/endpoint/v1/policies/${item.id}`;
    
                let patchResponse = await api.patchApiConfiguration(url, body);
    
                while ([429, 500, 502, 503].includes(patchResponse.status)) {
                    await sleep(2);
                    patchResponse = await api.patchApiConfiguration(url, body);
                };
            };
        })
        .catch(error => {
            console.error(error);
        });
};

const policy_type = [
    'threat-protection',
    'peripheral-control',
    'application-control',
    'web-control',
    'agent-updating',
    'windows-firewall',
    'device-encryption',
    'server-threat-protection',
    'server-peripheral-control',
    'server-application-control',
    'server-web-control',
    'server-agent-updating',
    'server-windows-firewall',
    'server-lockdown',
    'server-file-integrity-monitoring'
];

const resetBasePolicies = async (api) => {
    let count = 0;
    for (const item of policy_type) {
        count++;

        const url = `/endpoint/v1/policies/${item}/base/settings/reset`;

        const postResponse = await api.postApiConfiguration(url, {});

        if (count === 7) {
            console.log('Work');

            await sleep(10);
            count = 0;
        };

        while ([429, 500, 502, 503].includes(postResponse.status)) {
            await sleep(10);

            postResponse = await api.postApiConfiguration(url, {});
        };

    };
};

const sleep = async (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

const callResetBasePolicies = async (api, pathFromURL) =>{
    await getPolicies(api, pathFromURL);
    await resetBasePolicies(api);
};

export default callResetBasePolicies;