let intervaId;
var temp=0;
var temp1=0;
var maxtime=0;
var myinterval;

function update_values(){
      $.getJSON('_update',
      
      function(data){
          temp=data.x;
          temp1=data.time1;
      });
      
      if (myChart.data.labels.length==15){
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
      }
      myChart.data.labels.push(temp1);
      myChart.data.datasets[0].data.push(temp);
      myChart.update();
      $(random_decimal).html(temp);
      console.log(maxtime);

    if (temp<40 && temp!=0){
      maxtime=maxtime+1;
      if (maxtime==7){
        showAlert();
        maxtime=0;
      }
    }
    else{
      maxtime=0;
    }
};
function showAlert(){
  var audio=new Audio('/static/alarm.mp3');
  audio.play();
  if (confirm("Your attention value is too low! We have some relaxing musics for you to listen to. Do want me to play it?")){
    console.log("Yes")
    playing=true
    pPause.src = "static/icons/pause.png"  
    song.play()
    playing = false;
  }
  else{
    console.log("No")
    playing=false
  }
}

var ctx= document.getElementById('myChart').getContext('2d');
var myChart=new Chart(ctx,{
      type:'line',
      data:{
          labels:[],
          datasets:[{
              label: 'Attention Value',
              data:[],
              backgroundColor: ['rgb(255, 99, 132)'],
              borderColor: ['rgb(255, 99, 132)'],
              borderWidth: 3,
              fill:false,
          }],
      },
      options:{
        responsive:true,
        maintainAspectRatio:true,
        title: {
          display: true,
          text: 'Real-Time Chart of Attention Values',
          fontFamily: 'Istok Web', 
          fontSize: 20
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Time'
              },
              ticks:{
                beginAtZero:true
              }
              
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Attention Value'
              },
              ticks:{
                beginAtZero: true,
                max: 100,
                stepSize: 20
              }
          }]
      }
    }
});


$("#start").click(function() {
      intervalId=window.setInterval(()=>{update_values()
      },1000);
});
  
$("#stop").click(function(){
      window.clearInterval(intervalId);
});