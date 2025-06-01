import Banner from "./Banner";
import Footer from "./Footer";
import Games from "./games";
import Hero from "./Homepage";
import Navbar from "./NavBar";





const Home = () => {
  return (
    <div className="bg-[#0F0F0F]">
      <Navbar />
      <Hero />
      <Games/>
      <Banner />  
      <Footer />
    </div>
  );
};
export default Home;
