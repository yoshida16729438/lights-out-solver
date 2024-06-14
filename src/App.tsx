import MainPage from "./components/pages/MainPage";
import Layout from "./components/templates/Layout";
import RealTimeContextProvider from "./providers/RealTimeProvider";
import ShowValueContextProvider from "./providers/ShowValueProvider";

function App() {
  return (
    <ShowValueContextProvider>
      <RealTimeContextProvider>
        <Layout>
          <MainPage />
        </Layout>
      </RealTimeContextProvider>
    </ShowValueContextProvider>
  );
}

export default App;
