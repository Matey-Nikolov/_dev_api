import { filterLow, filterMedium, filterHigh } from "../../Global/globalInport.js";

let lowCount = 0;
let mediumCount = 0;
let highCount = 0;


const chartAlerts = async () =>{
    const getChart = document.getElementById('myChart');

    if (getChart === null) {
        return;
    }

    let data = await filterLow();
    lowCount = data.items.length;
    
    data = await filterMedium();
    mediumCount = data.items.length;

    data = await filterHigh();
    highCount = data.items.length;

    new Chart(getChart, {
        type: 'pie',
        data: {
            labels: ['Low', 'Medium', 'High'],
            datasets: [{
                label: 'Severity',
                data: [
                    lowCount,
                    mediumCount,
                    highCount
                ],
                backgroundColor: [
                    'rgb(255, 205, 86)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                hoverOffset: 4
            }]
        },
        options: {
            maintainAspectRatio: true,
            width: 150,
            height: 150
        }
    });
};

export { chartAlerts };