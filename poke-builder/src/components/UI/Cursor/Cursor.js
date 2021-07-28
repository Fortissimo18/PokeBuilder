import React, { useState, useEffect } from 'react';
import classes from './Cursor.module.css';
import Auxilliary from '../../../hoc/Auxilliary';

function Cursor() {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        addEventListeners();
        handleLinkHoverEvents();
        return () => removeEventListeners();
    });

    const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        window.addEventListener("scroll", onscroll);
    };

    const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("scroll", onscroll);

    };

    const onMouseMove = (e) => {        
        setPosition({ x: window.pageXOffset + e.clientX - 15, y: window.pageYOffset + e.clientY - 15 });
    };

    const onMouseDown = () => {
        setClicked(true);
    };

    const onMouseUp = () => {
        setClicked(false);
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const handleLinkHoverEvents = () => {
        document.querySelectorAll("button").forEach((el) => {
            el.addEventListener("mouseover", () => setLinkHovered(true));
            el.addEventListener("mouseout", () => setLinkHovered(false));
        });
        document.querySelectorAll("a").forEach((el) => {
            el.addEventListener("mouseover", () => setLinkHovered(true));
            el.addEventListener("mouseout", () => setLinkHovered(false));
        });
    };

    let cursorClasses = [classes.Cursor];

    if (clicked) {
        cursorClasses.push(classes.Clicked);
    }
    if (hidden) {
        cursorClasses.push(classes.Hidden);
    }
    if (linkHovered) {
        cursorClasses.push(classes.Hovered);
    }

    return (
        <Auxilliary>
            <div
                className={cursorClasses.join(' ')}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
        </Auxilliary>
    );
}

export default Cursor;