import { store } from "@/store/store";
import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next/types";
import { Provider } from "react-redux";

const WithAuth = (
  WrappedComponent: NextComponentType<NextPageContext, AppProps, AppProps>
) => {
  const Wrapper = (props: AppProps) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };

  return Wrapper;
};

export default WithAuth;
