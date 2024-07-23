import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeApp from "./global/HomeApp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { Provider } from "react-redux"
import store from "./Redux/Store"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import Product from "./pages/Product"

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <HomeApp>
          <ToastContainer theme="dark" closeOnClick />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HomeApp>
      </Provider>
    </BrowserRouter>
  )
}

export default App
