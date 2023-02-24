import { useState, useEffect } from "react";




export default function Main() {
    let [weatherFailed,  setWeatherFailed] = useState(true)
    const [client_id, setClient_id]=useState();
    const [city, setCity]=useState("");
    const [country, setCountry]=useState("");
    const [date, setDate]=useState();
    const [incident_desc, setIncident_desc]=useState("");
    
    
    const key = "6e7fe95c172b4c9d2d28cb64921bf63e"
    let weather_report;
    let failed = true;
   

    //Get Weather data
    const successfulLocation = async(position) => {
        const {latitude, longitude} = position.coords;
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed()}&lon=${longitude.toFixed()}&appid=${key}`);
        // weather = await response.json();
        try {

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed()}&lon=${longitude.toFixed()}&appid=${key}`).then(response => 
                response.json()
            ).then(data => {
                weather_report = data;
                setWeatherFailed(false);
            })
            
        } catch (error) {
            setWeatherFailed(true);
            console.error(error.message);
        }
    }
        navigator.geolocation.getCurrentPosition(successfulLocation)
     
        //oN SUBMIT handler
        const onSubmit = async(e) => {
          
                try {

                    const body = {client_id, incident_desc, city, country, date, weather_report};
                    const response = await fetch("http://localhost:5000/reporter", {
                        method:"post",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify(body)
                    })
                    
                } catch (err) {
                    console.error(err.message)
                }
            

        }
        


  return (
    <main className="rounded-2xl overflow-hidden shadow-md bg-white w-[45rem]">
      <form className="py-[3rem] px-[2rem]  space-y-6 " onSubmit={onSubmit}>
        <div className="flex flex-col space-y-3 mb-[2rem]">
          <label htmlFor="client" className="text-xl font-bold">
            Enter client ID
          </label>
          <input
            type="number"
            id="client"
            value={client_id}
            onChange={e => setClient_id(e.target.value)}
            className="w-full border-[1px] rounded-[5px] py-4 px-4 focus:outline-indigo-500 transition-all ease-in-out duration-100"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-[2rem]">
          <label htmlFor="text" className="text-xl font-bold">
            Incident description
          </label>
          <textarea
            type="text"
            id="text"
            value={incident_desc}
            onChange={e => setIncident_desc(e.target.value)}
            className="w-full border-[1px] rounded-[5px] py-4 px-4 focus:outline-indigo-500 transition-all ease-in-out duration-100"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-[2rem]">
          <label htmlFor="city" className="text-xl font-bold">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full border-[1px] rounded-[5px] py-4 px-4 focus:outline-indigo-500 transition-all ease-in-out duration-100"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-[2rem]">
          <label htmlFor="country" className="text-xl font-bold">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="w-full border-[1px] rounded-[5px] py-4 px-4 focus:outline-indigo-500 transition-all ease-in-out duration-100"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-[2rem]">
          <label htmlFor="date" className="text-xl font-bold">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border-[1px] rounded-[5px] py-4 px-4 focus:outline-indigo-500 transition-all ease-in-out duration-100"
          />
        </div>
        <div className="flex items-center">
          <p className="flex ">
            Getting Weather Data: Weather API{" "}
            <span className={`ml-2 animate-spin ${weatherFailed? "" : "hidden"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </span>
            <span className={`text-green-400 invisible ml-2 ${weatherFailed? "" : "!visible"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
          </p>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 uppercase text-white font-bold tracking-widest text-[1.5rem] rounded-[5px] active:translate-y-1 transition-all ease-in-out duration-200"
        >
          Report
        </button>
      </form>
    </main>
  );
}
