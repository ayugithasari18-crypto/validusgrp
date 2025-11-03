import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MemberLanding } from "./components/MemberLanding";

function App() {
  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden relative">
      <Header />
      <MemberLanding />
      <Footer />
    </main>
  );
}

export default App;
