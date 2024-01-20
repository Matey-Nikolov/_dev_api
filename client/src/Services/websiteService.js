import ApiWebsite from '../axiosrequests/apiWebsite.js';

const apiRequestWebsite = new ApiWebsite();

class WebsiteService {
    constructor(accessToken, id) {
      this.regexWebsite = /(?:https?:\/\/www\.)?(?<hostname>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
      this.accessToken = accessToken;
      this.id = id;
      this.isDeleted = false;
    }

    getWebsiteData = async () => {
      //apiRequestWebsite.setCredentials();

      const data = await apiRequestWebsite.getWebsite(this.accessToken, this.id);

      return data.items;
    };
  
    allowWebsite = async (typeName) => {
      const websiteData = await this.getWebsiteData();
      const setWebsite = new Set();
  
      switch(typeName){
        case 'allow':
          websiteData.map((value) => {
            setWebsite.add(value.url);
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
  
            setWebsite.add(data);
          });      
        break;
      };

      console.log(setWebsite);
  
      return setWebsite;
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
        this.isDeleted = await apiRequestWebsite.deleteRequest(this.accessToken, this.id, website_Id);
      } catch (error) {
        console.error('Error blocking website:', error);
      };

      return this.isDeleted.data;
    };
  
    // btnAllowWebsite = async (valueURL) => {
    //   const extractedURL = (this.regexWebsite.exec(valueURL) || [])[1];
    //   this.getWebsiteAllow(extractedURL);
  
    //   try {
    //     await ApiWebsite.postRequest('/data/websites/post');
    //   } catch (error) {
    //     console.error('Error allowing website:', error);
    //   }
    // };
  
    // getWebsiteAllow = (urlExtract) => {
    //   // Implement your logic for getting allowed websites here
    // };
};
  
export default WebsiteService;