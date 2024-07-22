import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeApp from "./global/HomeApp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { Provider } from "react-redux"
import store from "./Redux/Store"

function App() {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <BrowserRouter>
      <Provider store={store}>
        <HomeApp>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HomeApp>
      </Provider>
    </BrowserRouter>
  )
}

export default App
