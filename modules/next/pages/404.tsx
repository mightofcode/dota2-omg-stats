import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import PageHead from "@/component/PageHead";
import * as React from "react";
import NotFound from "@/component/notFound";
import { withLoginUser, withLoginUserRedux } from "@/lib/user";
import Layout from "@/component/Layout";
import Container from "@/component/Container";

const Wrapper = styled.div``;

const FlexWrapper = styled.div``;

export default withLoginUserRedux(() => {
  const router = useRouter();

  return (
    <>
      <PageHead title="nextjs-scaffold" />
      <Layout>
        <Container>
          <NotFound />
        </Container>
      </Layout>
    </>
  );
});
