import { Toaster } from 'react-hot-toast';
import AffiliateRequest from './components/Home/Affiliate/AffiliateRequest';
import FeaturesForSelers from './components/Home/FeaturesForSelers/FeaturesForSelers';
import Hero from './components/Home/Hero';
import Message from './components/Home/Message/Message';
import Partner from './components/Home/Partner/Partner';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';
import { Input } from './components/ui/input';
import { AppSidebar } from './admin/Layout/AppSidebar';
import Adminlayout from './admin/Layout/AdminLayout';

function App() {
  return (
    <>
      {/* <Navbar />
      <Hero />
      <Message />
      <FeaturesForSelers/>
      <Partner/>
      <AffiliateRequest></AffiliateRequest>
      <Footer></Footer>
      <Toaster
  position="top-right"
  reverseOrder={false}
/> */}
      <Adminlayout />
    </>
  );
}

export default App;
