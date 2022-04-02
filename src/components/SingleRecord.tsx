import React from "react";
import styled from "styled-components";
import { LIGHT_GREY, DARK_GREY } from "../utils/colors";

const StyledDiv = styled.div`
    margin: 4px;
`;

const StyledButton = styled.button`
    background-color: ${LIGHT_GREY};
    border: 1px solid ${LIGHT_GREY};
    border-radius: 5px;
    width: 100%;
    &:hover {
        background-color: ${DARK_GREY};
    }
`;

interface SingleRecordProps {
    id: number;
    label: string;
    x: number;
    y: number;
    handleEdit: (value: string | number, id: number, propert: string) => void;
    handleDelete: (id: number) => void;
}

const SingleRecord: React.FC<SingleRecordProps> = ({
    id,
    label,
    x,
    y,
    handleEdit,
    handleDelete
}) => {
    return (
        <>
            <StyledDiv>
                <input
                    type="text"
                    style={{
                        width: "100%",
                        paddingLeft: "6px",
                        boxSizing: "border-box",
                        borderRadius: "5px",
                        border: `1px solid ${LIGHT_GREY}`
                    }}
                    value={label}
                    maxLength={15}
                    onChange={(e) => handleEdit(e.target.value, id, "label")}
                />
            </StyledDiv>
            <StyledDiv>
                <input
                    type="number"
                    style={{
                        width: "100%",
                        paddingLeft: "6px",
                        boxSizing: "border-box",
                        borderRadius: "5px",
                        border: `1px solid ${LIGHT_GREY}`
                    }}
                    value={x}
                    min={0}
                    max={100}
                    onChange={(e) => handleEdit(e.target.value, id, "x")}
                />
            </StyledDiv>
            <StyledDiv>
                <input
                    type="number"
                    style={{
                        width: "100%",
                        paddingLeft: "6px",
                        boxSizing: "border-box",
                        borderRadius: "5px",
                        border: `1px solid ${LIGHT_GREY}`
                    }}
                    value={y}
                    min={0}
                    max={100}
                    onChange={(e) => handleEdit(e.target.value, id, "y")}
                />
            </StyledDiv>
            <StyledDiv>
                <StyledButton onClick={() => handleDelete(id)}>
                    Delete
                </StyledButton>
            </StyledDiv>
        </>
    );
};

export default SingleRecord;
