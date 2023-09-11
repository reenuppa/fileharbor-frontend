import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface paramType {
  portfolio_id: string | string[] | undefined;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 35,
      height: 35,
      fontSize: "0.9rem",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const UserAvatar = (param: paramType) => {
  const api = require("apiCalls");
  const [last_modified_by, setLastModified] = useState({
    first_name: "",
    last_name: "",
  });
  useEffect(() => {
    const fetchPortfolios = async () => {
      const portfolio = await api.getPortfolioByID(param.portfolio_id);
      const userName = await api.getUserByID(portfolio.data.last_modified_by);
      setLastModified(userName.data);
    };
    fetchPortfolios();
  }, []);

  return (
    <Box display="flex" justifyContent="left" alignItems="center">
      <Avatar
        {...stringAvatar(
          last_modified_by.first_name + " " + last_modified_by.last_name
        )}
      />
      <Box ml={2} textAlign="left">
        <Typography variant="subtitle1" component="h3">
          {last_modified_by.first_name + " " + last_modified_by.last_name}
        </Typography>
      </Box>
    </Box>
  );
};
export default UserAvatar;
