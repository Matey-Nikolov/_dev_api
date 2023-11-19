import { endpointDetailsRouter } from "../../controller/baseRouter.js";

let machineDetailsAssignedProducts = {};
let machineDetailsHealth = {};
let machineDetails_Os = {};

function endpointMachineDetails(machineDetails){

    machineDetails = [machineDetails];

    machineDetails.map((value) =>{
        machineDetailsAssignedProducts = value.assignedProducts;
        machineDetailsHealth = value.health.services.serviceDetails;
        machineDetails_Os = value.os;
    });

    machineDetails_Os = [machineDetails_Os];

    endpointDetailsRouter(machineDetails[0].hostname, machineDetailsAssignedProducts, machineDetailsHealth, machineDetails_Os);
};



export { endpointMachineDetails };