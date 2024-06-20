import {Modal} from "shared/ui/Modal/Modal";
import cls from "./IViewer.module.css";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";


interface IViewerProps {
    onClose?: ()=>void;
    isOpen?: boolean;
    srcs?: string[];
}
const scale = (oldVal: number, amount: number = 1.1): number => {
    return oldVal *= amount;
};
export const IViewer = (props: IViewerProps) => {
    const {
        isOpen,
        onClose,
        srcs = []
    } = props;
    const [ startSizes , setStartSizes] = useState<OptionalRecord<string, number>>({});
    const [ sizes , setSizes] = useState<OptionalRecord<string, number>>({});
    const [cofs, setCofs] = useState({});
    const [sizeCorrection, setSizeCorrection] = useState(0);
    const [wheelChange, setWheelChange] = useState(false);
    const [lastPositionScroll, setLastPositionScroll] = useState<{x:number; y:number;}>({x: 0, y:0});
    const [lastPositionCursor, setLastPositionCursor] = useState<{x:number; y:number;}>({x: 0, y:0});
    const [startScroll, setStartScroll] = useState<{x:number; y:number;}>({x: 0, y:0});
    const [initScroll, setInitScroll] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const widthWindow = document.body.clientWidth;
        if(srcs && srcs.length){
            srcs.forEach((src, index) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {

                    const width = img.width;
                    const height =  img.height;
                    let cof =1;
                    if(width>widthWindow){
                        cof = widthWindow/width;
                    }

                    setCofs((prevState)=> ({...prevState, [index]: cof }));
                    setStartSizes((prev)=>({...prev, [`width${index}`]: width*cof, [`height${index}`]: height*cof }));
                    setSizes((prev)=>({...prev, [`width${index}`]: width*cof, [`height${index}`]: height*cof }));
                };
            });

        }
    }, [srcs]);

    const changeScroll = useCallback( (ev: WheelEvent) => {
        if(ev.ctrlKey){
            ev.preventDefault();
            if(!initScroll && ref.current){
                setInitScroll(true);
                setStartScroll({x: ref.current.scrollWidth, y:ref.current.scrollHeight});
            }
            setSizeCorrection(() => - ev.deltaY);
            setWheelChange(prev => !prev);
            setLastPositionCursor({x: ev.clientX, y: ev.clientY});
            setLastPositionScroll({x: ref.current?.scrollLeft ?? 0, y: ref.current?.scrollTop ?? 0});
            console.log(ev);
        }
    }, [initScroll]);

    const changeTouch = useCallback((ev:TouchEvent) => {
        console.log(ev);
    }, []);

    useEffect(() => {
        window.addEventListener("wheel", changeScroll, {passive: false});
        window.addEventListener("touchstart", changeTouch, {passive: false});
        window.addEventListener("touchmove", changeTouch, {passive: false});
        window.addEventListener("touchend", changeTouch, {passive: false});



        return () => {
            window.removeEventListener("wheel", changeScroll);
        };
    }, [changeScroll, changeTouch]);

    useEffect(()=> {
        setSizes(prevState => {
            const newObj = Object.fromEntries(Object.entries(prevState).map(([key , value]) => {
                if(value){
                    const start = startSizes[key] ?? 0;
                    const newVal = scale(value, sizeCorrection>0 ? 1.1: 1/1.1);
                    return [key, (newVal > start * 2 || newVal < start*0.5) ? value: newVal];
                }
                else {
                    return [key, value];
                }
            }
            ));
            return newObj;
        });
        // eslint-disable-next-line
    },   [wheelChange, setSizes]);

    useEffect (()  => {
        requestAnimationFrame( () => {

            if(ref.current){
                // const w = window.innerWidth;
                // const h = window.innerHeight;
                // const correctionW = startScroll.x < ref.current.scrollWidth ? startScroll.x - ref.current.scrollWidth : 0;
                // const correctionH = startScroll.y < ref.current.scrollHeight ? startScroll.y - ref.current.scrollHeight : 0;
                // console.log(correctionH);
                // const x  = Math.round(-((w/2) - lastPositionScroll.x) - (correctionW /10));
                // const y = Math.round(-((h/2) - lastPositionScroll.y) - (correctionH/10));
                // console.log({x,y, obj: ref.current.scrollHeight});
                // ref.current.scrollBy(x>50|| x<-50 ? x : 0, y>50 || y<-50 ? y : 0 );

                // const correctionW = ref.current.scrollWidth / startScroll.x;
                // const correctionH = ref.current.scrollHeight / startScroll.y;
                // console.log(startScroll);
                // console.log(lastPositionScroll);
                // console.log(ref.current.scrollHeight, ref.current.scrollWidth);
                // console.log(lastPositionScroll.y * correctionH);
                // const correctionToClientH = ref.current.clientHeight / 2;
                // const correctionToClientW = ref.current.clientWidth / 2;

                // ref.current.scrollTo(lastPositionScroll.x * correctionW - correctionToClientW,
                //     lastPositionScroll.y*correctionH - correctionToClientH);
                const correctionW = ref.current.scrollWidth / startScroll.x;
                const correctionH = ref.current.scrollHeight/ startScroll.y;
                const newScrollX = lastPositionScroll.x *correctionW;
                const newScrollY = lastPositionScroll.y *correctionH;
                const correctionScrollX = newScrollX - lastPositionScroll.x;
                const correctionScrollY = newScrollY - lastPositionScroll.y;
                const halfW = ref.current.clientWidth / 2;
                const halfH = ref.current.clientHeight / 2;
                const isUp = sizeCorrection>0;
                const correctionCursorX  = lastPositionCursor.x - halfW;
                const correctionCursorY  = lastPositionCursor.y - halfH;
                console.log({oldScroll: startScroll,
                    newScroll: {x: ref.current.scrollWidth, y:ref.current.scrollHeight}});
                const finalCorrectionX = correctionScrollX + correctionCursorX;
                const finalCorrectionY = correctionScrollY + correctionCursorY;
                console.log(finalCorrectionX, finalCorrectionY);
                if(correctionW<1.9 && correctionH<1.9 && correctionW > 0.55 && correctionH > 0.55){
                    ref.current.scrollBy( isUp ? finalCorrectionX : correctionCursorX,
                        isUp ? finalCorrectionY : correctionCursorY);
                }
            }
        });

        // eslint-disable-next-line
    }, [ lastPositionScroll]);
    if(isOpen){
        return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.modal} ref={ref}>
                {srcs && !!srcs.length &&
                    srcs.map((src, index) => (
                        <img
                            src={src}
                            alt="Image"
                            key={src + index}
                            width={sizes[`width${index}`]}
                            height={sizes[`height${index}`]}
                            className={cls.image}
                        />
                    ))
                }
            </Modal>
        );
    }
    return null;
};