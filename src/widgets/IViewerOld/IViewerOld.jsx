import React, { useEffect, useRef } from "react";

export function IViewerOld({ srcs = [] }) {
    const mainRef = useRef(null);
    const scaleRef = useRef(1);
    const posRef = useRef({ x: 0, y: 0 });
    const scrollRef = useRef({ x: 0, y: 0 });
    const lastCorrectionRef = useRef({ x: 0, y: 0 });
    const touchRef = useRef({
        start: 1,
        end: 1,
        center: { x: 0, y: 0 },
    });
    const correctionBodyMain = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const mainEl = mainRef.current;
        if (!mainEl) return;

        mainEl.style.transition = "all 0.3s ease";

        const images = srcs.map((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "zoomable";
            img.onload = imageInit;
            return img;
        });

        mainEl.append(...images);

        function handleWheel(event) {
            if (event.ctrlKey) {
                event.preventDefault();
                const x = absolutePosition(event.pageX, mainEl.offsetWidth, correctionBodyMain.current.x);
                const y = absolutePosition(event.pageY, mainEl.offsetHeight, correctionBodyMain.current.y);

                if (event.deltaY < 0) {
                    scaleAt({ x, y }, 1.1);
                } else {
                    scaleAt({ x, y }, 1 / 1.1);
                }
                images.forEach((img) => applyTo(img));
            }
        }

        function handleTouchStart(event) {
            const touches = event.touches;
            if (touches.length > 1) {
                const { firstX, firstY, secondX, secondY } = findTwoTouchesPositions(touches);
                if (firstX && firstY && secondX && secondY) {
                    touchRef.current.start = Math.hypot(firstX - secondX, firstY - secondY) || 1;
                    touchRef.current.center = { x: (firstX + secondX) / 2, y: (firstY + secondY) / 2 };
                }
            }
        }

        function handleTouchMove(event) {
            const touches = event.touches;
            if (touches.length > 1) {
                const { firstX, firstY, secondX, secondY } = findTwoTouchesPositions(touches);
                if (firstX && firstY && secondX && secondY) {
                    touchRef.current.end = Math.hypot(firstX - secondX, firstY - secondY) || 1;
                    const scaleFactor = touchRef.current.end / touchRef.current.start;
                    if (scaleFactor !== 1) {
                        const step = scaleFactor > 1 ? 1 + 0.03 * scaleFactor : 1 / (1 + 0.03 * scaleFactor);
                        scaleAt({ x: touchRef.current.center.x, y: touchRef.current.center.y }, step);
                        images.forEach((img) => applyTo(img));
                        touchRef.current.start = touchRef.current.end;
                    }
                }
            }
        }

        mainEl.addEventListener("wheel", handleWheel, { passive: false });
        mainEl.addEventListener("touchstart", handleTouchStart, { passive: false });
        mainEl.addEventListener("touchmove", handleTouchMove, { passive: false });

        window.addEventListener("resize", createCorrection);

        return () => {
            mainEl.removeEventListener("wheel", handleWheel);
            mainEl.removeEventListener("touchstart", handleTouchStart);
            mainEl.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", createCorrection);
        };
    }, [srcs]);

    function imageInit(event) {
        const img = event.target;
        createCorrection();
    }

    function createCorrection() {
        const mainEl = mainRef.current;
        if (mainEl) {
            correctionBodyMain.current.x = (document.body.clientWidth - mainEl.offsetWidth) / 2;
            correctionBodyMain.current.y = (document.body.clientHeight - mainEl.offsetHeight) / 2;
        }
    }

    function scaleAt(at, amount) {
        const mainEl = mainRef.current;
        const newScale = scaleRef.current * amount;
        const differenceX = mainEl.clientWidth * (amount - 1);
        const differenceY = mainEl.clientHeight * (amount - 1);
        const percX = at.x / (mainEl.clientWidth / 2);
        const percY = at.y / (mainEl.clientHeight / 2);

        const correctionX = (differenceX / 2) * percX;
        const correctionY = (differenceY / 2) * percY;

        scrollRef.current.x = mainEl.scrollLeft * amount + differenceX / 2 + correctionX;
        scrollRef.current.y = mainEl.scrollTop * amount + differenceY / 2 + correctionY;

        scaleRef.current = newScale;
        lastCorrectionRef.current = { x: correctionX, y: correctionY };
        mainEl.scrollLeft = scrollRef.current.x;
        mainEl.scrollTop = scrollRef.current.y;
    }

    function applyTo(el) {
        el.style.width = `${el.naturalWidth * scaleRef.current}px`;
        el.style.height = `${el.naturalHeight * scaleRef.current}px`;
    }

    function absolutePosition(posPage, posClient, indent) {
        return posPage - posClient / 2 - indent;
    }

    function findTwoTouchesPositions(touches = []) {
        const first = touches.item(0);
        const second = touches.item(1);
        if (!first || !second) return {};
        const mainEl = mainRef.current;
        return {
            firstX: absolutePosition(first.pageX, mainEl.offsetWidth, correctionBodyMain.current.x),
            firstY: absolutePosition(first.pageY, mainEl.offsetHeight, correctionBodyMain.current.y),
            secondX: absolutePosition(second.pageX, mainEl.offsetWidth, correctionBodyMain.current.x),
            secondY: absolutePosition(second.pageY, mainEl.offsetHeight, correctionBodyMain.current.y),
        };
    }

    return <div ref={mainRef} style={{ overflow: "auto", position: "relative", width: "100%", height: "100%" }} />;
}


