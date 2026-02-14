import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { Quote } from './pages/Quote';
import { Contact } from './pages/Contact';
import { Vendors } from './pages/Vendors';
import { VendorMenu } from './pages/VendorMenu';
import { AppRoutes } from './types';

// ScrollToTop component to ensure navigation starts at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <HashRouter>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <PageTransition>
                <Routes>
                  <Route path={AppRoutes.HOME} element={<Home />} />
                  <Route path={AppRoutes.QUOTE} element={<Quote />} />
                  <Route path={AppRoutes.CONTACT} element={<Contact />} />
                  <Route path={AppRoutes.VENDORS} element={<Vendors />} />
                  <Route path={AppRoutes.VENDOR_MENU} element={<VendorMenu />} />
                </Routes>
              </PageTransition>
            </main>
            <Footer />
            <BottomNav />
          </div>
        </>
      )}
    </HashRouter>
  );
};

export default App;