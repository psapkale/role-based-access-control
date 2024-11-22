import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import { RecoilRoot } from "recoil";
import AuthModal from "./components/auth-modal";
import useUserRole from "./hooks/use-user-role";

function App() {
  const { isLoggedIn } = useUserRole();
  console.log(isLoggedIn);

  return (
    <RecoilRoot>
      <Layout>
        <Toaster position="top-right" />
        {isLoggedIn ? <Dashboard /> : <AuthModal />}
      </Layout>
    </RecoilRoot>
  );
}

export default App;
