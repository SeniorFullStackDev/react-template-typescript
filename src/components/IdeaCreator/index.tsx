import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export default function Achievements() {
  const { trackPageView } = useMatomo();

  // Track page view
  useEffect(() => {
    trackPageView({});
  }, []);

  return <Container maxWidth={false}>hello</Container>;
}
