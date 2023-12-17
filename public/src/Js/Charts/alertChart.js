import { getAlerts, filterLow, filterMedium, filterHigh } from "../../Global/globalInport.js";

let lowCount = 0;
let mediumCount = 0;
let highCount = 0;

let isFirst = true;

const chartAlerts = async () =>{
    const getChart = document.getElementById('myChart');

    if (getChart === null) {
        return;
    }

    if(isFirst){
        await getAlerts();
        isFirst = false;
    }
    
    let data = filterLow();
    lowCount = data.items.length;
    
    data = filterMedium();
    mediumCount = data.items.length;

    data = filterHigh();
    highCount = data.items.length;

    if (lowCount === 0 && mediumCount === 0 && highCount === 0) {
        return false;
    }

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
            width: 100,
            height: 100
        }
    });

    return true;
};

export { chartAlerts };