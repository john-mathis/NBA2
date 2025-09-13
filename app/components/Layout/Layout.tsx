import Navbar from '../NavBar/Navbar';

    export default function Layout({ children }:any) {
      return (
        <>
          <Navbar />
          <main>{children}</main>
        </>
      );
    }