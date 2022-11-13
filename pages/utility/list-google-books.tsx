import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function viewList({ data }: any){
    return (
    <div>
    <h1>Google Book List</h1>
    <h2>Please set your search word on keyword parameter</h2>
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
                        <tr key={item.id}>
                            <th>{index+1}</th>
                            <td>{item.volumeInfo.title || 'Title'}</td>
                            <td>{item.volumeInfo.authors || 'Author'}</td>
                            <td>{item.volumeInfo.description  || 'Desciption'}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>
    )
}

export async function getServerSideProps(context: any){
    const id = context.query.keyword;
    const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + id)
    const data = await res.json()
    
    return { props: { data } }
}

