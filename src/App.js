import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Carrer from "./pages/Carrer/Carrer";
import Contact from "./pages/Contact/Contact";

import Techno from "./pages/Softwaredev/Techno";
import Test from "./pages/Test/Test";
import Products from "./pages/Products/Products";
import AdminPanel from "./admin/AdminPanel/AdminPanel";

import EditServices from "./admin/AdminPages/EditHome/EditServices";
import EditSlider from "./admin/AdminPages/EditHome/EditSlider";
import EditRecentWork from "./admin/AdminPages/EditHome/EditRecentWork";
import EditAboutUs from "./admin/AdminPages/EditHome/EditAboutUs";
import EditHeading from "./admin/AdminPages/EditHome/EditHeading";
import EditAboutPage from "./admin/AdminPages/EditAbout/EditAboutPage";
import EditAboutValue from "./admin/AdminPages/EditAbout/EditAboutValue";
import EditServicesHead from "./admin/AdminPages/EditServices/EditServicesHead";
import EditServiceProblem from "./admin/AdminPages/EditServices/EditServiceProblem";
import EditServiceSolution from "./admin/AdminPages/EditServices/EditServiceSolution";
import EditProblemHead from "./admin/AdminPages/EditServices/EditProblemHead";
import EditSolutionHead from "./admin/AdminPages/EditServices/EditSolutionHead";
import EditWhatYouGet from "./admin/AdminPages/EditServices/EditWhatYouGet";
import EditContactUs from "./admin/AdminPages/EditContact/EditContactUs";
import EditContactForm from "./admin/AdminPages/EditContact/EditContactForm";
import EditCarrerHead from "./admin/AdminPages/EditCarrer/EditCarrerHead";
import EditCarrerImages from "./admin/AdminPages/EditCarrer/EditCarrerImages";
import EditCarrerWYS from "./admin/AdminPages/EditCarrer/EditCarrerWYS";
import EditCarrerRYS from "./admin/AdminPages/EditCarrer/EditCarrerRYS";
import EditJobOpening from "./admin/AdminPages/EditCarrer/EditJobOpenings/EditJobOpening";
import EditHeader from "./admin/AdminPages/EditHeader/EditHeader";
import EditFooter from "./admin/AdminPages/EditFooter/EditFooter";
import EditProductsForm from "./admin/AdminPages/EditProducts/EditProductsForm";
import AddJobRole from "./admin/AdminPages/EditCarrer/AddJobRole";
import RecentworkHead from "./admin/AdminPages/EditHome/RecentworkHead";
import NoPage from "./pages/NotFound/NoPage";
function App() {
  return (
    <Main>
      {/* <Nav></Nav> */}
      <Routes>
        <Route path="admin" element={<AdminPanel />}>
          <Route exact path="editheading" element={<EditHeading />}></Route>
          <Route exact path="editaboutus" element={<EditAboutUs />}></Route>
          <Route exact path="editservices" element={<EditServices />}></Route>
          <Route exact path="editslider" element={<EditSlider />}></Route>
          <Route
            exact
            path="editrecentwork"
            element={<EditRecentWork />}
          ></Route>

          {/* // About us page Routing */}
          <Route exact path="editaboutpage" element={<EditAboutPage />}></Route>
          <Route
            exact
            path="editaboutvalue"
            element={<EditAboutValue />}
          ></Route>

          {/* // Services Page Routing  */}
          <Route
            exact
            path="editservicehead"
            element={<EditServicesHead />}
          ></Route>
          <Route
            exact
            path="editproblemhead"
            element={<EditProblemHead />}
          ></Route>
          <Route
            exact
            path="editserviceproblems"
            element={<EditServiceProblem />}
          ></Route>
          <Route
            exact
            path="editservicesolution"
            element={<EditServiceSolution />}
          ></Route>
          <Route
            exact
            path="editsolutionhead"
            element={<EditSolutionHead />}
          ></Route>
          <Route
            exact
            path="editwhatyouget"
            element={<EditWhatYouGet />}
          ></Route>
          <Route exact path="editcontactus" element={<EditContactUs />}></Route>
          <Route
            exact
            path="editcontactform"
            element={<EditContactForm />}
          ></Route>
          <Route
            exact
            path="editcarrerhead"
            element={<EditCarrerHead />}
          ></Route>
          <Route
            exact
            path="editcarrerimages"
            element={<EditCarrerImages />}
          ></Route>
          <Route exact path="editcarrerwys" element={<EditCarrerWYS />}></Route>
          <Route
            exact
            path="recentworktitle"
            element={<RecentworkHead />}
          ></Route>
          <Route
            exact
            path="editcarrerrys"
            element={<RecentworkHead />}
          ></Route>
          <Route
            exact
            path="editjobopening"
            element={<EditJobOpening />}
          ></Route>
          <Route exact path="editheader" element={<EditHeader />}></Route>
          <Route exact path="editfooter" element={<EditFooter />}></Route>
          <Route exact path="createjobroles" element={<AddJobRole />}></Route>

          <Route
            exact
            path="editProducts"
            element={<EditProductsForm />}
          ></Route>
        </Route>
        <Route exact path="*" element={<NoPage />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="carrer" element={<Carrer />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="services" element={<Techno />}></Route>
        <Route path="test" element={<Test />}></Route>
        <Route path="our-products" element={<Products />}></Route>
        <Route path="test" element={<Test />}></Route>
      </Routes>
    </Main>
  );
}

export default App;
