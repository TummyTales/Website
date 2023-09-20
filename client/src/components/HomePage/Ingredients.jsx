import Cross from '../General/Cross';
const Search=(props)=>{
    return(<div>
        <li className='flex items-center justify-between mt-2 border-2 border-orange-200 h-8'><div className='ml-2'>{props.text}</div><button className='mr-1' onClick={() => {props.onChecked(props.id);}}><Cross /></button></li>
    

    </div>)
}
export default Search;