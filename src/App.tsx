import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <Toaster position="top-right" />
        <Dashboard />
      </Layout>
    </RecoilRoot>
  );
}

export default App;
