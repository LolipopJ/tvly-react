import React from 'react';
import {useRouter} from 'next/router';

export default function RedirectToStartPage() {
  const Router = useRouter();

  React.useEffect(() => {
    const {pathname} = Router;
    console.log(pathname);
    if (pathname == '/') {
      Router.push('/channel/start');
    }
  });

  return null;
}
