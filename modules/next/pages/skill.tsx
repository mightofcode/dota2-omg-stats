import { useRouter } from "next/router";
import styled from "styled-components";
import PageHead from "@/component/PageHead";
import * as React from "react";
import { withLoginUser, withLoginUserRedux } from "@/lib/user";
import { postApi } from "@/services/nextApi";
import Layout from "@/component/Layout";
import Container from "@/component/Container";
import IndexPage from "@/component/IndexPage";
import SkillPage from "@/component/SkillPage";

const Wrapper = styled.div``;

const FlexWrapper = styled.div``;

export default withLoginUserRedux(({ winrates }) => {
  const router = useRouter();
  return (
    <>
      <PageHead />
      <Layout>
        <Container>
          <SkillPage winrates={winrates} />
        </Container>
      </Layout>
    </>
  );
});

export const getServerSideProps = withLoginUser(async (context) => {
  const abilityWinrates = await postApi(`api/ability`, {});

  //console.log(abilityWinrates?.result?.winrates);
  return {
    props: {
      winrates: abilityWinrates?.result?.winrates,
    },
  };
});
