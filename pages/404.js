import {useRouter} from 'next/router';

export default function RedirectToIndex() {
  const Router = useRouter();

  const isClient = typeof document !== 'undefined';
  isClient && Router.replace('/');

  return null;
}
