import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { IBook } from "../types.ts";

let books: IBook[] = [
    {
        id: '1',
        name: "The Great Gatsby",
        author: "F.Scott Fitzgerald",
        genre: "fiction"
    },
    {
        id: '2',
        name: "Little Women",
        author: "Louisa May Alcott",
        genre: "fiction"
    },
    {
        id: '3',
        name: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "romance"
    },
    {
        id: '4',
        name: "1984",
        author: "George Orwell",
        genre: "sci-fi"
    },
    {
        id: '5',
        name: "Moby Dick",
        author: "Herman Melville",
        genre: "epic"
    },
    {
        id: '6',
        name: "Animal Farm",
        author: "George Orwell",
        genre: "allegory"
    },
]

const getBooks = ({ response }: { response: Response }) => {
    response.body = {
        success: true,
        data: books
    };
}

const getBook = ({ params, response }: { params: { id: string }, response: Response }) => {
    const book: IBook | undefined = books.find(b => b.id === params.id);

    if (book) {
        response.status = 200;
        response.body = {
            success: true,
            data: book
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: "No book found"
        }
    }
}

const addBook = async ({ request, response }: { request: Request, response: Response }) => {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 404;
        response.body = {
            success: false,
            message: "No data"
        }
    } else {
        const book: IBook = body.value as unknown as IBook;
        book.id = globalThis.crypto.randomUUID();
        books.push(book);
        response.status = 201;
        response.body = {
            success: true,
            data: book
        }
    }
}

const updateBook = async ({ params, request, response}: { params: { id: string}, request: Request, response: Response}) => {
    const book: IBook | undefined = books.find(b => b.id === params.id);

    if(book) {
        const body = await request.body()

        const updateData: { name?: string; author?: string; genre?: string; } = body.value as unknown as {
            name?: string | undefined;
            author?: string | undefined;
            genre?: string | undefined;
        };

        books = books.map(b => b.id === params.id ? {...b, ...updateData} : b);

        response.status = 200;
        response.body = {
            success: true,
            data: books
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: "No book found"
        }
    }
}

const deleteBook = ({ params, response}: { params: { id: string}, response: Response}) => {
    const book: IBook | undefined = books.find(b => b.id === params.id);

    if(book) {
        books = books.filter(b => b.id !== params.id);
        response.status = 200;
        response.body = {
            success: true,
            message: "Book removed",
            data: books
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: "No book found"
        }
    }

}

export { getBooks, getBook, addBook, updateBook, deleteBook }