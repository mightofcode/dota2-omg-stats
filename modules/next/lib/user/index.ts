import Cookies from "cookies";
import { postApi } from "@/services/nextApi";
import { useDispatch } from "react-redux";
import { useEffect, useLayoutEffect } from "react";

export function withLoginUser(getServerSideProps) {
  return async function (context) {
    const propsPromise = getServerSideProps(context);
    const [props] = await Promise.all([propsPromise]);
    return {
      ...props,
      props: {
        ...props.props,
        loginUser: {},
      },
    };
  };
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function withLoginUserRedux(fnComponent) {
  return ({ loginUser, ...props }) => {
    const dispatch = useDispatch();
    useIsomorphicLayoutEffect(() => {}, [loginUser]);
    return fnComponent(props);
  };
}
