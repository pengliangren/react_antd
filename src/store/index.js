import configureStoreDev from "./store.dev";
import configureStoreProd from "./store.prod";

function store() {
  if (process.env.NODE_ENV === "development") {
    return configureStoreDev;
  } else {
    return configureStoreProd;
  }
}

export default store();

