const apiURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "ac92fc2c14ee9435915180c0ef6a7224";
const generateBtn = document.querySelector("#generate");

const fetchData = async function (url) {
  let response = await fetch(url);
  try {
    let data = await response.json();
    /* For test */
    // console.log(data);
    return data;
  } catch (err) {
    console.log("Err:", err);
  }
};

const btnGenerateData = async function () {
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  const url = `${apiURL}${zipCode}&APPID=${apiKey}`;

  if (zipCode.length === 0 || feelings.length === 0) {
    alert("Please fill up all values !");
    return;
  }

  let weatherData = await fetchData(url);

  let temp = weatherData.main.temp + " K";

  const updateUI = async function () {
    const date = document.getElementById("date");
    const temp = document.getElementById("temp");
    const content = document.getElementById("content");

    //Get data from owr own server
    let UiData = await getData("http://localhost:5500/projectData");

    //Updating the UI
    date.innerText = UiData.date;
    temp.innerText = UiData.temp;
    content.innerText = UiData.content;
  };
  // Create a new date instance dynamically with JS
  let d = new Date();
  let date = d
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .split(" ")
    .join(" ");

  const data = {
    date: date,
    temp: temp,
    content: content,
  };

  //Post data to owr own server
  await postData("http://localhost:5500/projectData", data);

  //Update UI
  updateUI();
};

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

const getData = async function (url) {
  let response = await fetch(url);
  try {
    let data = response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

generateBtn.addEventListener("click", btnGenerateData);
