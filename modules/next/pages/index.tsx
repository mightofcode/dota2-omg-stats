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

export default withLoginUserRedux(({ posts, tabs, tab, hotPosts }) => {
  const router = useRouter();
  return (
    <>
      <PageHead />
      <Layout>
        <Container>
          <IndexPage posts={posts} tabs={tabs} tab={tab} hotPosts={hotPosts} />
        </Container>
      </Layout>
    </>
  );
});

export const getServerSideProps = withLoginUser(async (context) => {
  return {
    props: {},
  };
});
