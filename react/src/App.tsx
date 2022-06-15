import { Provider} from "react-redux";
import "./main.scss";
import store from "./redux/store";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./page/Home";

function App() {

	return (
		<Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
		</Provider>
	);
}

export default App;
