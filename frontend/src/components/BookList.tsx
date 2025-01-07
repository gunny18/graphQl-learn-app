import { GET_BOOKS } from "@/queries";
import { useQuery } from "@apollo/client";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">All Books</h1>
      <ul>
        {data.books.map((b: Record<string, string>) => (
          <li className="font-bold text-blue-400" key={b.id}>
            {b.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
