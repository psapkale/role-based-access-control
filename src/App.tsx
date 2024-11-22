import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import { useRecoilValue } from "recoil";
import AuthModal from "./components/auth-modal";
import { loginState } from "./store/atoms/login-state";

function App() {
  const isLoggedIn = useRecoilValue(loginState);

  return (
    <Layout>
      <Toaster position="top-right" />
      {isLoggedIn ? <Dashboard /> : <AuthModal />}
    </Layout>
  );
}

export default App;
