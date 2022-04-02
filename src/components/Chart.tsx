import React, { Fragment } from "react";
import styled from "styled-components";
import { Record } from "../utils/types";
import {
    DARK_GREY,
    DARK_BLUE,
    LIGHT_GREY,
    LIGHT_BLUE,
    WHITE
} from "../utils/colors";

const StyledPoint = styled.span`
    height: 16px;
    width: 16px;
    background-color: ${DARK_BLUE};
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: ${({ x }: Coordinate) => (x ? `${4 * x - 8}px` : `0px`)};
    bottom: ${({ y }: Coordinate) => (y ? `${4 * y - 8}px` : `0px`)};
`;

const StyledPointLabel = styled.span`
    font-size: 13px;
    font-family: sans-serif;
    color: ${DARK_BLUE};
    position: absolute;
    left: 15px;
    top: 15px;
`;

const StyledChart = styled.div`
    border: 2px solid ${DARK_GREY};
    width: 400px;
    height: 400px;
    margin: 10px;
    position: relative;
`;

const StyledInnerDiv = styled.div`
    width: 50%;
    height: 50%;
    position: relative;
    box-sizing: border-box;
    border: 1px solid ${LIGHT_GREY};
    float: left;
    text-align: center;
    padding: 16px;
`;

const StyledLabelX = styled.span`
    display: flex;
    position: absolute;
    height: 50px;
    bottom: -15px;
    left: -38px;
`;

const StyledLabelY = styled.span`
    display: flex;
    position: absolute;
    height: 50px;
    bottom: 30px;
    left: -115px;
    transform: rotate(-90deg);
`;

const StyledArrow = styled.span`
    display: block;
    margin: 44px 0px;
    width: 5px;
    height: 5px;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    transform: rotate(135deg);
    &:after {
        content: "";
        display: block;
        width: 2px;
        height: 20px;
        background-color: black;
        transform: rotate(-45deg) translate(6px, 3px);
        left: 0;
        top: 0;
    }
`;

const StyledLabelTextX = styled.span`
    font-size: 13px;
    margin: 40px 20px 0px 40px;
`;

const StyledLabelTextY = styled.span`
    font-size: 13px;
    margin: 40px 20px 00px 30px;
`;

const StyledBadge = styled.span`
    text-align: center;
    font-size: 13px;
    position: absolute;
    left: 40px;
    right: 40px;
    background-color: ${LIGHT_BLUE};
    color: ${WHITE};
    margin: 2px;
    padding: 2px 10px;
    border-radius: 5px;
`;

const StyledBadgeTop = styled(StyledBadge)`
    top: 5px;
`;

const StyledBadgeBottom = styled(StyledBadge)`
    bottom: 5px;
`;

interface ChartProps {
    records: Record[];
    setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
}

interface Coordinate {
    x: number;
    y: number;
}

const Chart: React.FC<ChartProps> = ({ records, setRecords }) => {
    const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    const onDragStart = (
        event: React.DragEvent<HTMLSpanElement>,
        record: Record
    ): void => {
        event.dataTransfer.setData("id", record.id.toString());
        event.dataTransfer.setData("x", record.x.toString());
        event.dataTransfer.setData("y", record.y.toString());
        event.dataTransfer.setData("startX", event.clientX.toString());
        event.dataTransfer.setData("startY", event.clientY.toString());
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        const id: number = parseInt(event.dataTransfer.getData("id"));
        const x: number = parseInt(event.dataTransfer.getData("x"));
        const y: number = parseInt(event.dataTransfer.getData("y"));
        const startX: number = parseInt(event.dataTransfer.getData("startX"));
        const startY: number = parseInt(event.dataTransfer.getData("startY"));
        const endX: number = event.clientX;
        const endY: number = event.clientY;
        const newRecords: Record[] = records.map((record) =>
            record.id === id
                ? {
                      ...record,
                      x: x + Math.floor((endX - startX) / 4),
                      y: y + Math.floor((startY - endY) / 4)
                  }
                : record
        );
        localStorage.setItem("records", JSON.stringify(newRecords));
        setRecords(newRecords);
    };

    return (
        <StyledChart
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e)}
        >
            <StyledInnerDiv>
                <StyledBadgeTop>Challengers</StyledBadgeTop>
            </StyledInnerDiv>
            <StyledInnerDiv>
                <StyledBadgeTop>Leaders</StyledBadgeTop>
            </StyledInnerDiv>
            <StyledInnerDiv>
                <StyledBadgeBottom>Niche Players</StyledBadgeBottom>
            </StyledInnerDiv>
            <StyledInnerDiv>
                <StyledBadgeBottom>Visionaries</StyledBadgeBottom>
            </StyledInnerDiv>
            <StyledLabelY>
                <StyledLabelTextY>Ability to execute</StyledLabelTextY>
                <StyledArrow />
            </StyledLabelY>
            <StyledLabelX>
                <StyledLabelTextX>Completeness of vision</StyledLabelTextX>
                <StyledArrow />
            </StyledLabelX>
            {records.map((record) => {
                return (
                    <Fragment key={record.id}>
                        <StyledPoint
                            x={record.x}
                            y={record.y}
                            draggable
                            onDragStart={(e) => onDragStart(e, record)}
                        >
                            <StyledPointLabel>{record.label}</StyledPointLabel>
                        </StyledPoint>
                    </Fragment>
                );
            })}
        </StyledChart>
    );
};

export default Chart;
