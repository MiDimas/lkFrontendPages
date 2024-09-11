import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";



interface IViewerProps {
    onClose?: ()=>void;
    isOpen?: boolean;
    srcs?: string[];
}
interface SizesProps {
    [key: string]: Coords;
}
interface Coords {
    x: number;
    y: number;
}
interface TouchProps {
    start:number;
    end:number;
    center: Coords;
}

const absolutePosition = (posPage:number, posClient:number, indent:number) => posPage -( posClient / 2) - indent;


export const IViewer = (props: IViewerProps) => {
    const {isOpen, onClose, srcs} = props;


    const mainRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [startSizes, setStartSizes] = useState<SizesProps>({});
    const [currentSizes, setCurrentSizes] = useState({});
    const [correctionBodyMain, setCorrectionBodyMain] = useState<Coords>({x:0, y:0});
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState<Coords>({x:0,y:0});
    const [newScroll, setNewScroll] = useState<Coords>();
    const [lastCorrection, setLastCorrection] = useState<Coords>({x:0,y:0});
    const [touch, setTouch] = useState<TouchProps>({
        start: 1,
        end:1,
        center: {x:0,y:0},
    });
    useLayoutEffect(() => {
        if(!srcs) return;
        for (const src of srcs){
            const img = new Image();
            img.src = src;

            setImages((prev) => [...prev, img]);
            setStartSizes((prevState) => ({...prevState,
                [src]:{x: img.scrollWidth, y: img.scrollHeight}
            }));
            setCorrectionBodyMain((prevState) => ({...prevState,
                [src]:{x: 0, y: 0}
            }));
        }
    }, [setImages, setStartSizes, setCorrectionBodyMain, srcs]);

    const scaleAt = useCallback( (at:Coords, amount:number) => {
        setScale((prevScale) => {
            const newScale = prevScale * amount;
            const mainEl = mainRef.current;
            if(!mainEl)return prevScale;

            const differenceX = mainEl.clientWidth*amount - mainEl.clientWidth ;
            const differenceY = mainEl.clientHeight*amount - mainEl.clientHeight;
            const halfX = mainEl.clientWidth/2;
            const halfY = mainEl.clientHeight/2;
            const percX = at.x/halfX;
            const percY = at.y/halfY;

            const correctionX = differenceX/2*percX;
            const correctionY = differenceY/2*percY;

            const newScrollX = mainEl.scrollLeft * amount + differenceX/2 + correctionX;
            const newScrollY = mainEl.scrollTop * amount + differenceY/2 + correctionY;
            mainEl.scrollLeft = newScrollX;
            mainEl.scrollTop = newScrollY;
            return newScale;
        });}, []);


    const handleWheel = useCallback((event: WheelEvent) => {
        const mainEl = mainRef.current;
        if (!mainEl) return;
        if (event.ctrlKey) {
            event.preventDefault();
            const x = absolutePosition(event.pageX, mainEl.offsetWidth, correctionBodyMain.x);
            const y = absolutePosition(event.pageY, mainEl.offsetHeight, correctionBodyMain.y);

            if (event.deltaY < 0) {
                scaleAt({ x, y }, 1.1);
            } else {
                scaleAt({ x, y }, 1 / 1.1);
            }
        }
    }, [correctionBodyMain, scaleAt]);

    const findTwoTouchesPositions = useCallback((touches: TouchList) => {

        const first = touches.item(0);
        const second = touches.item(1);
        if (!first || !second || !mainRef.current) return {};
        return {
            firstX: absolutePosition(first.pageX, mainRef.current.offsetWidth, correctionBodyMain.x),
            firstY: absolutePosition(first.pageY, mainRef.current.offsetHeight, correctionBodyMain.y),
            secondX: absolutePosition(second.pageX, mainRef.current.offsetWidth, correctionBodyMain.x),
            secondY: absolutePosition(second.pageY, mainRef.current.offsetHeight, correctionBodyMain.y),
        };
    }, [correctionBodyMain]);

    const handleTouchStart = useCallback((event: TouchEvent)=> {
        const mainEl = mainRef.current;
        const touches = event.touches;
        if (touches.length > 1) {
            const { firstX, firstY, secondX, secondY } = findTwoTouchesPositions(touches);
            if(firstX === undefined || firstY === undefined ||
                secondX ===undefined ||secondY ===undefined) return;
            setTouch((touch) => ({
                ...touch,
                start: Math.hypot(firstX - secondX, firstY - secondY) || 1,
                center: { x: (firstX + secondX) / 2, y: (firstY + secondY) / 2 },
            }));
        }
    }, [findTwoTouchesPositions]);

    const handleTouchMove = useCallback((event:TouchEvent) => {
        const touches = event.touches;
        if (touches.length > 1) {
            const { firstX, firstY, secondX, secondY } = findTwoTouchesPositions(touches);
            if(firstX === undefined || firstY === undefined ||
                secondX ===undefined ||secondY ===undefined) return;
            const endDistance = Math.hypot(firstX - secondX, firstY - secondY) || 1;
            if (touch.start !== endDistance) {
                const diff = endDistance / touch.start;
                const step = diff > 1 ? 1 + 0.03 * diff : 1 / (1 + 0.03 * diff);
                scaleAt({ x: touch.center.x, y: touch.center.y }, step);
                setTouch({ ...touch, start: endDistance });
            }
        }
    }, [findTwoTouchesPositions, scaleAt, touch]);


    useEffect(() => {
        const mainEl = mainRef.current;
        if (mainEl) {
            mainEl.style.transition = "all 0.3s ease";
            mainEl.append(...images);



            mainEl.addEventListener("wheel", handleWheel, { passive: false });
            mainEl.addEventListener("touchstart", handleTouchStart, { passive: false });
            mainEl.addEventListener("touchmove", handleTouchMove, { passive: false });

            return () => {
                mainEl.removeEventListener("wheel", handleWheel);
                mainEl.removeEventListener("touchstart", handleTouchStart);
                mainEl.removeEventListener("touchmove", handleTouchMove);
            };
        }
    }, [handleWheel, handleTouchStart, handleTouchMove, images, touch]);





    return <div ref={mainRef} style={{ overflow: "auto", position: "relative" }}></div>;
};