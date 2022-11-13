import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from "react";

export default function viewList({ data }: any){
    return (
    <div>
    <h1 className="prose prose-2xl prose-blue">Google Book List</h1>
    <br />
    <h2>What are you looking for?</h2>
    <br />
    <Search />
    <br />
    <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        </tr>
                </thead>
                <tbody>
                    {data.items.map((item: any, index: number) => (
                        <tr>
                            <th>{index+1}</th>
                            <td>{item.volumeInfo.title}</td>
                            <td>{item.volumeInfo.authors}</td>
                            <td>{item.volumeInfo.description}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>
    )
}

export function Search() {
    const [text, setText] = useState("")
    const router = useRouter()
    const q = text
    return (
        <><input className="input input-bordered input-info w-full max-w-xs"
            placeholder="how to eat healthy"
            value={text}
            onChange={(event) => setText(event.target.value)} />
            <br />
            <br />
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" type="button" onClick={(text) => router.push(
                {
                    pathname: '',
                    query: { query: q },
                })}>
                Search
            </button>
            <br />
            <br />
            <p>Result of {text}</p>
            </>         
  )
}

export async function getServerSideProps(context: any){
    const id = context.query.query;
    const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + id)
    const data = await res.json()
    return { props: { data } }
}