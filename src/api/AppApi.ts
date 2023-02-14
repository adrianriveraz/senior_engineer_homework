export interface CurrencyTypes {
  rates: {
    BRL: {
      rate: string;
    };
  };
  status: string;
}

export default class AppApi {

  public static async getCurrency(): Promise<string> {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    };
    let response;
        try {
          response = fetch(
            process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PATH,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              if (response.status !== "success") {
                throw new Error('Network response was not Successful');
              }
              return response.rates.BRL.rate;
            })
            .catch((err) => console.error(err));
        } catch (error) {
          console.error("Failed to retrieve Currency Conversion", error);
        }

    return response;
  }
}
