import React, { useState } from 'react';
import { visuallyHidden } from '@mui/utils';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { 
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import type { Tag, Order } from '../types';
import rootStore from '../stores/RootStore';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: "50%"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: "50%"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export type TagsTableProps = {
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
}

const TagsTable: React.FC<TagsTableProps> = ({
  page,
  rowsPerPage,
  handleChangePage
}) => {

  const { tagsStore: { 
    sortTags,
    tags } 
  } = rootStore;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Tag>();

  const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Tag,
  ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      sortTags(isAsc ? 'desc' : 'asc', property)
  };

  const createSortHandler = (property: keyof Tag) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
  };

  const tagTableBody = tags.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tag, index) => (
      <StyledTableRow key={index}>
          <StyledTableCell>{tag.name}</StyledTableCell>
          <StyledTableCell>{tag.count}</StyledTableCell>
      </StyledTableRow>
    ))

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>
                        <TableSortLabel
                            active={orderBy === "name"}
                            direction={orderBy === "name" ? order : 'asc'}
                            onClick={createSortHandler("name")}
                        >
                            Name
                            {orderBy === "name" ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                    <StyledTableCell>
                        <TableSortLabel
                            active={orderBy === "count"}
                            direction={orderBy === "count" ? order : 'asc'}
                            onClick={createSortHandler("count")}
                        >
                            Related posts
                            {orderBy === "count" ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tagTableBody}
            </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
          component="div"
          count={tags.length}
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
      />
    </>
  )
}

export default TagsTable