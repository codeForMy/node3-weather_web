const fetchWeather = (address, callback) => {
    fetch("/weather?address=" + address).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    callback(data.error, undefined);
                } else {
                    callback(undefined, {
                        location: data.location,
                        forecast: data.forecast,
                    });
                }
            });
        }
    );
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = encodeURIComponent(search.value);

    // clear all text in message
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetchWeather(location, (error, data) => {
        if (error) {
            messageOne.textContent = error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success, error);
//   } else {
//     alert("Not Supported!");
//   }

//   function success(position) {
//     console.log(position.coords.latitude);
//     console.log(position.coords.longitude);
//   }

//   function error(msg) {
//     console.log(typeof msg == 'string' ? msg : "error");
//   }

//   var watchId = navigator.geolocation.watchPosition(function(position) {
//     console.log(position.coords.latitude);
//     console.log(position.coords.longitude);
//   });

//   navigator.geolocation.clearWatch(watchId);
