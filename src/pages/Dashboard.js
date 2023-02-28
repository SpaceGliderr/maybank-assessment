import ProductListing from "../components/ProductListing";
import PageTitle from "../components/PageTitle";

const Dashboard = () => {
  return (
    <>
      <PageTitle title="Dashboard" />
      <ProductListing isDashboard />
    </>
  );
};

export default Dashboard;
