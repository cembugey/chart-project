import React from "react";
import styled from "styled-components";
import { Record } from "../utils/types";
import { LIGHT_BLUE, WHITE } from "../utils/colors";
import SingleRecord from "./SingleRecord";

interface RecordListProps {
    records: Record[];
    handleEdit: (value: string | number | boolean, id: number, propert: string) => void;
    handleDelete: (id: number) => void;
}

const StyledGrid = styled.div`
    display: grid;
    width: 500px;
    grid-template-columns: 5% 35% 20% 20% 20%;
`;

const StyledBadge = styled.div`
    text-align: center;
    font-size: 13px;
    background-color: ${LIGHT_BLUE};
    color: ${WHITE};
    font-family: sans-serif;
    margin: 2px;
    border-radius: 5px;
`;

const RecordList: React.FC<RecordListProps> = ({
    records,
    handleEdit,
    handleDelete
}) => {
    return (
        <StyledGrid>
            <StyledBadge></StyledBadge>
            <StyledBadge>Label</StyledBadge>
            <StyledBadge>Vision</StyledBadge>
            <StyledBadge>Ability</StyledBadge>
            <StyledBadge>Delete</StyledBadge>
            {records.map((record) => {
                return (
                    <SingleRecord
                        key={record.id}
                        id={record.id}
                        checked={record.checked}
                        label={record.label}
                        x={record.x}
                        y={record.y}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                );
            })}
        </StyledGrid>
    );
};

export default RecordList;
