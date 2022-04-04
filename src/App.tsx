import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Record } from "./utils/types";
import { LIGHT_GREY, DARK_GREY } from "./utils/colors";
import Chart from "./components/Chart";
import RecordList from "./components/RecordList";

const StyledApp = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const StyledMenu = styled.div`
    max-width: 600px;
    min-height: 400px;
    margin: 10px;
`;

const StyledButtonAdd = styled.button`
    background-color: ${LIGHT_GREY};
    border: 1px solid ${LIGHT_GREY};
    border-radius: 5px;
    padding: 2px 8px;
    margin-bottom: 4px;
    &:hover {
        background-color: ${DARK_GREY};
    }
`;

const App: React.FC = () => {
    const [records, setRecords] = useState<Record[]>(
        JSON.parse(localStorage.getItem("records") || "[]")
    );

    const handleAdd = () => {
        const newRecords: Record[] = [
            ...records,
            { id: Date.now(), checked: true, label: "New", x: 50, y: 50 }
        ];
        localStorage.setItem("records", JSON.stringify(newRecords));
        setRecords(newRecords);
    };

    // const handleCheck = () => {
        
    //     localStorage.setItem("records", JSON.stringify(newRecords));
    //     setRecords(newRecords);
    // };

    const handleEdit = useCallback(
        (value: string | number | boolean, id: number, property: string) => {
            console.log("value: ", value);
            const newRecords: Record[] = records.map((record) =>
                record.id === id ? { ...record, [property]: value } : record
            );
            console.log("newRecords: ", newRecords);
            
            localStorage.setItem("records", JSON.stringify(newRecords));
            setRecords(newRecords);
        },
        [records]
    );

    const handleDelete = (id: number) => {
        const newRecords: Record[] = records.filter(
            (record) => record.id !== id
        );
        localStorage.setItem("records", JSON.stringify(newRecords));
        setRecords(newRecords);
    };

    return (
        <StyledApp>
            <Chart records={records} setRecords={setRecords} />
            <StyledMenu>
                <StyledButtonAdd type="submit" onClick={handleAdd}>
                    Add
                </StyledButtonAdd>
                <RecordList
                    records={records}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </StyledMenu>
        </StyledApp>
    );
};

export default App;
