// Types

export type HistoryRouterHandlerParams = {
  nameEvent: string;
  locationField: "pathname";
};
export type HistoryRouterHandlerRequestParams = {
  path: string;
  resource: string;
};

export default class App {
  historyRouterHandlerParams: HistoryRouterHandlerParams = {
    nameEvent: "popstate",
    locationField: "pathname",
  };

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.navigate(null);
    });
  }

  navigate(url: string | null) {
    if (typeof url === "string") {
      // this.setHistory(url);
    }

    const urlString =
      window.location[this.historyRouterHandlerParams.locationField].slice(1);

    console.log(urlString);

    const result: HistoryRouterHandlerRequestParams = {
      path: "",
      resource: "",
    };

    const path = urlString.split("/");

    console.log(path);

    [result.path = "", result.resource = ""] = path;

    console.log(result);

    //this.#callback!(result);
  }
}
