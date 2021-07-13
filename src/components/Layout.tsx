import type { ReactNode } from 'react';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';

type Props = { children: ReactNode };

export const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
