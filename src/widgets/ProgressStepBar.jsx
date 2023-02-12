

import {useState} from "react"

export function ProgressStepBar(props) {
    if (props.step > props.listOfStep.length) {
        const msg = "ProgressStepBar : The given step is currently overflowing the list of steps"
        console.error(msg)
        return (<div className="text-red-900 font-bold text-center">{msg}</div>)
    } else {
        return (
            <div>
                <div className="relative w-full" style={{paddingTop: "0.75em"}}>
                    <div className="w-[95%] mx-auto bg-gray-200 h-5 mb-6">
                        <div className="barFilledBackground h-5" style={{width: 100*(props.step/props.listOfStep.length)+"%"}}></div>
                    </div>
                    <div className="absolute flex text-center justify-between w-full" style={{top: "0%"}}>
                        {
                            props.listOfStep.map((x, i) => { 
                                return (
                                    <div className={i+1<=props.step ? "dotFilled barFilledBackground":"dot"}>
                                        <div className="title">{i+1}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="relative flex justify-between w-full font-bold " style={{top: "-15px"}}>
                        {
                            props.listOfStep.map(x => { 
                                return (
                                    <div>{x}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}