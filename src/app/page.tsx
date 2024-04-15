"use client";

import MenuPage from "./menu/page";
import { Provider } from "react-redux";
import { store } from '../redux/store';

const Home = () => {
  return (
    <Provider store={store}>
      <MenuPage />
    </Provider>
  );
};
export default Home;
