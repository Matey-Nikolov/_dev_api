let url = `/endpoint/v1/settings/web-control/local-sites`;

let body = {
    "url": "web-control-automation.com",
    "tags": ["ALLOW", "BLOCK"],
    "comment": "Web Control Automation"
};

const declareTags = async (api)  =>{
    await api.postApiConfiguration(url, body);
};

const setActionForTags = async (api) =>{
    url = `/endpoint/v1/policies/web-control/base/settings`;

    body = {
        "endpoint.web-control.enabled": {"value": true},
        "endpoint.web-control.web-monitoring.enabled": {"value": "yes"},
        "endpoint.web-control.tags.settings": {
            "value": [
                {"tag": "BLOCK", "action": "block"},
                {"tag": "ALLOW", "action": "allow"}
            ]
        }
    };

    await api.patchApiConfiguration(url, body);
};

const blockQUIC_ForBasePolicy = async (api) => {
    url = `/endpoint/v1/policies/threat-protection/base/settings`;

    body = {
        "endpoint.threat-protection.web-control.tls-decryption.quic.enabled": {"value": true}
    };
    
    await api.patchApiConfiguration(url, body);
};

const setPolicyForWebControl = async (api) =>{
    await declareTags(api);
    await setActionForTags(api);
    await blockQUIC_ForBasePolicy(api);

    console.log('web control is worked');
};

export default setPolicyForWebControl;