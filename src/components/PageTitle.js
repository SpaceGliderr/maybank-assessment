import { Typography, Divider } from "@mui/material";

const PageTitle = (props) => {
  const { title } = props;

  return (
    <>
      <Typography variant="h4" sx={{ mt: "20px" }}>
        {title}
      </Typography>
      <Divider sx={{ m: "10px 0 20px" }} />
    </>
  );
};

export default PageTitle;
