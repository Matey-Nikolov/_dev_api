const chartAlerts = () =>{
    const getChart = document.getElementById('myChart');

    console.log(getChart);

    new Chart(getChart, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
                label: 'My First Dataset',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            maintainAspectRatio: false,
            width: 400,
            height: 400
        }
    });
};

export { chartAlerts };