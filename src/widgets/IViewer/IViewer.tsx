import {Modal} from "shared/ui/Modal/Modal";
import cls from "./IViewer.module.css";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";


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
    const [wheelChange, setWheelChange] = useState(0);
    const [lastPositionScroll, setLastPositionScroll] = useState<{x:number; y:number;}>({x: 0, y:0});

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
            setSizeCorrection(() => - ev.deltaY);
            const delta = Math.round(ev.deltaY/100);
            setWheelChange(prev => {
                if((prev>10 && delta>0) || (prev<-10 && delta<0)){
                    return prev;
                }
                return Math.round(prev + ev.deltaY/100);
            });
            setLastPositionScroll({x: ev.clientX, y: ev.clientY});
        }
    }, []);

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

    useEffect (()  => {
        if(sizes["width0"]){
            const widthObj = sizes["width0"];
            if(ref.current){
                const w = window.innerWidth;
                const h = window.innerHeight;
                console.log(wheelChange);
                const x  = Math.round(-((w/2) - lastPositionScroll.x));
                const y = Math.round(-((h/2) - lastPositionScroll.y));
                console.log({x,y, obj: ref.current.scrollHeight});
                ref.current.scrollBy(x>50|| x<-50 ? x : 0, y );
            }
        }
        // eslint-disable-next-line
    }, [sizes, lastPositionScroll]);

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
                        />
                    ))
                }
            </Modal>
        );
    }
    return null;
};