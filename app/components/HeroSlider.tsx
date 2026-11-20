"use client"

import { useEffect, useState, useRef } from "react"

import styles from "./heroSliderStyles.module.css"
interface Props{
    pictures:{
        src: string, alt:string
    }[]
}
export function HeroSlider({pictures}:Props){
    
    const container = useRef<HTMLDivElement|null>(null)
    const [index, setIndex] = useState(0)
    const [wait, setWait] = useState<null|number>(null)
    const [dir, setDir] = useState<'left'|'right'|'mount'>('mount')

    useEffect(()=>{
        if(!container.current)return

        const RO = new ResizeObserver((entries)=>{
            if(!entries[0])return
            
            const scaleValue = entries[0].borderBoxSize[0].inlineSize * 0.0003
            console.log(scaleValue)
            const duration = 1.3 + scaleValue
            document.documentElement.style.setProperty('--duration',`${duration}s`)
        })
        RO.observe(container.current)

        return()=>RO.disconnect()
    },[])

    return(
        <div 
        ref={container}
        className={styles.container}
        >
            {
                pictures.map((obj, i)=>(
                    <picture 
                    key={i}
                    className={`
                        ${styles.picture} ${index === i ? styles.active : ''} 
                        ${wait === i ? styles.wait:''}
                        ${dir === 'left' ? styles.left: dir=== 'mount' ? styles.mount : styles.right}
                        `}
                    onAnimationEnd={()=>{
                        setWait(null)
                    }}
                    >
                        <source srcSet={obj.src} type="svg/xml"/>
                        <img src={obj.src} alt={obj.alt}/>
                    </picture>
                ))
            }
            <button 
            className={`
                ${styles.button} 
                ${wait !== null ? styles.lock:''}
                `}
            onClick={()=>{
                if(wait)return
                setDir('left')
                setWait(index)
                setIndex((prev)=>((--prev % pictures.length)+pictures.length)%pictures.length)
            }}
            />
            <button 
            className={`
                ${styles.button} 
                ${wait !== null ? styles.lock:''}
                `}
            onClick={()=>{
                if(wait)return
                setDir('right')
                setWait(index)
                setIndex((prev)=>((++prev % pictures.length)+pictures.length)%pictures.length)
            }}
            />
        </div>
    )
}