import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./app/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
