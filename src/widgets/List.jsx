export function List() {
    //Params
    const title = "List Title"
    const validationText = "Confirm selection"
    const listKeys = [
      {"key":"List1", "text":"List 1"},
      {"key":"List2", "text":"List 2"},
      {"key":"List3", "text":"List 3"},
      {"key":"List4", "text":"List 4"},
    ]
    const callbackSubmit = (selectedKeys)=> {
      console.log(selectedKeys)
    }

    //Logic
    if (![...new Set(listKeys)].length === listKeys.length) { throw Error("The keys of the List are not unique")}

    const onConfirmation = (event) => {
      event.preventDefault();
      callbackSubmit(Object.keys(Object.fromEntries(new FormData(event.target))))
    }
    
    return (
    <>
      <div className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
          <div className="p-3">
              <h2 className="text-center">{title}</h2>
          </div>
          <form onSubmit={onConfirmation} >
            <ul className="h-80 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
              {
                listKeys.map( x => { return (<ListItem key={x.key} keyItem={x.key} text={x.text}></ListItem>)})
              }
            </ul>
            <button type="submit" className="flex p-3 w-full text-sm font-medium text-green-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-green-500 hover:underline">
              <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg>
              {validationText}
            </button>
          </form>
      </div>

    </>
    )
}
  
function ListItem(props) {
    return (
      <li>
        <div className="flex items-center mb-2">
            <input id={"cb_" + props.keyItem} name={props.keyItem} type="checkbox" className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-700" />
            <label htmlFor={"cb_" + props.keyItem} className="ml-2 text-sm font-medium">{props.text}</label>
        </div>
      </li>
    )
}