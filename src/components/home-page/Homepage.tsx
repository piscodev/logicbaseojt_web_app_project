import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Test from '../Test';
import { EdgeStoreProvider } from '@/lib/edgestore';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <EdgeStoreProvider>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />

        {/* <AppAppBar /> */}
        {/* <Hero /> */}
        <div>
          <Test />
          {/* <LogoCollection />
          <Features />
          <Divider />
          <Testimonials />
          <Divider />
          <Highlights />
          <Divider />
          <Pricing />
          <Divider />
          <FAQ /> */}
          {/* <Divider /> */}
          {/* <Footer /> */}
        </div>
      </AppTheme>
    </EdgeStoreProvider>
  );
}
