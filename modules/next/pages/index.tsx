import { useRouter } from "next/router";
import styled from "styled-components";
import PageHead from "@/component/PageHead";
import * as React from "react";
import { withLoginUser, withLoginUserRedux } from "@/lib/user";
import { postApi } from "@/services/nextApi";
import Layout from "@/component/Layout";
import Container from "@/component/Container";
import IndexPage from "@/component/IndexPage";

const Wrapper = styled.div``;

const FlexWrapper = styled.div``;

export default withLoginUserRedux(
  ({ heroWinrates, abilityWinrates, stats }) => {
    const router = useRouter();
    return (
      <>
        <PageHead />
        <Layout>
          <Container>
            <IndexPage
              stats={stats}
              heroWinrates={heroWinrates}
              abilityWinrates={abilityWinrates}
            />
          </Container>
        </Layout>
      </>
    );
  }
);

export const getServerSideProps = withLoginUser(async (context) => {
  const heroWinrates = await postApi(`api/hero`, {});
  const abilityWinrates = await postApi(`api/ability`, {});
  const stats = await postApi(`api/stats`, {});
  return {
    props: {
      stats: stats?.result,
      heroWinrates: heroWinrates?.result?.winrates,
      abilityWinrates: abilityWinrates?.result?.winrates,
    },
  };
});
