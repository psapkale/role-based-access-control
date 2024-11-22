import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import { RecoilRoot } from "recoil";
import { useLocalStorage } from "./hooks/use-local-storage";
import { AuthStatus } from "./types";
import AuthModal from "./components/auth-modal";

function App() {
   const [userAuth, setUserAuth] = useLocalStorage<AuthStatus>("user", {
      name: "",
      email: "",
      role: "",
      password: "",
      isLoggedIn: false,
   });

   console.log(userAuth);

   return (
      <RecoilRoot>
         <Layout>
            <Toaster position="top-right" />
            {userAuth.isLoggedIn ? <Dashboard /> : <AuthModal />}
         </Layout>
      </RecoilRoot>
   );
}

export default App;
