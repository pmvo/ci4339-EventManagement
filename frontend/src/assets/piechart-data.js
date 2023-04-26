export const pieChartData = {
  //Hard-coded data for the pie chart in the main page  
  type: "pie",
    data: {      
      labels: ["77450", "77003", "77028", "77038", "77030", "77050", "77058", "77063"], //Zip code label data
      datasets: [
        {
          label: "Number of Attendees by Zipcode",
          data: [43, 47, 15, 23, 74, 8, 67, 34], //Number of Attendees by Zip code data
          backgroundColor: [ //background color for each Zip code above
          'rgba(54,73,93,.5)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 45, 86)',
          'rgb(54, 34, 86)',
          'rgb(255, 255, 86)',
          'rgb(255, 205, 255)'
        ]
        },
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
        width: 200,
        height: 200
    }
  };
  
  export default pieChartData;