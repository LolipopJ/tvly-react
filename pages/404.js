import React from 'react';
import {useRouter} from 'next/router';

export default function RedirectToStartPage() {
  const Router = useRouter();

  React.useEffect(() => {
    Router.push('/channel/start');
  });

  return null;
}
