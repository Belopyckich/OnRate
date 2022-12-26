import { Layout } from "antd";
import React from "react";

const { Header, Footer, Sider, Content } = Layout;

export const App = () => {
  return (
    <Layout className="test">
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
