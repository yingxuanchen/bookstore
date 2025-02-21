import {
  Box,
  Card,
  Collapse,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { Book } from "../types/types";
import useDebounce from "../hooks/useDebounce";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid2";
import Highlighter from "react-highlight-words";

const columns: { id: keyof Book; label: string }[] = [
  { id: "title", label: "Title" },
  { id: "author", label: "Author" },
  { id: "categories", label: "Categories" },
  { id: "rating", label: "Rating" },
];

function Explore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 800);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedRow, setExpandedRow] = useState("");

  useEffect(() => {
    getBooks(0);
  }, [debouncedSearch]);

  const getBooks = useCallback(
    async (page: number) => {
      try {
        const res = await fetcher.get(`/books?src=${debouncedSearch}&page=${page}`);
        // const res = await fetcher.get(`/books/elastic?src=${debouncedSearch}&page=${page}`);
        setBooks([...res.data.content]);
        setPage(res.data.pageable.pageNumber);
        setTotalCount(res.data.totalElements);
      } catch (error) {}
    },
    [debouncedSearch]
  );

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    getBooks(newPage);
  };

  const handleExpandRow = (bookId: string) => {
    if (expandedRow === bookId) {
      setExpandedRow("");
    } else {
      setExpandedRow(bookId);
    }
  };

  const getTableCellValue = (book: Book, colId: keyof Book) => {
    const value = book[colId];
    switch (colId) {
      case "title":
      case "author":
        return <Highlighter searchWords={debouncedSearch.split(" ")} textToHighlight={value as string} autoEscape />;
      case "categories":
        return (value as string[]).join("\n");
      case "rating":
        return value === -1 ? "-" : (value as number).toFixed(1);
    }
  };

  const expandedField = useCallback(
    (field: string, value: any) => {
      let htmlToDisplay;
      switch (field) {
        case "Description":
        case "Tags":
          htmlToDisplay = <Highlighter searchWords={debouncedSearch.split(" ")} textToHighlight={value} autoEscape />;
          break;
        default:
          htmlToDisplay = value;
      }

      return (
        <>
          <Typography component="span" sx={{ color: "text.secondary" }} variant="body2">
            {field}:&nbsp;
          </Typography>
          {htmlToDisplay}
        </>
      );
    },
    [debouncedSearch]
  );

  return (
    <>
      <TextField
        label="Search book"
        variant="standard"
        value={searchInput}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchInput(event.target.value);
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TablePagination
        component="div"
        count={totalCount}
        rowsPerPageOptions={[10]}
        rowsPerPage={10}
        page={page}
        onPageChange={handlePageChange}
      />
      <Table stickyHeader size="small" sx={{ whiteSpace: "pre-wrap" }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col) => (
              <TableCell key={col.id} sx={{ fontWeight: "bold" }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <Fragment key={book.id}>
              <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
                <TableCell sx={{ width: 0 }}>
                  <IconButton aria-label="expand row" size="small" onClick={() => handleExpandRow(book.id)}>
                    {expandedRow === book.id ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                  </IconButton>
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.id}>{getTableCellValue(book, col.id)}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={expandedRow === book.id} timeout="auto" unmountOnExit>
                    <Card sx={{ marginLeft: "4rem" }}>
                      <Grid container>
                        <Grid size={12}>{expandedField("Description", book.description)}</Grid>
                        <Grid size={6}>{expandedField("Year of Publication", book.yearOfPublish)}</Grid>
                        <Grid size={6}>{expandedField("Language", book.bookLanguage)}</Grid>
                        <Grid size={6}>{expandedField("Price", `$${book.price}`)}</Grid>
                        <Grid size={6}>
                          {expandedField("Tags", book.tags.length === 0 ? "-" : book.tags.join(", "))}
                        </Grid>
                        <Grid size={6}>{expandedField("Sold Count", book.soldCount)}</Grid>
                        <Grid size={6}>{expandedField("Seller", book.createdBy)}</Grid>
                      </Grid>
                    </Card>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Explore;
