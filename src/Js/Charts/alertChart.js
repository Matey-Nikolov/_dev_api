import { filterLow, filterMedium, filterHigh } from "../../Global/globalInport.js";

let lowCount = 0;
let mediumCount = 0;
let highCount = 0;


const chartAlerts = async () =>{
    const getChart = document.getElementById('myChart');

    let alertsLowCount = await filterLow();
    console.log(alertsLowCount.items.length);
    
    let alertsMediumCount = await filterMedium();
    console.log(alertsMediumCount.items.length);

    let alertsHighCount = await filterHigh();
    
    console.log(alertsHighCount.items.length);

    new Chart(getChart, {
            type: 'pie',
            data: {
                labels: ['High', 'Low', 'Medium'],
                datasets: [{
                    label: 'Severity',
                    data: [
                        alertsLowCount.items.length, 
                        alertsMediumCount.items.length, 
                        alertsHighCount.items.length
                    ],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: true,
                width: 200,
                height: 200
            }
        });
};

export { chartAlerts };