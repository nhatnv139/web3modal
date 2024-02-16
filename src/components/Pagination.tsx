import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CustomIcons({ page, pageSize, totalCount, onPageChange }) {
  const pageCount = Math.ceil(totalCount / pageSize);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        size="medium"
        count={pageCount}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        sx={{
          "& .MuiPaginationItem-page, & .Mui-selected": {
            color: "white", 
          },
          "& .MuiSvgIcon-root": {
            fill: "white", 
          },
        }}
      />
    </Stack>
  );
}