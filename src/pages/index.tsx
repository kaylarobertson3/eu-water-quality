import React from "react";
import Layout from "@components/layout";
import FilterByCity from "@components/FilterByCity";
import Seo from "../components/Seo";

const IndexPage = () => (
  <Layout>
    <Seo />
    <FilterByCity />
  </Layout>
);

export default IndexPage;
