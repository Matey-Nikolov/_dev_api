import { endpointDetailsRouter } from "../controller/router.js";

let machineDetailsAssignedProducts = {};

function endpointMachineDetails(machineDetails){

    machineDetails = [machineDetails];

   // console.log(machineDetails);

    machineDetails.map((value) =>{
        machineDetailsAssignedProducts = value.assignedProducts;
    });

    console.log(machineDetailsAssignedProducts);

    endpointDetailsRouter(machineDetails[0].hostname, machineDetailsAssignedProducts);
};



export { endpointMachineDetails };