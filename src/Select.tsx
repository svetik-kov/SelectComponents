import React, {useState, KeyboardEvent, useEffect} from 'react';
import styles from './Select.module.css'

type ItemType = {
    title: string,
    value: string
}

type SelectType = {
    value?: string
    onChange: (value: string) => void
    item: ItemType[]
}
export const Select = (props: SelectType) => {
    const [active, setActive] = useState<boolean>(false)
    const [hoveredElementValue, setHoveredElementValue] = useState(props.value)
    const itemSelect = props.item.find(i => i.value === props.value)
    const hoveredItem = props.item.find(i => i.value === hoveredElementValue)//наведенный item

    useEffect(()=>{
        setHoveredElementValue(props.value)
    },[props.value])

    const toggleItem = () => {
        setActive(!active)
    }

    const itemClicked = (value: string) => {
        props.onChange(value)
        //setActive(!active)
        toggleItem()
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        console.log(e.key)
        if (e.key==='ArrowDown' ||e.key==='ArrowUp'){
        for (let i = 0; i < props.item.length; i++) {
            if (props.item[i].value === hoveredElementValue) {
                const pretendentElement= e.key==='ArrowDown'
                    ? props.item[i + 1]
                    : props.item[i - 1]
                if ( pretendentElement){
                    props.onChange( pretendentElement.value)
                   return
                }
            }
            if (!itemSelect){
                props.onChange( props.item[0].value)
            }
        }
    }
    if (e.key==='Enter'|| e.key==='Escape'){
        setActive(false)
    }
    }
    return (
        <div>
            <select>
                <option value={'1'}>Minsk</option>
                <option value={'2'}>Moscow</option>
                <option value={'3'}>Kiev</option>
                <option value={'4'}>Milan</option>
                <option value={'5'}>Paris</option>
            </select>
            <div className={styles.select} onKeyUp={onKeyUpHandler} tabIndex={0}>
                <span className={styles.main} onClick={toggleItem}>
                    {itemSelect && itemSelect.title}
                </span>
                {active &&
                    <div className={styles.item}>
                        {props.item.map(i => <div
                            key={i.value}
                            onMouseEnter={() => setHoveredElementValue(i.value) }
                            className={` ${hoveredItem === i ? styles.selected : ''}`}
                            onClick={() => itemClicked(i.value)}
                        >{i.title}</div>)}
                    </div>
                }

            </div>


        </div>
    );
};

