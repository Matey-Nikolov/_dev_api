import ApiWebsite from '../axiosrequests/apiWebsite.js';

class WebsiteService {
  constructor(apiRequestWebsite) {
    
    this.api = apiRequestWebsite;

    this.regexWebsite = /(?:https?:\/\/www\.)?(?<hostname>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    
    this.setWebsiteInformation = new Set();
    this.setWebsiteURL = new Set();

    this.isDeleted = false;

    this.isAddWebsite = {
      'status': -1,
      'information': { }
    };
  };

  getWebsiteData = async () => {
    const data = await this.api.getWebsite();

    return data.items;
  };

  allowWebsite = async (typeName) => {
    const websiteData = await this.api.getWebsiteData();

    this.setWebsiteInformation.clear();
    this.setWebsiteURL.clear();

    switch(typeName){
      case 'allow':
        websiteData.map((value) => {
          this.setWebsiteInformation.add(value.url);
        });
      break
      default:
        websiteData.map((value) => {
          let data = 
          { 
            id: value.id,
            url: value.url,
            comment: value.comment   
          };

          this.setWebsiteInformation.add(data);
          this.setWebsiteURL.add(value.url);
        });      
      break;
    };
    
    return this.setWebsiteInformation;
  };

  // addAllowedWebsite = async (valueURL) => {
  //   const setWebsite = await this.allowWebsite('allow');
  //   const match = this.regexWebsite.exec(valueURL);
  //   const urlExtract = match ? match[1] : null;

  //   if (setWebsite.has(urlExtract)) {
  //     return true;
  //   } else if (urlExtract !== null) {
  //     try {
  //       console.log('WORK');
  //       this.getWebsiteAllow(urlExtract);
  //       await ApiWebsite.postRequest('/data/websites/post');
  //       return false;
  //     } catch (error) {
  //       console.error('Error adding allowed website:', error);
  //       return null;
  //     }
  //   }

  //   return null;
  // };

  btnBlockWebsite = async (website_Id) => {
    try {

      this.isDeleted = await this.api.deleteRequest(website_Id);
      
      if (this.isDeleted) {

        const deletedURL = Array.from(this.setWebsiteInformation).find(item => item.id === website_Id);
        this.setWebsiteURL.delete(deletedURL.url);

        this.setWebsiteInformation.delete(website_Id);
      };

    } catch (error) {
      console.error('Error blocking website:', error);
    };

    return this.isDeleted.data;
  };

  btnAllowWebsite = async (valueURL) => {
    const extractedURL = (this.regexWebsite.exec(valueURL) || [])[1];

    if (!this.setWebsiteURL.has(extractedURL)) {
      try {
        this.isAddWebsite = await this.api.addWebsiteRequest(extractedURL);
      } catch (error) {
        console.error('Error adding website:', error);
      };

      let url = this.isAddWebsite.data.information.url;

      if (this.isAddWebsite.status === 200) {
        this.setWebsiteURL.add(url);
        this.setWebsiteInformation.add(url);
      };
    };

    return this.isAddWebsite.status;
  };
};

let instance = null;

export default function getWebsiteServiceInstance(clientId) {
  const apiRequestWebsite = new ApiWebsite(clientId);

  if (!instance) {
    instance = new WebsiteService(apiRequestWebsite);
  };

  return instance;
};