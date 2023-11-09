import { endpointDetailsRouter } from "../../controller/router.js";

let machineDetailsAssignedProducts = {};
let machineDetailsHealth = {};

function endpointMachineDetails(machineDetails){

    machineDetails = [machineDetails];

    console.log(machineDetails);

    machineDetails.map((value) =>{
        machineDetailsAssignedProducts = value.assignedProducts;
        machineDetailsHealth = value.health.services.serviceDetails;

    });

    console.log(machineDetailsHealth);

    endpointDetailsRouter(machineDetails[0].hostname, machineDetailsAssignedProducts, machineDetailsHealth);
};



export { endpointMachineDetails };