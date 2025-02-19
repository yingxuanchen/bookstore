import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { Book } from "../types/types";
import useDebounce from "../hooks/useDebounce";

const columns: { id: keyof Book; label: string }[] = [
  { id: "title", label: "Title" },
  { id: "author", label: "Author" },
];

function Explore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 800);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getBooks(0);
  }, [debouncedSearch]);

  const getBooks = useCallback(
    async (page: number) => {
      try {
        const res = await fetcher.get(`/books?src=${debouncedSearch}&page=${page}`);
        // const res = await fetcher.get(`/books/elastic?src=${debouncedSearch}`);
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
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              {columns.map((col) => {
                return <TableCell key={col.id}>{book[col.id]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Explore;
