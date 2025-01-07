import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS } from "@/queries";
import { ADD_BOOK } from "@/mutations";

const AddBookFormSchema = z.object({
  title: z.string().min(1, { message: "Atleast 1 character needed" }),
  genre: z.string().min(1, { message: "Atleast 1 character needed" }),
  authorId: z.string().min(1, { message: "Atleast 1 character needed" }),
});

type AddBookFormType = z.infer<typeof AddBookFormSchema>;

const AddBook = () => {
  const form = useForm<AddBookFormType>({
    resolver: zodResolver(AddBookFormSchema),
    defaultValues: {
      title: "",
      genre: "",
      authorId: "",
    },
  });

  const [addBook, { loading: loading1, error: error1 }] = useMutation(
    ADD_BOOK,
    {
      refetchQueries: [GET_BOOKS],
    }
  );

  const handleAddBook = (values: AddBookFormType) => {
    addBook({
      variables: {
        title: values.title,
        authorId: values.authorId,
        genre: values.genre,
      },
    });
    form.reset();
  };

  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading authors!</p>;
  if (error) return <p>Coould not fetch authors!</p>;

  return (
    <section className="flex flex-col gap-2 mt-5 w-1/4">
      <h1 className="text-4xl font-bold">Add a new Book!</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddBook)} className="flex flex-col gap-4">
          {error1 && <p>Error adding book {error1.message}</p>}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select the author</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an author to continue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.authors.map((a: Record<string, string>) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button disabled={loading1}>
            {loading1 ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default AddBook;
