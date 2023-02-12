

import {useState} from "react"
// class DotManager {
//     constructor(listofSteps) {
//         this.dots=[];
//         this.numberofDots=listofSteps.length;
//         this.dotsFilled=0
//         this.listofSteps=listofSteps
//     }

//     add_oneDot() {
//         var n = this.dots.length +1;
//         const wrapperDiv = document
//         .createElement("div")
//         wrapperDiv.classList.add("dot");
//         const divTitle = document
//         .createElement("div")
//         divTitle.setAttribute("class", "title");
//         divTitle.textContent = n.toString()
//         const divDesc = document
//         .createElement("div")
//         divDesc.setAttribute("class", "description");
//         divDesc.textContent = this.listofSteps[n-1]
//         wrapperDiv.appendChild(divTitle);
//         wrapperDiv.appendChild(divDesc);
//         this.dots.push(wrapperDiv)
//         document.getElementById("dotsWrapper").appendChild(wrapperDiv);
//     }
//     add_allDots() {
//         for(var i =0; i<this.numberofDots; i++) { this.add_oneDot() }
//     }
//     setProgressWidth() {
//         document.getElementById("sizeProgressBar").style.width = (100/(this.numberofDots-1)*(this.dotsFilled-1)).toString()+"%";
//     }
//     fillDot() {
//         this.dots[this.dotsFilled].classList.remove("dot")
//         this.dots[this.dotsFilled].classList.add("dotFilled")
//         this.dotsFilled++
//         this.setProgressWidth()
//     }
//     removeDots() {
//         for(var i =0; i<this.dots.length; i++) { document.getElementById("dotsWrapper").removeChild(this.dots[i]) }
//         this.dots=[]
//     }
//     goToStep(n) {
//         if (n>this.numberofDots) { n=this.numberofDots}
//         this.removeDots()
//         this.add_allDots();
//         for(var i =0; i<n; i++) { this.fillDot() }
//     }
// }

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