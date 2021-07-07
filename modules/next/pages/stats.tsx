import { useRouter } from "next/router";
import styled from "styled-components";
import PageHead from "@/component/PageHead";
import * as React from "react";
import { withLoginUser, withLoginUserRedux } from "@/lib/user";
import { postApi } from "@/services/nextApi";
import Layout from "@/component/Layout";
import Container from "@/component/Container";
import IndexPage from "@/component/IndexPage";
import StatsPage from "@/component/StatsPage";

const Wrapper = styled.div``;

const FlexWrapper = styled.div``;

export default withLoginUserRedux(({ stats }) => {
  const router = useRouter();
  return (
    <>
      <PageHead />
      <Layout>
        <Container>
          <StatsPage stats={stats} />
        </Container>
      </Layout>
    </>
  );
});

export const getServerSideProps = withLoginUser(async (context) => {
  const stats = await postApi(`api/stats`, {});

  return {
    props: { stats: stats?.result },
  };
});
