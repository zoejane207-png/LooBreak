import NavBar from "./NavBar";
import Footer from "./Footer";

// Shared page shell so every route lines up the same way: the nav bar on top,
// a centered content column with a consistent max width and horizontal
// padding, and enough bottom padding that content never hides behind the
// fixed footer. Pages that shouldn't show the loo-tip banner (e.g. the quiz)
// opt out with showFooter={false}.
export default function PageLayout({ children, showFooter = true }) {
  return (
    <>
      <NavBar />
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 pt-6 pb-28">
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}
