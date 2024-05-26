import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PurchesOrder from "./views/watches/PurchesOrder";
import AddProductForm from "./views/watches/AddProductForm";
import SignInPage from "./views/users/SignInPage";
import SignupPage from "./views/users/SignupPage";
import Common from "./views/Common";
function App() {

  return (
    <Router>
      <Header />
      <div className="w-full h-[8vh]"></div>
      <Routes>
        <Route path="/" element={<Common />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/purchases" element={<PurchesOrder />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;