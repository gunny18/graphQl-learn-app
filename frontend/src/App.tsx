import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const App = () => {
  return (
    <div className="flexd flex-col min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold tracking-tighter">
        Book App
      </h1>
      <BookList />
      <AddBook />
    </div>
  );
};

export default App;
