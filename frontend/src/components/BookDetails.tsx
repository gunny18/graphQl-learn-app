import { GET_COMPLETE_BOOK_DATA } from "@/queries";
import { useQuery } from "@apollo/client";
import { FC } from "react";

type Props = {
  bookId: string;
};

const BookDetails: FC<Props> = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_COMPLETE_BOOK_DATA, {
    variables: {
      id: bookId,
    },
  });
  if (loading) return <p>Fetching Book Details...</p>;
  if (error) return <p>Error fetching book details {error.message}</p>;
  return <div>{JSON.stringify(data)}</div>;
};

export default BookDetails;
