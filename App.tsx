import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { ConversionDock } from './components/ConversionDock';
import { LoadingScreen } from './components/LoadingScreen';
import { PageTransition } from './components/PageTransition';
import { AppRoutes } from './types';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Quote = React.lazy(() => import('./pages/Quote').then(module => ({ default: module.Quote })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Vendors = React.lazy(() => import('./pages/Vendors').then(module => ({ default: module.Vendors })));
const VendorMenu = React.lazy(() => import('./pages/VendorMenu').then(module => ({ default: module.VendorMenu })));

// ScrollToTop component to ensure navigation starts at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Fallback loader for lazy-loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [initialLoad, setInitialLoad] = React.useState(true);

  return (
    <HashRouter>
      {initialLoad ? (
        <LoadingScreen onComplete={() => setInitialLoad(false)} />
      ) : (
        <>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path={AppRoutes.HOME} element={<Home />} />
                    <Route path={AppRoutes.QUOTE} element={<Quote />} />
                    <Route path={AppRoutes.CONTACT} element={<Contact />} />
                    <Route path={AppRoutes.VENDORS} element={<Vendors />} />
                    <Route path={AppRoutes.VENDOR_MENU} element={<VendorMenu />} />
                  </Routes>
                </Suspense>
              </PageTransition>
            </main>
            <Footer />
            <ConversionDock />
            <BottomNav />
          </div>
        </>
      )}
    </HashRouter>
  );
};

export default App;