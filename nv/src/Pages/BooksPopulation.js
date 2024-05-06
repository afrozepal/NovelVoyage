import React from "react";
import '../App.css'
import { Nav } from '../Component/nav';
import BooksTable from "../Component/booksTable";

function BooksPopulation() {
    return (
        <div className="populatedpage">
            <Nav></Nav>
            <BooksTable></BooksTable>
        </div>
    );
}

export default BooksPopulation